import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageContent } from "@/hooks/usePageContent";
import { RichContent } from "@/components/RichContent";
import SEO from "@/components/SEO";

const QuemSomos = () => {
  const { t } = useLanguage();
  const { getContent, getContentType, loading } = usePageContent('quem-somos');

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
        title="Quem Somos | Angonurse"
        description="Conheça a Angonurse, sua fonte confiável de informações sobre saúde, bem-estar e beleza."
        canonical="https://angonurse.vercel.app/quem-somos"
      />
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">
          {getContent('title', t("Quem Somos", "About Us"))}
        </h1>
        <div className="prose max-w-none space-y-4">
          <RichContent 
            content={getContent('intro', t(
              "Bem-vindo à Angonurse, sua fonte confiável de informações sobre saúde, bem-estar e beleza.",
              "Welcome to Angonurse, your reliable source of information about health, wellness and beauty."
            ))}
            isHtml={getContentType('intro') === 'html'}
            className="text-lg"
          />
          <RichContent 
            content={getContent('content_1', t(
              "Somos uma plataforma dedicada a compartilhar conhecimento de qualidade, ajudando você a tomar decisões informadas sobre sua saúde e estilo de vida.",
              "We are a platform dedicated to sharing quality knowledge, helping you make informed decisions about your health and lifestyle."
            ))}
            isHtml={getContentType('content_1') === 'html'}
          />
          <RichContent 
            content={getContent('content_2', t(
              "Nossa equipe é formada por profissionais apaixonados por promover o bem-estar e a qualidade de vida.",
              "Our team is made up of professionals passionate about promoting well-being and quality of life."
            ))}
            isHtml={getContentType('content_2') === 'html'}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default QuemSomos;
