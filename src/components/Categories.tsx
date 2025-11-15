import { Link } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useLanguage } from "@/contexts/LanguageContext";
import saudeImage from "@/assets/category-saude.jpg";
import bemestarImage from "@/assets/category-bemestar.jpg";
import belezaImage from "@/assets/category-beleza.jpg";
import receitasImage from "@/assets/category-receitas.jpg";

const Categories = () => {
  const { language, t } = useLanguage();
  
  const categories = [
    {
      title: t("Saúde", "Health"),
      description: t("Informações sobre doenças, prevenção e tratamentos confiáveis", "Information about diseases, prevention and reliable treatments"),
      image: saudeImage,
      slug: "saude",
    },
    {
      title: t("Bem-estar", "Wellness"),
      description: t("Dicas para equilibrar corpo e mente no dia a dia", "Tips to balance body and mind daily"),
      image: bemestarImage,
      slug: "bem-estar",
    },
    {
      title: t("Beleza", "Beauty"),
      description: t("Cuidados com a pele, cabelos e estética corporal", "Skin, hair and body aesthetics care"),
      image: belezaImage,
      slug: "beleza",
    },
    {
      title: t("Receitas", "Recipes"),
      description: t("Alimentação saudável e receitas nutritivas", "Healthy eating and nutritious recipes"),
      image: receitasImage,
      slug: "receitas",
    },
  ];

  return (
    <section id="categorias" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("Explore Nossos Conteúdos", "Explore Our Content")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("Conteúdo de qualidade para cuidar de você de forma integral", "Quality content to take care of you holistically")}
          </p>
        </div>

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
            {categories.map((category, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Link to={`/categoria/${category.slug}`}>
                  <div className="group relative overflow-hidden rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105">
                    <div className="aspect-video relative">
                      <img
                        src={category.image}
                        alt={category.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                        <p className="text-sm text-white/90">{category.description}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default Categories;
