"use client";

import { useState } from "react";
import { Menu, X, Search, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import NavLink from "./NavLink";
import { SearchDialog } from "@/components/SearchDialog";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const { language, toggleLanguage } = useLanguage();
  const { user, signOut } = useAuth();


  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/angonurse-logo.png"
                alt="Angonurse Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <Image
                src="/angonurse-text-logo.png"
                alt="Angonurse"
                width={120}
                height={30}
                className="h-8 w-auto hidden sm:block"
              />
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              <NavLink to="/" className="text-sm hover:text-primary transition-colors">
                {language === 'pt' ? 'Início' : 'Home'}
              </NavLink>
              <NavLink to="/categoria/Saúde" className="text-sm hover:text-primary transition-colors">
                {language === 'pt' ? 'Saúde' : 'Health'}
              </NavLink>
              <NavLink to="/categoria/Bem-estar" className="text-sm hover:text-primary transition-colors">
                {language === 'pt' ? 'Bem-estar' : 'Wellness'}
              </NavLink>
              <NavLink to="/categoria/Beleza" className="text-sm hover:text-primary transition-colors">
                {language === 'pt' ? 'Beleza' : 'Beauty'}
              </NavLink>
              <NavLink to="/quem-somos" className="text-sm hover:text-primary transition-colors">
                {language === 'pt' ? 'Quem Somos' : 'About Us'}
              </NavLink>
            </nav>

            <div className="flex items-center space-x-2">
              <SearchDialog />
              
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleLanguage}
                aria-label={language === 'pt' ? 'Mudar idioma' : 'Change language'}
              >
                <Globe className="h-5 w-5" />
              </Button>

              {user && (
                <Link href="/admin">
                  <Button variant="outline" size="sm">
                    Admin
                  </Button>
                </Link>
              )}

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Menu"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t">
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-3">
              <NavLink to="/" className="text-sm hover:text-primary transition-colors">
                {language === 'pt' ? 'Início' : 'Home'}
              </NavLink>
              <NavLink to="/categoria/Saúde" className="text-sm hover:text-primary transition-colors">
                {language === 'pt' ? 'Saúde' : 'Health'}
              </NavLink>
              <NavLink to="/categoria/Bem-estar" className="text-sm hover:text-primary transition-colors">
                {language === 'pt' ? 'Bem-estar' : 'Wellness'}
              </NavLink>
              <NavLink to="/categoria/Beleza" className="text-sm hover:text-primary transition-colors">
                {language === 'pt' ? 'Beleza' : 'Beauty'}
              </NavLink>
              <NavLink to="/quem-somos" className="text-sm hover:text-primary transition-colors">
                {language === 'pt' ? 'Quem Somos' : 'About Us'}
              </NavLink>
            </nav>
          </div>
        )}
      </header>

      
    </>
  );
};

export default Header;
