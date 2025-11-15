import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, Clock, User, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollToTop from "@/components/ScrollToTop";
import { supabase } from "@/integrations/supabase/client";
import SEO from "@/components/SEO";

interface Article {
  id: string;
  title_pt: string;
  title_en: string;
  slug: string;
  content_pt: string;
  content_en: string;
  excerpt_pt?: string;
  excerpt_en?: string;
  category: string;
  featured_image: string;
  created_at: string;
}

const Article = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, language } = useLanguage();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      loadArticle(slug);
    }
  }, [slug]);

  const loadArticle = async (articleSlug: string) => {
    try {
      // Load main article
      const { data: articleData, error: articleError } = await supabase
        .from("articles")
        .select("*")
        .eq("slug", articleSlug)
        .eq("published", true)
        .single();

      if (articleError) throw articleError;
      setArticle(articleData);

      // Load related articles (excluding current one)
      const { data: relatedData, error: relatedError } = await supabase
        .from("articles")
        .select("*")
        .eq("published", true)
        .neq("id", articleData.id)
        .limit(10);

      if (relatedError) throw relatedError;
      setRelatedArticles(relatedData || []);
    } catch (error) {
      console.error("Error loading article:", error);
      setArticle(null);
    } finally {
      setLoading(false);
    }
  };

  const getRandomArticles = (count: number) => {
    const shuffled = [...relatedArticles].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const randomArticles = getRandomArticles(3);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-16 flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">
            {t("Artigo não encontrado", "Article not found")}
          </h1>
          <Button asChild>
            <a href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("Voltar ao início", "Back to home")}
            </a>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title={`${language === 'pt' ? article.title_pt : (article.title_en || article.title_pt)} | Angonurse`}
        description={language === 'pt' ? (article.excerpt_pt || article.content_pt?.substring(0, 160)) : (article.excerpt_en || article.content_en?.substring(0, 160) || article.excerpt_pt)}
        canonical={`https://angonurse.vercel.app/artigo/${article.slug}`}
        image={article.featured_image}
        type="article"
        publishedTime={article.created_at}
        keywords={`${article.category}, saúde, bem-estar, angonurse`}
      />
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative h-[400px] w-full overflow-hidden">
          <img
            src={article.featured_image || "/placeholder.svg"}
            alt={language === 'pt' ? article.title_pt : (article.title_en || article.title_pt)}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>

        {/* Article Content */}
        <article className="container mx-auto px-4 -mt-32 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Button variant="ghost" asChild className="mb-4">
              <a href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t("Voltar", "Back")}
              </a>
            </Button>

            {/* Article Header */}
            <div className="bg-card rounded-lg p-8 shadow-lg mb-8">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full mb-4">
                {article.category}
              </span>
              
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                {language === 'pt' ? article.title_pt : (article.title_en || article.title_pt)}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-muted-foreground text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(article.created_at)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>5 min {t("de leitura", "read")}</span>
                </div>
              </div>
            </div>

            {/* Article Body */}
            <div className="bg-card rounded-lg p-8 shadow-lg article-content">
              <div dangerouslySetInnerHTML={{ __html: language === 'pt' ? article.content_pt : (article.content_en || article.content_pt) }} />
              
              {/* Leia Também Section */}
              {randomArticles.length > 0 && (
                <div className="not-prose my-8 p-6 bg-accent/30 rounded-lg border border-border">
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    {t("Leia Também:", "Read Also:")}
                  </h3>
                  <ul className="space-y-2">
                    {randomArticles.map((randomArticle) => (
                      <li key={randomArticle.slug}>
                        <a
                          href={`/artigo/${randomArticle.slug}`}
                          className="text-primary hover:underline font-medium"
                        >
                          {language === 'pt' ? randomArticle.title_pt : (randomArticle.title_en || randomArticle.title_pt)}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Related Articles Section */}
            {relatedArticles.length > 0 && (
              <div className="mt-12 bg-card rounded-lg p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  {t("Sugestões de Artigos Relacionados", "Related Articles Suggestions")}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                  {relatedArticles.map((relatedArticle, index) => (
                    <a
                      key={relatedArticle.slug}
                      href={`/artigo/${relatedArticle.slug}`}
                      className="group"
                    >
                      <div className="relative mb-3">
                        <span className="absolute top-2 left-2 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold z-10">
                          {index + 1}
                        </span>
                        <div className="aspect-video rounded-lg overflow-hidden">
                          <img
                            src={relatedArticle.featured_image || "/placeholder.svg"}
                            alt={language === 'pt' ? relatedArticle.title_pt : (relatedArticle.title_en || relatedArticle.title_pt)}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </div>
                      <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {language === 'pt' ? relatedArticle.title_pt : (relatedArticle.title_en || relatedArticle.title_pt)}
                      </h3>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Share Section */}
            <div className="mt-12 p-6 bg-accent/50 rounded-lg text-center">
              <p className="text-lg font-medium mb-4">
                {t("Gostou deste artigo?", "Did you like this article?")}
              </p>
              <Button asChild>
                <a href="/newsletter">
                  {t("Inscreva-se na Newsletter", "Subscribe to Newsletter")}
                </a>
              </Button>
            </div>
          </div>
        </article>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Article;
