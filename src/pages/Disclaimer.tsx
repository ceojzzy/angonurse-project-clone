import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageContent } from "@/hooks/usePageContent";
import { RichContent } from "@/components/RichContent";
import SEO from "@/components/SEO";

const Disclaimer = () => {
  const { t } = useLanguage();
  const { getContent, getContentType, loading } = usePageContent('disclaimer');

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
        title="Disclaimer | Angonurse"
        description="Leia o disclaimer do Angonurse. Informações importantes sobre o uso do nosso conteúdo."
        canonical="https://angonurse.vercel.app/disclaimer"
      />
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">
          {getContent('title', t("Disclaimer", "Disclaimer"))}
        </h1>
        <div className="prose max-w-none space-y-4">
          <p className="text-lg font-semibold">
            {getContent('subtitle', t("Aviso Importante sobre Conteúdo de Saúde", "Important Notice about Health Content"))}
          </p>
          <RichContent 
            content={getContent('content', t(
              "<h2>Informações Gerais</h2><p>As informações fornecidas neste site são apenas para fins educacionais e informativos.</p><h2>Não Substitui Aconselhamento Médico</h2><p>O conteúdo deste site não deve ser usado como substituto para aconselhamento, diagnóstico ou tratamento médico profissional.</p><p>Sempre consulte um profissional de saúde qualificado para qualquer questão relacionada à sua saúde.</p>",
              "<h2>General Information</h2><p>The information provided on this site is for educational and informational purposes only.</p><h2>Does Not Replace Medical Advice</h2><p>The content on this site should not be used as a substitute for professional medical advice, diagnosis or treatment.</p><p>Always consult a qualified healthcare professional for any health-related questions.</p>"
            ))}
            isHtml={getContentType('content') === 'html'}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Disclaimer;
