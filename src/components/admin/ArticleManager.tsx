import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Article {
  id: string;
  title_pt: string;
  title_en: string;
  slug: string;
  excerpt_pt: string;
  excerpt_en: string;
  content_pt: string;
  content_en: string;
  featured_image: string;
  category: string;
  published: boolean;
  created_at: string;
}

export const ArticleManager = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title_pt: "",
    title_en: "",
    slug: "",
    excerpt_pt: "",
    excerpt_en: "",
    content_pt: "",
    content_en: "",
    featured_image: "",
    category: "saude",
    published: false
  });

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error loading articles:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar artigos",
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
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      if (editingArticle) {
        const { error } = await supabase
          .from('articles')
          .update({
            ...formData,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingArticle.id);

        if (error) throw error;
        toast({ title: "Sucesso", description: "Artigo atualizado!" });
      } else {
        const { error } = await supabase
          .from('articles')
          .insert([{ ...formData, author_id: user.id }]);

        if (error) throw error;
        toast({ title: "Sucesso", description: "Artigo criado!" });
      }

      resetForm();
      loadArticles();
    } catch (error) {
      console.error('Error saving article:', error);
      toast({
        title: "Erro",
        description: "Erro ao salvar artigo",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este artigo?')) return;

    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: "Sucesso", description: "Artigo excluído!" });
      loadArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
      toast({
        title: "Erro",
        description: "Erro ao excluir artigo",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setFormData({
      title_pt: article.title_pt,
      title_en: article.title_en || "",
      slug: article.slug,
      excerpt_pt: article.excerpt_pt,
      excerpt_en: article.excerpt_en || "",
      content_pt: article.content_pt,
      content_en: article.content_en || "",
      featured_image: article.featured_image,
      category: article.category,
      published: article.published
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title_pt: "",
      title_en: "",
      slug: "",
      excerpt_pt: "",
      excerpt_en: "",
      content_pt: "",
      content_en: "",
      featured_image: "",
      category: "saude",
      published: false
    });
    setEditingArticle(null);
    setShowForm(false);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Gerenciar Artigos</CardTitle>
            <CardDescription>Crie e edite artigos do site</CardDescription>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Artigo
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {showForm && (
          <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title_pt">Título (Português) *</Label>
                <Input
                  id="title_pt"
                  value={formData.title_pt}
                  onChange={(e) => {
                    setFormData({ ...formData, title_pt: e.target.value });
                    if (!editingArticle) {
                      setFormData(prev => ({ ...prev, slug: generateSlug(e.target.value) }));
                    }
                  }}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title_en">Título (Inglês)</Label>
                <Input
                  id="title_en"
                  value={formData.title_en}
                  onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug (URL)</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="saude">Saúde</SelectItem>
                  <SelectItem value="beleza">Beleza</SelectItem>
                  <SelectItem value="bemestar">Bem-estar</SelectItem>
                  <SelectItem value="receitas">Receitas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Imagem Destacada</Label>
              <div className="flex gap-2 mb-2">
                <Button
                  type="button"
                  variant={formData.featured_image.startsWith('http') ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFormData({ ...formData, featured_image: "" })}
                >
                  URL
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('article-image-upload')?.click()}
                >
                  Upload
                </Button>
              </div>
              
              <Input
                id="featured_image"
                value={formData.featured_image}
                onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                placeholder="URL da imagem ou faça upload"
              />
              
              <input
                id="article-image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  try {
                    const fileExt = file.name.split('.').pop();
                    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
                    const filePath = `articles/${fileName}`;

                    const { error: uploadError } = await supabase.storage
                      .from('site-images')
                      .upload(filePath, file, { upsert: false });

                    if (uploadError) throw uploadError;

                    const { data: { publicUrl } } = supabase.storage
                      .from('site-images')
                      .getPublicUrl(filePath);

                    setFormData({ ...formData, featured_image: publicUrl });
                    toast({ title: "Sucesso", description: "Imagem enviada!" });
                  } catch (error) {
                    console.error('Error uploading image:', error);
                    toast({
                      title: "Erro",
                      description: "Erro ao enviar imagem",
                      variant: "destructive"
                    });
                  }
                }}
              />
              
              {formData.featured_image && (
                <img src={formData.featured_image} alt="Preview" className="mt-2 h-32 rounded object-cover" />
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="excerpt_pt">Resumo (Português)</Label>
                <Textarea
                  id="excerpt_pt"
                  value={formData.excerpt_pt}
                  onChange={(e) => setFormData({ ...formData, excerpt_pt: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt_en">Resumo (Inglês)</Label>
                <Textarea
                  id="excerpt_en"
                  value={formData.excerpt_en}
                  onChange={(e) => setFormData({ ...formData, excerpt_en: e.target.value })}
                  rows={3}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="content_pt">Conteúdo (Português) *</Label>
                <Textarea
                  id="content_pt"
                  value={formData.content_pt}
                  onChange={(e) => setFormData({ ...formData, content_pt: e.target.value })}
                  rows={10}
                  required
                  placeholder="Use HTML para formatar: <h2>Título</h2>, <p>Parágrafo</p>, <blockquote>Citação</blockquote>, <a href='url'>Link</a>"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content_en">Conteúdo (Inglês)</Label>
                <Textarea
                  id="content_en"
                  value={formData.content_en}
                  onChange={(e) => setFormData({ ...formData, content_en: e.target.value })}
                  rows={10}
                  placeholder="Use HTML to format: <h2>Title</h2>, <p>Paragraph</p>, <blockquote>Quote</blockquote>, <a href='url'>Link</a>"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="published"
                checked={formData.published}
                onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
              />
              <Label htmlFor="published">Publicar artigo</Label>
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={isLoading}>
                {editingArticle ? "Atualizar" : "Criar"} Artigo
              </Button>
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancelar
              </Button>
            </div>
          </form>
        )}

        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="font-medium">{article.title_pt}</TableCell>
                  <TableCell className="capitalize">{article.category}</TableCell>
                  <TableCell>
                    <span className={`text-xs px-2 py-1 rounded ${article.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {article.published ? 'Publicado' : 'Rascunho'}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(article.created_at).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(article)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(article.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
