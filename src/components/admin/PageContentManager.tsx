import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pencil, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const PAGE_OPTIONS = [
  { value: "quem-somos", label: "Quem Somos", category: "sobre" },
  { value: "nossa-missao", label: "Nossa Missão", category: "sobre" },
  { value: "equipe", label: "Equipe", category: "sobre" },
  { value: "contato", label: "Contato", category: "sobre" },
  { value: "faq", label: "FAQ", category: "recursos" },
  { value: "parceiros", label: "Parceiros", category: "recursos" },
  { value: "termos-de-uso", label: "Termos de Uso", category: "legal" },
  { value: "politica-de-privacidade", label: "Política de Privacidade", category: "legal" },
  { value: "cookies", label: "Cookies", category: "legal" },
  { value: "disclaimer", label: "Disclaimer", category: "legal" },
];

interface PageContent {
  id: string;
  page_key: string;
  section_key: string;
  content_type: string;
  content_pt: string | null;
  content_en: string | null;
}

export const PageContentManager = () => {
  const [contents, setContents] = useState<PageContent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingContent, setEditingContent] = useState<PageContent | null>(null);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    page_key: "",
    section_key: "",
    content_type: "text",
    content_pt: "",
    content_en: ""
  });

  useEffect(() => {
    loadContents();
    
    // Realtime subscription
    const channel = supabase
      .channel('page-contents-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'page_contents' }, () => {
        loadContents();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadContents = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('page_contents')
        .select('*')
        .order('page_key', { ascending: true });

      if (error) throw error;
      setContents(data || []);
    } catch (error) {
      console.error('Error loading contents:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar conteúdos",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (editingContent) {
        const { error } = await supabase
          .from('page_contents')
          .update({
            content_pt: formData.content_pt,
            content_en: formData.content_en
          })
          .eq('id', editingContent.id);

        if (error) throw error;
        toast({ title: "Sucesso", description: "Conteúdo atualizado!" });
      } else {
        const { error } = await supabase
          .from('page_contents')
          .insert([formData]);

        if (error) throw error;
        toast({ title: "Sucesso", description: "Conteúdo criado!" });
      }

      resetForm();
      loadContents();
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        title: "Erro",
        description: "Erro ao salvar conteúdo",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (content: PageContent) => {
    setEditingContent(content);
    setFormData({
      page_key: content.page_key,
      section_key: content.section_key,
      content_type: content.content_type,
      content_pt: content.content_pt || "",
      content_en: content.content_en || ""
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      page_key: "",
      section_key: "",
      content_type: "text",
      content_pt: "",
      content_en: ""
    });
    setEditingContent(null);
    setShowForm(false);
  };

  const renderPageContents = (category: string) => {
    const categoryPages = PAGE_OPTIONS.filter(p => p.category === category);
    const categoryContents = contents.filter(c => 
      categoryPages.some(p => p.value === c.page_key)
    );

    return (
      <div className="space-y-4">
        {categoryPages.map(page => {
          const pageContents = categoryContents.filter(c => c.page_key === page.value);
          
          return (
            <div key={page.value} className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-3">{page.label}</h3>
              {pageContents.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Seção</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Conteúdo (PT)</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pageContents.map((content) => (
                      <TableRow key={content.id}>
                        <TableCell>{content.section_key}</TableCell>
                        <TableCell className="capitalize">{content.content_type}</TableCell>
                        <TableCell className="max-w-xs truncate">{content.content_pt}</TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="ghost" onClick={() => handleEdit(content)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-sm text-muted-foreground">Nenhum conteúdo cadastrado para esta página.</p>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Gerenciar Conteúdos de Páginas</CardTitle>
            <CardDescription>Edite textos das páginas Sobre, Recursos e Legais</CardDescription>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Conteúdo
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {showForm && (
          <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg bg-muted/30">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="page_key">Página</Label>
                <Select
                  value={formData.page_key}
                  onValueChange={(value) => setFormData({ ...formData, page_key: value })}
                  disabled={!!editingContent}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma página" />
                  </SelectTrigger>
                  <SelectContent>
                    {PAGE_OPTIONS.map(page => (
                      <SelectItem key={page.value} value={page.value}>
                        {page.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="section_key">Seção</Label>
                <Input
                  id="section_key"
                  value={formData.section_key}
                  onChange={(e) => setFormData({ ...formData, section_key: e.target.value })}
                  placeholder="title, intro, content_1, content_2"
                  disabled={!!editingContent}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content_type">Tipo</Label>
              <Select
                value={formData.content_type}
                onValueChange={(value) => setFormData({ ...formData, content_type: value })}
                disabled={!!editingContent}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Texto</SelectItem>
                  <SelectItem value="html">HTML</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="content_pt">Conteúdo (PT)</Label>
                <Textarea
                  id="content_pt"
                  value={formData.content_pt}
                  onChange={(e) => setFormData({ ...formData, content_pt: e.target.value })}
                  rows={6}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content_en">Conteúdo (EN)</Label>
                <Textarea
                  id="content_en"
                  value={formData.content_en}
                  onChange={(e) => setFormData({ ...formData, content_en: e.target.value })}
                  rows={6}
                  required
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={isLoading}>
                {editingContent ? "Atualizar" : "Criar"} Conteúdo
              </Button>
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancelar
              </Button>
            </div>
          </form>
        )}

        <Tabs defaultValue="sobre" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="sobre">Sobre</TabsTrigger>
            <TabsTrigger value="recursos">Recursos</TabsTrigger>
            <TabsTrigger value="legal">Legal</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sobre" className="mt-4">
            {renderPageContents("sobre")}
          </TabsContent>

          <TabsContent value="recursos" className="mt-4">
            {renderPageContents("recursos")}
          </TabsContent>

          <TabsContent value="legal" className="mt-4">
            {renderPageContents("legal")}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
