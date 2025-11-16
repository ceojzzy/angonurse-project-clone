"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TermosDeUsoPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">
            {language === 'pt' ? 'Termos de Uso' : 'Terms of Use'}
          </h1>
          
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h2>{language === 'pt' ? 'Aceitação dos Termos' : 'Acceptance of Terms'}</h2>
            <p>
              {language === 'pt' 
                ? 'Ao acessar o Angonurse, você concorda com estes termos de uso.'
                : 'By accessing Angonurse, you agree to these terms of use.'}
            </p>

            <h2>{language === 'pt' ? 'Uso do Conteúdo' : 'Content Usage'}</h2>
            <p>
              {language === 'pt' 
                ? 'O conteúdo do site é fornecido para fins informativos apenas.'
                : 'The site content is provided for informational purposes only.'}
            </p>

            <h2>{language === 'pt' ? 'Direitos Autorais' : 'Copyright'}</h2>
            <p>
              {language === 'pt' 
                ? 'Todo conteúdo é protegido por direitos autorais e não pode ser reproduzido sem permissão.'
                : 'All content is protected by copyright and may not be reproduced without permission.'}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
