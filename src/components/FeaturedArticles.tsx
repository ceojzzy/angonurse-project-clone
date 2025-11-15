import { useState, useEffect } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

interface Article {
  id: string;
  title_pt: string;
  title_en: string;
  slug: string;
  excerpt_pt: string;
  excerpt_en: string;
  category: string;
  featured_image: string;
}

const FeaturedArticles = () => {
  const { t, language } = useLanguage();
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error("Error loading articles:", error);
    }
  };

  return (
    <section id="artigos" className="py-16 bg-accent/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("Artigos em Destaque", "Featured Articles")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t(
              "Explore nossos artigos mais populares sobre saúde, bem-estar e qualidade de vida.",
              "Explore our most popular articles about health, wellness, and quality of life."
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.length === 0 ? (
            <p className="col-span-full text-center text-muted-foreground">
              {t("Nenhum artigo em destaque no momento.", "No featured articles at the moment.")}
            </p>
          ) : (
            articles.map((article) => (
              <a key={article.id} href={`/artigo/${article.slug}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow group h-full">
                  <AspectRatio ratio={16 / 9}>
                    <img
                      src={article.featured_image || "/placeholder.svg"}
                      alt={language === 'pt' ? article.title_pt : (article.title_en || article.title_pt)}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </AspectRatio>
                  <CardHeader>
                    <Badge className="w-fit mb-2">
                      {article.category}
                    </Badge>
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {language === 'pt' ? article.title_pt : (article.title_en || article.title_pt)}
                    </h3>
                    <p className="text-muted-foreground mt-2">
                      {language === 'pt' ? article.excerpt_pt : (article.excerpt_en || article.excerpt_pt)}
                    </p>
                    <Button variant="ghost" className="p-0 h-auto font-semibold mt-4 w-fit">
                      {t("Leia mais", "Read more")} →
                    </Button>
                  </CardHeader>
                </Card>
              </a>
            ))
          )}
        </div>

        <div className="flex justify-center mt-12">
          <Button size="lg" asChild>
            <a href="/blog">
              {t("Ver Todos os Artigos", "View All Articles")}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticles;
