import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageContent } from "@/hooks/usePageContent";
import { RichContent } from "@/components/RichContent";
import SEO from "@/components/SEO";

const PoliticaDePrivacidade = () => {
  const { t } = useLanguage();
  const { getContent, getContentType, loading } = usePageContent('politica-de-privacidade');

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-muted rounded w-1/3"></div>
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-full"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SEO 
        title="Política de Privacidade | Angonurse"
        description="Saiba como o Angonurse protege seus dados pessoais e respeita sua privacidade."
        canonical="https://angonurse.vercel.app/politica-de-privacidade"
      />
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">
          {getContent('title', t("Política de Privacidade", "Privacy Policy"))}
        </h1>
        <div className="prose max-w-none space-y-4">
          <p className="text-lg">
            {getContent('update_date', t("Última atualização: 2025", "Last updated: 2025"))}
          </p>
          <RichContent 
            content={getContent('content', t(
              "<h2>1. Informações que Coletamos</h2><p>Coletamos informações que você nos fornece diretamente, como quando se inscreve em nossa newsletter.</p><h2>2. Como Usamos suas Informações</h2><p>Usamos as informações coletadas para melhorar nossos serviços e enviar conteúdo relevante.</p>",
              "<h2>1. Information We Collect</h2><p>We collect information you provide directly to us, such as when you subscribe to our newsletter.</p><h2>2. How We Use Your Information</h2><p>We use the information collected to improve our services and send relevant content.</p>"
            ))}
            isHtml={getContentType('content') === 'html'}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PoliticaDePrivacidade;
