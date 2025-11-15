import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

interface Article {
  id: string;
  title_pt: string;
  title_en: string;
  slug: string;
  category: string;
}

export const SearchDialog = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);
  const { t, language } = useLanguage();

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const { data, error } = await supabase
        .from("articles")
        .select("id, title_pt, title_en, slug, category")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error("Error loading articles:", error);
    }
  };

  const filteredPosts = articles.filter((article) => {
    const title = language === 'pt' ? article.title_pt : (article.title_en || article.title_pt);
    return (
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={t("Buscar", "Search")}>
          <Search className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{t("Buscar Artigos", "Search Articles")}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder={t("Digite para buscar...", "Type to search...")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <a
                  key={post.id}
                  href={`/artigo/${post.slug}`}
                  className="block p-3 rounded-lg border border-border hover:bg-accent transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <h3 className="font-medium text-foreground">
                    {language === 'pt' ? post.title_pt : (post.title_en || post.title_pt)}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {post.category}
                  </p>
                </a>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8">
                {t("Nenhum artigo encontrado", "No articles found")}
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
