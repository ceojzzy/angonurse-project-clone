"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ParceirosPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">
            {language === 'pt' ? 'Parceiros' : 'Partners'}
          </h1>
          
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              {language === 'pt' 
                ? 'O Angonurse está aberto a parcerias com empresas e profissionais da área de saúde, bem-estar e beleza.'
                : 'Angonurse is open to partnerships with companies and professionals in the health, wellness and beauty sector.'}
            </p>
            <p>
              {language === 'pt' 
                ? 'Entre em contato conosco para saber mais sobre oportunidades de colaboração.'
                : 'Contact us to learn more about collaboration opportunities.'}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
