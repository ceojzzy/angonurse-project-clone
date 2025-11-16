"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Target, Users } from "lucide-react";

export default function NossaMissaoPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">
            {language === 'pt' ? 'Nossa Missão' : 'Our Mission'}
          </h1>
          
          <div className="prose prose-lg max-w-none dark:prose-invert mb-12">
            <p>
              {language === 'pt' 
                ? 'No Angonurse, acreditamos que saúde, bem-estar e beleza são pilares fundamentais para uma vida plena e feliz. Nossa missão é democratizar o acesso à informação de qualidade sobre estes temas.'
                : 'At Angonurse, we believe that health, wellness and beauty are fundamental pillars for a full and happy life. Our mission is to democratize access to quality information on these topics.'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Heart className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">
                  {language === 'pt' ? 'Saúde' : 'Health'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {language === 'pt' 
                    ? 'Informações confiáveis sobre cuidados com a saúde'
                    : 'Reliable information about healthcare'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Target className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">
                  {language === 'pt' ? 'Bem-estar' : 'Wellness'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {language === 'pt' 
                    ? 'Dicas para uma vida equilibrada e feliz'
                    : 'Tips for a balanced and happy life'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">
                  {language === 'pt' ? 'Comunidade' : 'Community'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {language === 'pt' 
                    ? 'Compartilhando conhecimento e experiências'
                    : 'Sharing knowledge and experiences'}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
