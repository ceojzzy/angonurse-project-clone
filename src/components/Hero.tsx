import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

interface HeroSlide {
  id: string;
  title: string;
  title_en: string;
  description: string;
  description_en: string;
  image_url: string;
  link_slug: string | null;
}

const Hero = () => {
  const { language, t } = useLanguage();
  const [slides, setSlides] = useState<HeroSlide[]>([]);

  useEffect(() => {
    loadSlides();
    
    // Realtime subscription
    const channel = supabase
      .channel('hero-slides-public')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'hero_slides' }, () => {
        loadSlides();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadSlides = async () => {
    const { data } = await supabase
      .from('hero_slides')
      .select('*')
      .eq('active', true)
      .order('order_index', { ascending: true });

    if (data) setSlides(data);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-light">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {language === "pt" ? (
                <>Cuide da sua <span className="text-primary">saúde</span> e <span className="text-primary">bem-estar</span></>
              ) : (
                <>Take care of your <span className="text-primary">health</span> and <span className="text-primary">wellness</span></>
              )}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
              {t(
                "Conteúdos confiáveis sobre saúde, beleza, tratamentos e autocuidado para transformar sua vida.",
                "Reliable content about health, beauty, treatments and self-care to transform your life."
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:opacity-90 transition-opacity"
                onClick={() => {
                  document.getElementById('artigos')?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
              >
                {t("Explorar Conteúdos", "Explore Content")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => window.location.href = '/quizes'}
              >
                {t("Quiz Angonurse", "Angonurse Quiz")}
              </Button>
            </div>
          </div>
          <div className="animate-fade-in">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 3000,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent>
                {slides.map((slide, index) => (
                  <CarouselItem key={slide.id}>
                    <Link to={slide.link_slug ? `/categoria/${slide.link_slug}` : '#'}>
                      <div className="group relative overflow-hidden rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105">
                        <div className="aspect-video relative">
                          <img
                            src={slide.image_url}
                            alt={language === "pt" ? slide.title : slide.title_en}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                            <h3 className="text-2xl font-bold mb-2">
                              {language === "pt" ? slide.title : slide.title_en}
                            </h3>
                            <p className="text-sm text-white/90">
                              {language === "pt" ? slide.description : slide.description_en}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
