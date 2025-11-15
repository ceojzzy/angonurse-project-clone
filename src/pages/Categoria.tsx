import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";

const allPosts = [
  {
    id: 1,
    title: "10 Dicas para Fortalecer o Sistema Imunológico",
    titleEn: "10 Tips to Strengthen Your Immune System",
    category: "saude",
    categoryLabel: "Saúde",
    categoryLabelEn: "Health",
    description: "Descubra práticas simples do dia a dia que podem ajudar a fortalecer suas defesas naturais.",
    descriptionEn: "Discover simple daily practices that can help strengthen your natural defenses.",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528",
    readTime: "5 min",
    date: "15 Mar 2024"
  },
  {
    id: 2,
    title: "Alimentação Saudável: Guia Completo",
    titleEn: "Healthy Eating: Complete Guide",
    category: "saude",
    categoryLabel: "Saúde",
    categoryLabelEn: "Health",
    description: "Aprenda os princípios de uma alimentação equilibrada e nutritiva.",
    descriptionEn: "Learn the principles of a balanced and nutritious diet.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
    readTime: "8 min",
    date: "12 Mar 2024"
  },
  {
    id: 3,
    title: "Meditação para Iniciantes",
    titleEn: "Meditation for Beginners",
    category: "bem-estar",
    categoryLabel: "Bem-estar",
    categoryLabelEn: "Wellness",
    description: "Comece sua jornada de mindfulness com técnicas simples e eficazes.",
    descriptionEn: "Start your mindfulness journey with simple and effective techniques.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
    readTime: "6 min",
    date: "10 Mar 2024"
  },
  {
    id: 4,
    title: "Yoga em Casa: Rotina Matinal",
    titleEn: "Yoga at Home: Morning Routine",
    category: "bem-estar",
    categoryLabel: "Bem-estar",
    categoryLabelEn: "Wellness",
    description: "Sequência de yoga de 15 minutos para começar o dia com energia.",
    descriptionEn: "15-minute yoga sequence to start your day with energy.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
    readTime: "7 min",
    date: "8 Mar 2024"
  },
  {
    id: 5,
    title: "Rotina de Skincare para Pele Oleosa",
    titleEn: "Skincare Routine for Oily Skin",
    category: "beleza",
    categoryLabel: "Beleza",
    categoryLabelEn: "Beauty",
    description: "Os melhores produtos e técnicas para controlar a oleosidade da pele.",
    descriptionEn: "The best products and techniques to control oily skin.",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03",
    readTime: "5 min",
    date: "5 Mar 2024"
  },
  {
    id: 6,
    title: "Maquiagem Natural para o Dia a Dia",
    titleEn: "Natural Makeup for Everyday",
    category: "beleza",
    categoryLabel: "Beleza",
    categoryLabelEn: "Beauty",
    description: "Tutorial passo a passo para uma make leve e elegante.",
    descriptionEn: "Step-by-step tutorial for light and elegant makeup.",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796",
    readTime: "6 min",
    date: "3 Mar 2024"
  },
  {
    id: 7,
    title: "Smoothie Verde Detox",
    titleEn: "Green Detox Smoothie",
    category: "receitas",
    categoryLabel: "Receitas",
    categoryLabelEn: "Recipes",
    description: "Receita nutritiva e deliciosa para desintoxicar o corpo.",
    descriptionEn: "Nutritious and delicious recipe to detoxify your body.",
    image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec",
    readTime: "3 min",
    date: "1 Mar 2024"
  },
  {
    id: 8,
    title: "Bowl de Açaí Caseiro",
    titleEn: "Homemade Açaí Bowl",
    category: "receitas",
    categoryLabel: "Receitas",
    categoryLabelEn: "Recipes",
    description: "Aprenda a fazer o açaí perfeito com ingredientes naturais.",
    descriptionEn: "Learn to make the perfect açaí with natural ingredients.",
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733",
    readTime: "4 min",
    date: "28 Fev 2024"
  },
  {
    id: 9,
    title: "Prevenção de Doenças Cardiovasculares",
    titleEn: "Cardiovascular Disease Prevention",
    category: "saude",
    categoryLabel: "Saúde",
    categoryLabelEn: "Health",
    description: "Hábitos essenciais para manter seu coração saudável.",
    descriptionEn: "Essential habits to keep your heart healthy.",
    image: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd",
    readTime: "7 min",
    date: "25 Fev 2024"
  },
  {
    id: 10,
    title: "Gestão do Estresse no Trabalho",
    titleEn: "Stress Management at Work",
    category: "bem-estar",
    categoryLabel: "Bem-estar",
    categoryLabelEn: "Wellness",
    description: "Técnicas comprovadas para reduzir a ansiedade profissional.",
    descriptionEn: "Proven techniques to reduce work-related anxiety.",
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88",
    readTime: "6 min",
    date: "22 Fev 2024"
  },
  {
    id: 11,
    title: "Cuidados com Cabelos Cacheados",
    titleEn: "Curly Hair Care",
    category: "beleza",
    categoryLabel: "Beleza",
    categoryLabelEn: "Beauty",
    description: "Dicas e produtos para realçar a beleza dos seus cachos.",
    descriptionEn: "Tips and products to enhance your curls' beauty.",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e",
    readTime: "5 min",
    date: "20 Fev 2024"
  },
  {
    id: 12,
    title: "Salada de Quinoa Proteica",
    titleEn: "Protein Quinoa Salad",
    category: "receitas",
    categoryLabel: "Receitas",
    categoryLabelEn: "Recipes",
    description: "Refeição completa, leve e cheia de nutrientes.",
    descriptionEn: "Complete, light meal full of nutrients.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    readTime: "4 min",
    date: "18 Fev 2024"
  }
];

const getCategoryInfo = (slug: string, t: (pt: string, en: string) => string) => {
  const infoMap: Record<string, { title: string; description: string }> = {
    "saude": {
      title: t("Saúde", "Health"),
      description: t(
        "Explore nossos artigos sobre saúde e mantenha-se informado sobre os últimos desenvolvimentos em medicina e cuidados de saúde.",
        "Explore our health articles and stay informed about the latest developments in medicine and healthcare."
      )
    },
    "bem-estar": {
      title: t("Bem-estar", "Wellness"),
      description: t(
        "Descubra dicas e práticas para melhorar seu bem-estar físico e mental.",
        "Discover tips and practices to improve your physical and mental well-being."
      )
    },
    "beleza": {
      title: t("Beleza", "Beauty"),
      description: t(
        "Explore o mundo da beleza com nossas dicas, tutoriais e recomendações de produtos.",
        "Explore the world of beauty with our tips, tutorials and product recommendations."
      )
    },
    "receitas": {
      title: t("Receitas", "Recipes"),
      description: t(
        "Receitas saudáveis e deliciosas para você preparar em casa.",
        "Healthy and delicious recipes for you to prepare at home."
      )
    }
  };
  
  return infoMap[slug] || { title: t("Categoria", "Category"), description: "" };
};

const Categoria = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language, t } = useLanguage();
  
  const filteredPosts = allPosts.filter(post => post.category === slug);
  const info = getCategoryInfo(slug || "", t);

  return (
    <div className="min-h-screen">
      <SEO 
        title={`${info.title} | Angonurse`}
        description={info.description}
        canonical={`https://angonurse.vercel.app/categoria/${slug}`}
        keywords={`${info.title}, artigos, ${slug}, saúde, bem-estar, angonurse`}
      />
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">{info.title}</h1>
          <p className="text-lg text-muted-foreground">{info.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300">
              <AspectRatio ratio={16 / 9}>
                <img
                  src={post.image}
                  alt={post.title}
                  className="object-cover w-full h-full rounded-t-lg"
                />
              </AspectRatio>
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <span className="font-semibold text-primary">
                    {language === "pt" ? post.categoryLabel : post.categoryLabelEn}
                  </span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {language === "pt" ? post.title : post.titleEn}
                </CardTitle>
                <CardDescription>
                  {language === "pt" ? post.description : post.descriptionEn}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {t("Nenhum post encontrado nesta categoria.", "No posts found in this category.")}
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Categoria;
