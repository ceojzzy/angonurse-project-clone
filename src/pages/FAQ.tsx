import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageContent } from "@/hooks/usePageContent";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SEO from "@/components/SEO";

const FAQ = () => {
  const { language, t } = useLanguage();
  const { contents, loading } = usePageContent('faq');

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-muted rounded w-1/2"></div>
            <div className="h-20 bg-muted rounded w-full"></div>
            <div className="h-20 bg-muted rounded w-full"></div>
            <div className="h-20 bg-muted rounded w-full"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Filter FAQ items (section_key format: "faq_1", "faq_2", etc.)
  const faqItems = contents
    .filter(c => c.section_key.startsWith('faq_'))
    .map(c => ({
      question: language === 'pt' ? c.content_pt : c.content_en,
      answer: language === 'pt' ? 
        contents.find(a => a.section_key === `${c.section_key}_answer`)?.content_pt || '' :
        contents.find(a => a.section_key === `${c.section_key}_answer`)?.content_en || ''
    }));

  // Fallback FAQs if database is empty
  const defaultFaqs = [
    {
      question: t("O conteúdo da Angonurse é confiável?", "Is Angonurse content reliable?"),
      answer: t(
        "Sim, todo nosso conteúdo é baseado em fontes confiáveis e revisado por profissionais.",
        "Yes, all our content is based on reliable sources and reviewed by professionals."
      )
    },
    {
      question: t("Com que frequência vocês publicam novos artigos?", "How often do you publish new articles?"),
      answer: t(
        "Publicamos novos artigos regularmente, várias vezes por semana.",
        "We publish new articles regularly, several times a week."
      )
    }
  ];

  const displayFaqs = faqItems.length > 0 ? faqItems : defaultFaqs;

  return (
    <div className="min-h-screen">
      <SEO 
        title="Perguntas Frequentes | Angonurse"
        description="Encontre respostas para as perguntas mais comuns sobre saúde, bem-estar e nossos serviços no Angonurse."
        canonical="https://angonurse.vercel.app/faq"
      />
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">
          {t("Perguntas Frequentes", "Frequently Asked Questions")}
        </h1>
        <div className="max-w-3xl">
          <Accordion type="single" collapsible>
            {displayFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
