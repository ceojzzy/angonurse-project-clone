import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageContent } from "@/hooks/usePageContent";
import { RichContent } from "@/components/RichContent";
import SEO from "@/components/SEO";

const NossaMissao = () => {
  const { t } = useLanguage();
  const { getContent, getContentType, loading } = usePageContent('nossa-missao');

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
        title="Nossa Missão | Angonurse"
        description="Conheça a missão da Angonurse em promover saúde, bem-estar e qualidade de vida através de informações confiáveis."
        canonical="https://angonurse.vercel.app/nossa-missao"
      />
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">
          {getContent('title', t("Nossa Missão", "Our Mission"))}
        </h1>
        <div className="prose max-w-none space-y-4">
          <RichContent 
            content={getContent('intro', t(
              "Nossa missão é democratizar o acesso à informação de qualidade sobre saúde e bem-estar.",
              "Our mission is to democratize access to quality information about health and wellness."
            ))}
            isHtml={getContentType('intro') === 'html'}
            className="text-lg"
          />
          <RichContent 
            content={getContent('content_1', t(
              "Acreditamos que todos merecem ter acesso a conteúdo confiável que os ajude a viver vidas mais saudáveis e felizes.",
              "We believe everyone deserves access to reliable content that helps them live healthier, happier lives."
            ))}
            isHtml={getContentType('content_1') === 'html'}
          />
          <RichContent 
            content={getContent('content_2', t(
              "Trabalhamos todos os dias para criar e compartilhar conteúdo que faça diferença na vida das pessoas.",
              "We work every day to create and share content that makes a difference in people's lives."
            ))}
            isHtml={getContentType('content_2') === 'html'}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NossaMissao;
