"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

export default function DisclaimerPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">
            {language === 'pt' ? 'Aviso Legal' : 'Disclaimer'}
          </h1>
          
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              {language === 'pt' 
                ? 'As informações fornecidas no Angonurse são apenas para fins educacionais e informativos. Não devem ser consideradas como aconselhamento médico profissional.'
                : 'The information provided on Angonurse is for educational and informational purposes only. It should not be considered as professional medical advice.'}
            </p>
            <p>
              {language === 'pt' 
                ? 'Sempre consulte um profissional de saúde qualificado para diagnóstico e tratamento adequados.'
                : 'Always consult a qualified healthcare professional for proper diagnosis and treatment.'}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
