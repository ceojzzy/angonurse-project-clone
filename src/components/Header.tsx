import { useState } from "react";
import { Menu, X, Languages, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SearchDialog } from "@/components/SearchDialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/angonurse-logo.png";
import textLogo from "@/assets/angonurse-text-logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    await signOut();
    toast({
      title: t("Logout realizado", "Logged out"),
      description: t("Você saiu da sua conta com sucesso", "You have been logged out successfully"),
    });
    navigate("/");
  };

  const navItems = [
    { name: t("Blog", "Blog"), href: "/blog" },
    { name: t("Saúde", "Health"), href: "/categoria/saude" },
    { name: t("Bem-estar", "Wellness"), href: "/categoria/bem-estar" },
    { name: t("Beleza", "Beauty"), href: "/categoria/beleza" },
    { name: t("Receitas", "Recipes"), href: "/categoria/receitas" },
    { name: t("Sobre", "About"), href: "/quem-somos" },
    { name: t("Admin", "Admin"), href: "/admin" },
    ...(user 
      ? [{ name: t("Logout", "Logout"), href: "#", onClick: handleLogout }]
      : [{ name: t("Login", "Login"), href: "/auth" }]
    ),
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <a href="/" className="flex items-center space-x-2">
            <img src={logo} alt="Angonurse Logo" className="h-10 w-10" />
            <img src={textLogo} alt="Angonurse" className="h-10" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  if (item.onClick) {
                    e.preventDefault();
                    item.onClick();
                  }
                }}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <SearchDialog />
            
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={t("Selecionar idioma", "Select language")}
                >
                  <Languages className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-2">
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      if (language !== "pt") toggleLanguage();
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                      language === "pt"
                        ? "bg-primary/10 text-primary font-medium"
                        : "hover:bg-accent"
                    }`}
                  >
                    <span>Português</span>
                    {language === "pt" && <Check className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => {
                      if (language !== "en") toggleLanguage();
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                      language === "en"
                        ? "bg-primary/10 text-primary font-medium"
                        : "hover:bg-accent"
                    }`}
                  >
                    <span>English</span>
                    {language === "en" && <Check className="h-4 w-4" />}
                  </button>
                </div>
              </PopoverContent>
            </Popover>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 animate-slide-in">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block py-2 text-sm font-medium text-foreground/80 hover:text-primary"
                onClick={(e) => {
                  if (item.onClick) {
                    e.preventDefault();
                    item.onClick();
                  }
                  setIsMenuOpen(false);
                }}
              >
                {item.name}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
