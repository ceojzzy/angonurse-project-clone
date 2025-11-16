"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQPage() {
  const { language } = useLanguage();

  const faqs = [
    {
      question_pt: "O que é o Angonurse?",
      question_en: "What is Angonurse?",
      answer_pt: "Angonurse é um portal de conteúdos sobre saúde, bem-estar e beleza, com artigos confiáveis e atualizados.",
      answer_en: "Angonurse is a content portal about health, wellness and beauty, with reliable and up-to-date articles."
    },
    {
      question_pt: "Como posso contribuir com conteúdo?",
      question_en: "How can I contribute content?",
      answer_pt: "Entre em contato conosco através da página de contato para saber mais sobre colaborações.",
      answer_en: "Contact us through the contact page to learn more about collaborations."
    },
    {
      question_pt: "Com que frequência novos artigos são publicados?",
      question_en: "How often are new articles published?",
      answer_pt: "Publicamos novos artigos semanalmente, cobrindo diversos temas de saúde e bem-estar.",
      answer_en: "We publish new articles weekly, covering various health and wellness topics."
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">
            {language === 'pt' ? 'Perguntas Frequentes' : 'Frequently Asked Questions'}
          </h1>
          
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>
                  {language === 'pt' ? faq.question_pt : faq.question_en}
                </AccordionTrigger>
                <AccordionContent>
                  {language === 'pt' ? faq.answer_pt : faq.answer_en}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
      <Footer />
    </div>
  );
}
