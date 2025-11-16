"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import OptimizedImage from "./OptimizedImage";

interface Slide {
  id: string;
  image_url: string;
  title_pt: string;
  title_en: string;
  description_pt: string;
  description_en: string;
  link: string;
  order: number;
}

const Hero = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { language } = useLanguage();

  useEffect(() => {
    const loadSlides = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from('hero_slides')
        .select('*')
        .eq('active', true)
        .order('order', { ascending: true });

      if (data && data.length > 0) {
        setSlides(data as Slide[]);
      }
    };

    loadSlides();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (slides.length === 0) {
    return null;
  }

  const slide = slides[currentSlide];
  const title = language === 'pt' ? slide.title_pt : slide.title_en;
  const description = language === 'pt' ? slide.description_pt : slide.description_en;

  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden bg-gradient-to-r from-primary/10 to-secondary/10">
      <div className="absolute inset-0">
        <OptimizedImage
          src={slide.image_url}
          alt={title}
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
            {title}
          </h1>
          <p className="text-lg md:text-xl mb-8 animate-fade-in animation-delay-200">
            {description}
          </p>
          {slide.link && (
            <Link href={slide.link}>
              <Button size="lg" className="animate-fade-in animation-delay-400">
                {language === 'pt' ? 'Leia Mais' : 'Read More'}
              </Button>
            </Link>
          )}
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
            onClick={nextSlide}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                }`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Hero;
