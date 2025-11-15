import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageContent } from "@/hooks/usePageContent";
import { RichContent } from "@/components/RichContent";
import SEO from "@/components/SEO";

const Contato = () => {
  const { t } = useLanguage();
  const { getContent, getContentType, loading } = usePageContent('contato');

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-muted rounded w-1/3"></div>
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-12 bg-muted rounded w-full"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SEO 
        title="Contato | Angonurse"
        description="Entre em contato conosco. Estamos aqui para responder suas dúvidas sobre saúde, bem-estar e beleza."
        canonical="https://angonurse.vercel.app/contato"
      />
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">
          {getContent('title', t("Contato", "Contact"))}
        </h1>
        <div className="max-w-2xl">
          <RichContent 
            content={getContent('intro', t("Entre em contato conosco. Estamos aqui para ajudar!", "Contact us. We are here to help!"))}
            isHtml={getContentType('intro') === 'html'}
            className="text-lg mb-8"
          />
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                {t("Nome", "Name")}
              </label>
              <Input placeholder={t("Seu nome", "Your name")} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input type="email" placeholder={t("angonurse@gmail.com", "angonurse@gmail.com")} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                {t("Mensagem", "Message")}
              </label>
              <Textarea placeholder={t("Sua mensagem", "Your message")} rows={6} />
            </div>
            <Button className="w-full">
              {t("Enviar Mensagem", "Send Message")}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contato;
