"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import { useLanguage } from "@/contexts/LanguageContext";

export default function NewsletterPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-4">
            {language === 'pt' ? 'Newsletter' : 'Newsletter'}
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            {language === 'pt' 
              ? 'Receba conteúdos exclusivos sobre saúde, bem-estar e beleza diretamente no seu email.'
              : 'Receive exclusive content about health, wellness and beauty directly in your email.'}
          </p>
          <Newsletter />
        </div>
      </main>
      <Footer />
    </div>
  );
}
