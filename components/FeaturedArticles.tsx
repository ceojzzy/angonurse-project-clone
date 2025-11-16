"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import OptimizedImage from "./OptimizedImage";

interface Article {
  title_pt: string;
  title_en: string;
  excerpt_pt?: string;
  excerpt_en?: string;
  featured_image: string;
  slug: string;
  category_pt: string;
  category_en?: string;
}

const FeaturedArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const { language } = useLanguage();

  useEffect(() => {
    const loadArticles = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(3);

      if (data) {
        setArticles(data as Article[]);
      }
    };

    loadArticles();
  }, []);

  if (articles.length === 0) return null;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {language === 'pt' ? 'Artigos em Destaque' : 'Featured Articles'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link key={article.slug} href={`/artigo/${article.slug}`}>
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group h-full">
                <div className="relative h-48 overflow-hidden">
                  <OptimizedImage
                    src={article.featured_image}
                    alt={language === 'pt' ? article.title_pt : article.title_en}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <Badge className="mb-3">
                    {language === 'pt' ? article.category_pt : article.category_en || article.category_pt}
                  </Badge>
                  <h3 className="text-xl font-semibold mb-3 line-clamp-2">
                    {language === 'pt' ? article.title_pt : article.title_en}
                  </h3>
                  <p className="text-muted-foreground line-clamp-3">
                    {language === 'pt' ? article.excerpt_pt : article.excerpt_en}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticles;
