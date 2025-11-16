"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PoliticaDePrivacidadePage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">
            {language === 'pt' ? 'Política de Privacidade' : 'Privacy Policy'}
          </h1>
          
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h2>{language === 'pt' ? 'Coleta de Dados' : 'Data Collection'}</h2>
            <p>
              {language === 'pt' 
                ? 'O Angonurse coleta apenas informações necessárias para melhorar sua experiência no site.'
                : 'Angonurse only collects information necessary to improve your experience on the site.'}
            </p>

            <h2>{language === 'pt' ? 'Uso de Dados' : 'Data Usage'}</h2>
            <p>
              {language === 'pt' 
                ? 'Seus dados são usados exclusivamente para fornecer nossos serviços e melhorar sua experiência.'
                : 'Your data is used exclusively to provide our services and improve your experience.'}
            </p>

            <h2>{language === 'pt' ? 'Cookies' : 'Cookies'}</h2>
            <p>
              {language === 'pt' 
                ? 'Utilizamos cookies para melhorar a navegação e personalizar conteúdo.'
                : 'We use cookies to improve navigation and personalize content.'}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
