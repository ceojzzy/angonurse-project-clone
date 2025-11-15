import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageContent } from "@/hooks/usePageContent";
import { RichContent } from "@/components/RichContent";
import SEO from "@/components/SEO";

const Cookies = () => {
  const { t } = useLanguage();
  const { getContent, getContentType, loading } = usePageContent('cookies');

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
        title="Política de Cookies | Angonurse"
        description="Entenda como o Angonurse utiliza cookies para melhorar sua experiência de navegação."
        canonical="https://angonurse.vercel.app/cookies"
      />
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">
          {getContent('title', t("Política de Cookies", "Cookie Policy"))}
        </h1>
        <div className="prose max-w-none space-y-4">
          <p className="text-lg">
            {getContent('update_date', t("Última atualização: 2025", "Last updated: 2025"))}
          </p>
          <RichContent 
            content={getContent('content', t(
              "<h2>O que são Cookies?</h2><p>Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você visita nosso site.</p><h2>Como Usamos Cookies</h2><p>Usamos cookies para melhorar sua experiência de navegação e entender como nosso site é utilizado.</p>",
              "<h2>What are Cookies?</h2><p>Cookies are small text files stored on your device when you visit our site.</p><h2>How We Use Cookies</h2><p>We use cookies to improve your browsing experience and understand how our site is used.</p>"
            ))}
            isHtml={getContentType('content') === 'html'}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cookies;
