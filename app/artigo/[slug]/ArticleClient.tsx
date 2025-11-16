"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { createClient } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { ptBR, enUS } from "date-fns/locale";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RichContent from "@/components/RichContent";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import OptimizedImage from "@/components/OptimizedImage";

interface Article {
  title_pt: string;
  title_en: string;
  excerpt_pt?: string;
  excerpt_en?: string;
  content_pt?: string;
  content_en?: string;
  featured_image: string;
  slug: string;
  category_pt: string;
  category_en?: string;
  created_at: string;
}

interface ArticleClientProps {
  initialArticle: Article;
}

export default function ArticleClient({ initialArticle }: ArticleClientProps) {
  const { language } = useLanguage();
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);

  useEffect(() => {
    const loadRelatedArticles = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .eq('category_pt', initialArticle.category_pt)
        .neq('slug', initialArticle.slug)
        .limit(3);

      if (data) {
        setRelatedArticles(data as Article[]);
      }
    };

    loadRelatedArticles();
  }, [initialArticle.category_pt, initialArticle.slug]);

  const title = language === 'pt' ? initialArticle.title_pt : initialArticle.title_en;
  const content = language === 'pt' ? initialArticle.content_pt : initialArticle.content_en;
  const category = language === 'pt' ? initialArticle.category_pt : initialArticle.category_en || initialArticle.category_pt;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-12">
        <article className="container mx-auto px-4 max-w-4xl">
          <Badge className="mb-4">{category}</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">{title}</h1>
          <p className="text-muted-foreground mb-8">
            {format(new Date(initialArticle.created_at), "dd 'de' MMMM 'de' yyyy", {
              locale: language === 'pt' ? ptBR : enUS
            })}
          </p>
          
          {initialArticle.featured_image && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <OptimizedImage
                src={initialArticle.featured_image}
                alt={title}
                className="w-full h-auto"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <RichContent content={content || ''} />
          </div>
        </article>

        {relatedArticles.length > 0 && (
          <section className="container mx-auto px-4 max-w-4xl mt-16">
            <h2 className="text-3xl font-bold mb-8">
              {language === 'pt' ? 'Leia Também' : 'Read Also'}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((article) => (
                <Link key={article.slug} href={`/artigo/${article.slug}`}>
                  <Card className="hover:shadow-lg transition-shadow h-full">
                    <OptimizedImage
                      src={article.featured_image}
                      alt={language === 'pt' ? article.title_pt : article.title_en}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2">
                        {language === 'pt' ? article.title_pt : article.title_en}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {language === 'pt' ? article.excerpt_pt : article.excerpt_en}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
