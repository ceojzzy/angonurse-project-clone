import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { ArticleManager } from "@/components/admin/ArticleManager";
import { HeroSlideManager } from "@/components/admin/HeroSlideManager";
import { PageContentManager } from "@/components/admin/PageContentManager";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Image, FileText, Presentation, FileEdit, LogOut, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/auth");
      } else if (!isAdmin) {
        toast({
          title: "Acesso negado",
          description: "Você não tem permissão para acessar esta área",
          variant: "destructive"
        });
        navigate("/");
      }
    }
  }, [user, isAdmin, loading, navigate, toast]);

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Logout realizado",
      description: "Você saiu do painel admin",
    });
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao site
            </Button>
          </Link>
          <Button variant="outline" size="sm" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Painel Administrativo</h1>
          <p className="text-muted-foreground">
            Gerencie o conteúdo do site - {user.email}
          </p>
        </div>

        <Tabs defaultValue="hero" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="hero" className="flex items-center gap-2">
              <Presentation className="h-4 w-4" />
              Carrossel
            </TabsTrigger>
            <TabsTrigger value="articles" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Artigos
            </TabsTrigger>
            <TabsTrigger value="pages" className="flex items-center gap-2">
              <FileEdit className="h-4 w-4" />
              Páginas
            </TabsTrigger>
            <TabsTrigger value="images" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Imagens
            </TabsTrigger>
          </TabsList>
          <TabsContent value="hero" className="mt-6">
            <HeroSlideManager />
          </TabsContent>
          <TabsContent value="articles" className="mt-6">
            <ArticleManager />
          </TabsContent>
          <TabsContent value="pages" className="mt-6">
            <PageContentManager />
          </TabsContent>
          <TabsContent value="images" className="mt-6">
            <ImageUploader />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
