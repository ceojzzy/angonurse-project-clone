"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

export default function SitemapPage() {
  const { language } = useLanguage();

  const links = [
    { href: "/", label: language === 'pt' ? 'Início' : 'Home' },
    { href: "/categoria/Saúde", label: language === 'pt' ? 'Saúde' : 'Health' },
    { href: "/categoria/Bem-estar", label: language === 'pt' ? 'Bem-estar' : 'Wellness' },
    { href: "/categoria/Beleza", label: language === 'pt' ? 'Beleza' : 'Beauty' },
    { href: "/quem-somos", label: language === 'pt' ? 'Quem Somos' : 'About Us' },
    { href: "/nossa-missao", label: language === 'pt' ? 'Nossa Missão' : 'Our Mission' },
    { href: "/equipe", label: language === 'pt' ? 'Equipe' : 'Team' },
    { href: "/contato", label: language === 'pt' ? 'Contato' : 'Contact' },
    { href: "/faq", label: language === 'pt' ? 'FAQ' : 'FAQ' },
    { href: "/newsletter", label: 'Newsletter' },
    { href: "/parceiros", label: language === 'pt' ? 'Parceiros' : 'Partners' },
    { href: "/politica-de-privacidade", label: language === 'pt' ? 'Política de Privacidade' : 'Privacy Policy' },
    { href: "/termos-de-uso", label: language === 'pt' ? 'Termos de Uso' : 'Terms of Use' },
    { href: "/cookies", label: language === 'pt' ? 'Cookies' : 'Cookies' },
    { href: "/disclaimer", label: language === 'pt' ? 'Aviso Legal' : 'Disclaimer' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">
            {language === 'pt' ? 'Mapa do Site' : 'Sitemap'}
          </h1>
          
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href}
                  className="text-primary hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
