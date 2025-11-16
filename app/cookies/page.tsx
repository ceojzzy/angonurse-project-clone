"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CookiesPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">
            {language === 'pt' ? 'Política de Cookies' : 'Cookie Policy'}
          </h1>
          
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h2>{language === 'pt' ? 'O que são Cookies?' : 'What are Cookies?'}</h2>
            <p>
              {language === 'pt' 
                ? 'Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você visita nosso site.'
                : 'Cookies are small text files stored on your device when you visit our website.'}
            </p>

            <h2>{language === 'pt' ? 'Como Usamos Cookies' : 'How We Use Cookies'}</h2>
            <p>
              {language === 'pt' 
                ? 'Utilizamos cookies para melhorar sua experiência, personalizar conteúdo e analisar o tráfego do site.'
                : 'We use cookies to improve your experience, personalize content and analyze site traffic.'}
            </p>

            <h2>{language === 'pt' ? 'Gerenciar Cookies' : 'Manage Cookies'}</h2>
            <p>
              {language === 'pt' 
                ? 'Você pode gerenciar ou desativar cookies nas configurações do seu navegador.'
                : 'You can manage or disable cookies in your browser settings.'}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
