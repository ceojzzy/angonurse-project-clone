"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { createClient } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import OptimizedImage from "@/components/OptimizedImage";

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

export default function CategoryPage() {
  const params = useParams();
  const category = params?.category as string;
  const { language } = useLanguage();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .eq('category_pt', decodeURIComponent(category))
        .order('created_at', { ascending: false });

      if (data) {
        setArticles(data as Article[]);
      }
      setLoading(false);
    };

    if (category) {
      loadArticles();
    }
  }, [category]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">{decodeURIComponent(category)}</h1>
          <div className="grid md:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link key={article.slug} href={`/artigo/${article.slug}`}>
                <Card className="hover:shadow-lg transition-shadow h-full">
                  <OptimizedImage
                    src={article.featured_image}
                    alt={language === 'pt' ? article.title_pt : article.title_en}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <CardContent className="p-4">
                    <Badge className="mb-2">
                      {language === 'pt' ? article.category_pt : article.category_en || article.category_pt}
                    </Badge>
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
        </div>
      </main>
      <Footer />
    </div>
  );
}
