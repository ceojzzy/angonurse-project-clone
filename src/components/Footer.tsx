"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import SocialMedia from "./SocialMedia";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const { language } = useLanguage();

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image
                src="/angonurse-logo.png"
                alt="Angonurse"
                width={40}
                height={40}
              />
              <span className="font-bold text-xl">Angonurse</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              {language === 'pt' 
                ? 'Portal de saúde, bem-estar e beleza'
                : 'Health, wellness and beauty portal'}
            </p>
            <SocialMedia />
          </div>

          <div>
            <h3 className="font-semibold mb-4">
              {language === 'pt' ? 'Navegação' : 'Navigation'}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  {language === 'pt' ? 'Início' : 'Home'}
                </Link>
              </li>
              <li>
                <Link href="/categoria/Saúde" className="text-muted-foreground hover:text-foreground transition-colors">
                  {language === 'pt' ? 'Saúde' : 'Health'}
                </Link>
              </li>
              <li>
                <Link href="/categoria/Bem-estar" className="text-muted-foreground hover:text-foreground transition-colors">
                  {language === 'pt' ? 'Bem-estar' : 'Wellness'}
                </Link>
              </li>
              <li>
                <Link href="/categoria/Beleza" className="text-muted-foreground hover:text-foreground transition-colors">
                  {language === 'pt' ? 'Beleza' : 'Beauty'}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">
              {language === 'pt' ? 'Sobre' : 'About'}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/quem-somos" className="text-muted-foreground hover:text-foreground transition-colors">
                  {language === 'pt' ? 'Quem Somos' : 'About Us'}
                </Link>
              </li>
              <li>
                <Link href="/nossa-missao" className="text-muted-foreground hover:text-foreground transition-colors">
                  {language === 'pt' ? 'Nossa Missão' : 'Our Mission'}
                </Link>
              </li>
              <li>
                <Link href="/equipe" className="text-muted-foreground hover:text-foreground transition-colors">
                  {language === 'pt' ? 'Equipe' : 'Team'}
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-muted-foreground hover:text-foreground transition-colors">
                  {language === 'pt' ? 'Contato' : 'Contact'}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/politica-de-privacidade" className="text-muted-foreground hover:text-foreground transition-colors">
                  {language === 'pt' ? 'Política de Privacidade' : 'Privacy Policy'}
                </Link>
              </li>
              <li>
                <Link href="/termos-de-uso" className="text-muted-foreground hover:text-foreground transition-colors">
                  {language === 'pt' ? 'Termos de Uso' : 'Terms of Use'}
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover:text-foreground transition-colors">
                  Cookies
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-muted-foreground hover:text-foreground transition-colors">
                  {language === 'pt' ? 'Aviso Legal' : 'Disclaimer'}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Angonurse. {language === 'pt' ? 'Todos os direitos reservados.' : 'All rights reserved.'}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
