"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContatoPage() {
  const { language } = useLanguage();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success(language === 'pt' ? 'Mensagem enviada com sucesso!' : 'Message sent successfully!');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">
            {language === 'pt' ? 'Contato' : 'Contact'}
          </h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'pt' ? 'Envie sua mensagem' : 'Send your message'}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input placeholder={language === 'pt' ? 'Nome' : 'Name'} required />
                  <Input type="email" placeholder="Email" required />
                  <Textarea placeholder={language === 'pt' ? 'Mensagem' : 'Message'} rows={5} required />
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (language === 'pt' ? 'Enviando...' : 'Sending...') : (language === 'pt' ? 'Enviar' : 'Send')}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">contato@angonurse.com</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">{language === 'pt' ? 'Telefone' : 'Phone'}</h3>
                    <p className="text-muted-foreground">+244 123 456 789</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">{language === 'pt' ? 'Endereço' : 'Address'}</h3>
                    <p className="text-muted-foreground">Luanda, Angola</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
