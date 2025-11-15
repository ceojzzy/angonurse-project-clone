import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageContent } from "@/hooks/usePageContent";
import { RichContent } from "@/components/RichContent";
import SEO from "@/components/SEO";

const TermosDeUso = () => {
  const { t } = useLanguage();
  const { getContent, getContentType, loading } = usePageContent('termos-de-uso');

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
        title="Termos de Uso | Angonurse"
        description="Leia os termos de uso do portal Angonurse. Conheça as regras e diretrizes para uso do nosso conteúdo."
        canonical="https://angonurse.vercel.app/termos-de-uso"
      />
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">
          {getContent('title', t("Termos de Uso", "Terms of Use"))}
        </h1>
        <div className="prose max-w-none space-y-4">
          <p className="text-lg">
            {getContent('update_date', t("Última atualização: 2025", "Last updated: 2025"))}
          </p>
          <RichContent 
            content={getContent('content', t(
              "<h2>1. Aceitação dos Termos</h2><p>Ao acessar e usar este site, você aceita e concorda em cumprir estes termos de uso.</p><h2>2. Uso do Conteúdo</h2><p>O conteúdo deste site é fornecido apenas para fins informativos e não substitui aconselhamento médico profissional.</p>",
              "<h2>1. Acceptance of Terms</h2><p>By accessing and using this site, you accept and agree to comply with these terms of use.</p><h2>2. Use of Content</h2><p>The content on this site is provided for informational purposes only and does not replace professional medical advice.</p>"
            ))}
            isHtml={getContentType('content') === 'html'}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermosDeUso;
