import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageContent } from "@/hooks/usePageContent";
import { RichContent } from "@/components/RichContent";
import SEO from "@/components/SEO";

const Equipe = () => {
  const { t } = useLanguage();
  const { getContent, getContentType, loading } = usePageContent('equipe');

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-muted rounded w-1/3"></div>
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SEO 
        title="Nossa Equipe | Angonurse"
        description="Conheça a equipe de profissionais dedicados a trazer conteúdo de qualidade sobre saúde e bem-estar."
        canonical="https://angonurse.vercel.app/equipe"
      />
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">
          {getContent('title', t("Nossa Equipe", "Our Team"))}
        </h1>
        <div className="prose max-w-none space-y-4">
          <RichContent 
            content={getContent('intro', t(
              "Conheça a equipe por trás da Angonurse.",
              "Meet the team behind Angonurse."
            ))}
            isHtml={getContentType('intro') === 'html'}
            className="text-lg"
          />
          <RichContent 
            content={getContent('content_1', t(
              "Somos um grupo diversificado de profissionais dedicados a trazer o melhor conteúdo sobre saúde, bem-estar e beleza para você.",
              "We are a diverse group of professionals dedicated to bringing you the best content about health, wellness and beauty."
            ))}
            isHtml={getContentType('content_1') === 'html'}
          />
          <RichContent 
            content={getContent('content_2', t(
              "Nossa equipe inclui especialistas em saúde, nutricionistas, editores e criadores de conteúdo apaixonados pelo que fazem.",
              "Our team includes health experts, nutritionists, editors and content creators passionate about what they do."
            ))}
            isHtml={getContentType('content_2') === 'html'}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Equipe;
