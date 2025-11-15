import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import SEO from "@/components/SEO";

const POSTS_PER_PAGE = 20;

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

const Blog = () => {
  const { language, t } = useLanguage();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [visiblePosts, setVisiblePosts] = useState(POSTS_PER_PAGE);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error("Error loading articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const displayedPosts = articles.slice(0, visiblePosts);
  const hasMorePosts = visiblePosts < articles.length;

  const loadMorePosts = () => {
    setVisiblePosts((prev) => Math.min(prev + POSTS_PER_PAGE, articles.length));
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SEO 
        title="Blog - Artigos sobre Saúde e Bem-estar | Angonurse"
        description="Explore nossos artigos sobre saúde, bem-estar, beleza, tratamentos e receitas saudáveis. Conteúdo de qualidade para cuidar do seu corpo e mente."
        canonical="https://angonurse.vercel.app/blog"
        keywords="blog, artigos, saúde, bem-estar, beleza, tratamentos, angonurse"
      />
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">{t("Todos os Artigos", "All Articles")}</h1>
          <p className="text-lg text-muted-foreground">
            {t(
              "Explore nosso conteúdo completo sobre saúde, bem-estar, beleza e receitas.",
              "Explore our complete content about health, wellness, beauty and recipes."
            )}
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {t("Nenhum artigo disponível no momento.", "No articles available at the moment.")}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {displayedPosts.map((post) => (
                <a
                  key={post.id}
                  href={`/artigo/${post.slug}`}
                  className="group"
                >
                  <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                    <AspectRatio ratio={16 / 9}>
                      <img
                        src={post.featured_image || "/placeholder.svg"}
                        alt={language === 'pt' ? post.title_pt : (post.title_en || post.title_pt)}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                    </AspectRatio>
                    <div className="p-4">
                      <span className="inline-block px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium mb-2">
                        {post.category}
                      </span>
                      <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {language === 'pt' ? post.title_pt : (post.title_en || post.title_pt)}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {language === 'pt' ? post.excerpt_pt : (post.excerpt_en || post.excerpt_pt)}
                      </p>
                    </div>
                  </Card>
                </a>
              ))}
            </div>

            {hasMorePosts && (
              <div className="flex justify-center">
                <Button onClick={loadMorePosts} size="lg">
                  {t("Carregar Mais Posts", "Load More Posts")}
                </Button>
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
