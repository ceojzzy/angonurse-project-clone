import { useState, useEffect } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

interface Article {
  id: string;
  title_pt: string;
  title_en: string;
  slug: string;
  category: string;
  featured_image: string;
}

const WeeklyUpdates = () => {
  const { t, language } = useLanguage();
  const [posts, setPosts] = useState<Article[]>([]);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(4);

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error("Error loading posts:", error);
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("Atualizações Semanais", "Weekly Updates")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t(
              "Fique por dentro das últimas novidades sobre saúde e bem-estar.",
              "Stay up to date with the latest news about health and wellness."
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.length === 0 ? (
            <p className="col-span-full text-center text-muted-foreground">
              {t("Nenhum artigo disponível.", "No articles available.")}
            </p>
          ) : (
            posts.map((post) => (
              <a key={post.id} href={`/artigo/${post.slug}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-all group cursor-pointer h-full">
                  <AspectRatio ratio={16 / 9}>
                    <img
                      src={post.featured_image || "/placeholder.svg"}
                      alt={language === 'pt' ? post.title_pt : (post.title_en || post.title_pt)}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </AspectRatio>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <span>{post.category}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>5 min</span>
                      </div>
                    </div>
                    <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
                      {language === 'pt' ? post.title_pt : (post.title_en || post.title_pt)}
                    </h3>
                  </CardHeader>
                </Card>
              </a>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default WeeklyUpdates;
