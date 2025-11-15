import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Sparkles, Utensils, Activity } from "lucide-react";

const Index = () => {
  const categories = [
    {
      icon: Activity,
      title: "Saúde",
      description: "Dicas e informações para cuidar da sua saúde",
      color: "text-[hsl(var(--health-green))]",
      bgColor: "bg-[hsl(var(--health-light))]"
    },
    {
      icon: Heart,
      title: "Bem-estar",
      description: "Equilíbrio mental e qualidade de vida",
      color: "text-[hsl(var(--wellness-blue))]",
      bgColor: "bg-blue-50"
    },
    {
      icon: Sparkles,
      title: "Beleza",
      description: "Cuidados naturais para sua beleza",
      color: "text-[hsl(var(--beauty-pink))]",
      bgColor: "bg-pink-50"
    },
    {
      icon: Utensils,
      title: "Receitas",
      description: "Alimentação saudável e saborosa",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  const featuredArticles = [
    {
      title: "10 Hábitos para uma Vida Mais Saudável",
      category: "Saúde",
      image: "/placeholder.svg",
      excerpt: "Descubra práticas diárias que transformam sua saúde e bem-estar."
    },
    {
      title: "Meditação: Como Começar em 5 Passos",
      category: "Bem-estar",
      image: "/placeholder.svg",
      excerpt: "Aprenda técnicas simples de meditação para o dia a dia."
    },
    {
      title: "Cuidados Naturais com a Pele",
      category: "Beleza",
      image: "/placeholder.svg",
      excerpt: "Receitas caseiras e ingredientes naturais para sua rotina de skincare."
    }
  ];

  return (
    <>
      <SEO />
      
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold text-foreground">Angonurse</h1>
              </div>
              <div className="hidden md:flex gap-6">
                <a href="#saude" className="text-foreground hover:text-primary transition-colors">Saúde</a>
                <a href="#bem-estar" className="text-foreground hover:text-primary transition-colors">Bem-estar</a>
                <a href="#beleza" className="text-foreground hover:text-primary transition-colors">Beleza</a>
                <a href="#receitas" className="text-foreground hover:text-primary transition-colors">Receitas</a>
              </div>
              <Button>Assinar Newsletter</Button>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Cuidar de Si é Essencial
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Seu portal completo de saúde, bem-estar, beleza e nutrição. 
              Informações confiáveis para uma vida mais equilibrada.
            </p>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Explorar Conteúdo
            </Button>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 container mx-auto px-4">
          <h3 className="text-3xl font-bold text-foreground mb-12 text-center">Categorias</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Card key={category.title} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-full ${category.bgColor} flex items-center justify-center mb-4`}>
                      <Icon className={`h-6 w-6 ${category.color}`} />
                    </div>
                    <CardTitle>{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Featured Articles */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-foreground mb-12 text-center">Artigos em Destaque</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredArticles.map((article) => (
                <Card key={article.title} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                  <CardHeader>
                    <div className="text-sm text-primary font-medium mb-2">{article.category}</div>
                    <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                    <CardDescription className="line-clamp-3">{article.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="text-primary hover:text-primary/80">
                      Ler mais →
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-card border-t border-border py-12">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Activity className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-foreground">Angonurse</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Portal de saúde, bem-estar e qualidade de vida
            </p>
            <p className="text-sm text-muted-foreground">
              © 2024 Angonurse. Todos os direitos reservados.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
