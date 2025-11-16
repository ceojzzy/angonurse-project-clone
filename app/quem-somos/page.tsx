"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

export default function QuemSomosPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">
            {language === 'pt' ? 'Quem Somos' : 'About Us'}
          </h1>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              {language === 'pt' 
                ? 'Bem-vindo ao Angonurse, o seu portal de saúde, bem-estar e beleza. Nossa missão é fornecer informações confiáveis e atualizadas sobre temas que impactam sua qualidade de vida.'
                : 'Welcome to Angonurse, your health, wellness and beauty portal. Our mission is to provide reliable and up-to-date information on topics that impact your quality of life.'}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
