import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import SEO from "@/components/SEO";

const Sitemap = () => {
  const posts = [
    {
      id: 1,
      title: "10 Dicas Essenciais para uma Vida Mais Saudável",
      category: "Saúde",
      date: "2024-03-15",
      readTime: "5 min",
      image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800&h=600&fit=crop",
      description: "Descubra práticas simples que podem transformar sua rotina e melhorar sua qualidade de vida."
    },
    {
      id: 2,
      title: "Meditação: O Caminho para o Bem-Estar Mental",
      category: "Bem-estar",
      date: "2024-03-14",
      readTime: "7 min",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop",
      description: "Como a meditação pode ajudar a reduzir o estresse e aumentar o foco no dia a dia."
    },
    {
      id: 3,
      title: "Rotina de Skincare: Passo a Passo Completo",
      category: "Beleza",
      date: "2024-03-13",
      readTime: "6 min",
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&h=600&fit=crop",
      description: "Aprenda a cuidar da sua pele com uma rotina eficaz e produtos adequados."
    },
    {
      id: 4,
      title: "Receitas Nutritivas para o Café da Manhã",
      category: "Receitas",
      date: "2024-03-12",
      readTime: "4 min",
      image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800&h=600&fit=crop",
      description: "Comece o dia com energia através de refeições balanceadas e deliciosas."
    },
    {
      id: 5,
      title: "Exercícios Simples para Fazer em Casa",
      category: "Saúde",
      date: "2024-03-11",
      readTime: "8 min",
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop",
      description: "Mantenha-se ativo com treinos práticos que não exigem equipamentos."
    },
    {
      id: 6,
      title: "A Importância do Sono para a Saúde",
      category: "Bem-estar",
      date: "2024-03-10",
      readTime: "5 min",
      image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&h=600&fit=crop",
      description: "Entenda como uma boa noite de sono impacta positivamente sua vida."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Feed de Conteúdos | Angonurse"
        description="Explore todos os nossos artigos sobre saúde, bem-estar, beleza e receitas saudáveis."
        canonical="https://angonurse.vercel.app/sitemap"
      />
      <Header />
      <main className="flex-grow bg-gradient-to-b from-background to-secondary/10">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Feed de Conteúdos</h1>
            <p className="text-muted-foreground mb-12">
              Explore todos os nossos artigos sobre saúde, bem-estar, beleza e receitas.
            </p>
            
            <div className="space-y-6">
              {posts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="grid md:grid-cols-[300px_1fr] gap-6">
                    <AspectRatio ratio={16/9} className="bg-muted">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                    <div className="p-6 md:p-0 md:pr-6 md:py-6">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="font-semibold text-primary">{post.category}</span>
                        <span>•</span>
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime} de leitura</span>
                      </div>
                      <CardHeader className="p-0">
                        <CardTitle className="text-2xl mb-2 hover:text-primary transition-colors cursor-pointer">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {post.description}
                        </CardDescription>
                      </CardHeader>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Sitemap;
