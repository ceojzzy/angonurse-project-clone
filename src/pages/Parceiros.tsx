import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageContent } from "@/hooks/usePageContent";
import { RichContent } from "@/components/RichContent";
import SEO from "@/components/SEO";

const Parceiros = () => {
  const { t } = useLanguage();
  const { getContent, getContentType, loading } = usePageContent('parceiros');

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
        title="Parceiros | Angonurse"
        description="Conheça os parceiros que colaboram com o Angonurse para trazer conteúdo de qualidade sobre saúde e bem-estar."
        canonical="https://angonurse.vercel.app/parceiros"
      />
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">
          {getContent('title', t("Parceiros", "Partners"))}
        </h1>
        <div className="prose max-w-none space-y-4">
          <RichContent 
            content={getContent('intro', t(
              "Conheça nossos parceiros que nos ajudam a trazer conteúdo de qualidade para você.",
              "Meet our partners who help us bring quality content to you."
            ))}
            isHtml={getContentType('intro') === 'html'}
            className="text-lg"
          />
          <RichContent 
            content={getContent('content_1', t(
              "Trabalhamos com organizações e profissionais comprometidos com a saúde e o bem-estar.",
              "We work with organizations and professionals committed to health and wellness."
            ))}
            isHtml={getContentType('content_1') === 'html'}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Parceiros;
