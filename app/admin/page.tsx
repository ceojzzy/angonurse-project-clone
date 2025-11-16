"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ArticleManager } from "@/components/admin/ArticleManager";
import { HeroSlideManager } from "@/components/admin/HeroSlideManager";
import { PageContentManager } from "@/components/admin/PageContentManager";

export default function AdminPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <Button onClick={() => signOut()} variant="outline">
            Sair
          </Button>
        </div>

        <Tabs defaultValue="articles" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="articles">Artigos</TabsTrigger>
            <TabsTrigger value="hero">Hero Slides</TabsTrigger>
            <TabsTrigger value="pages">Páginas</TabsTrigger>
          </TabsList>

          <TabsContent value="articles">
            <ArticleManager />
          </TabsContent>

          <TabsContent value="hero">
            <HeroSlideManager />
          </TabsContent>

          <TabsContent value="pages">
            <PageContentManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
