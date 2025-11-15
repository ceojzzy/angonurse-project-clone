import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { OptimizedImage } from "./OptimizedImage";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image_url: string;
  category: string;
  reading_time: number;
  created_at: string;
}

const staticArticles: Article[] = [
  {
    id: "1",
    title: "10 Dicas de Saúde para o Dia a Dia",
    slug: "dicas-saude-dia-a-dia",
    excerpt: "Descubra hábitos simples que podem transformar sua saúde e bem-estar no cotidiano.",
    image_url: "/placeholder.svg",
    category: "Saúde",
    reading_time: 5,
    created_at: "2024-03-15T10:00:00Z"
  },
  {
    id: "2",
    title: "Alimentação Saudável: Guia Completo",
    slug: "alimentacao-saudavel-guia",
    excerpt: "Aprenda os fundamentos de uma alimentação balanceada e nutritiva para toda a família.",
    image_url: "/placeholder.svg",
    category: "Nutrição",
    reading_time: 8,
    created_at: "2024-03-14T10:00:00Z"
  },
  {
    id: "3",
    title: "Exercícios em Casa: Rotina Completa",
    slug: "exercicios-em-casa",
    excerpt: "Monte sua rotina de exercícios sem sair de casa com estas dicas práticas.",
    image_url: "/placeholder.svg",
    category: "Fitness",
    reading_time: 6,
    created_at: "2024-03-13T10:00:00Z"
  },
  {
    id: "4",
    title: "Cuidados com a Pele no Inverno",
    slug: "cuidados-pele-inverno",
    excerpt: "Proteja sua pele durante os meses frios com estas recomendações essenciais.",
    image_url: "/placeholder.svg",
    category: "Beleza",
    reading_time: 4,
    created_at: "2024-03-12T10:00:00Z"
  },
  {
    id: "5",
    title: "Saúde Mental: Importância e Cuidados",
    slug: "saude-mental-cuidados",
    excerpt: "Entenda a importância de cuidar da saúde mental e estratégias para o equilíbrio emocional.",
    image_url: "/placeholder.svg",
    category: "Bem-estar",
    reading_time: 7,
    created_at: "2024-03-11T10:00:00Z"
  },
  {
    id: "6",
    title: "Receitas Saudáveis para o Café da Manhã",
    slug: "receitas-cafe-manha",
    excerpt: "Comece o dia com energia através destas receitas nutritivas e deliciosas.",
    image_url: "/placeholder.svg",
    category: "Receitas",
    reading_time: 5,
    created_at: "2024-03-10T10:00:00Z"
  }
];

const RecentArticles = () => {
  const { t } = useLanguage();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          {t("Artigos Recentes", "Recent Articles")}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staticArticles.map((article) => (
            <Link key={article.id} to={`/artigo/${article.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <OptimizedImage
                    src={article.image_url}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                      {article.category}
                    </span>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(article.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{article.reading_time} min</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentArticles;
