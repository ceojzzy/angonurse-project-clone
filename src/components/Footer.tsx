import { Heart, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import logo from "@/assets/angonurse-logo.png";

const Footer = () => {
  const { t } = useLanguage();
  
  const footerLinks = {
    [t("Sobre", "About")]: [
      { name: t("Quem Somos", "About Us"), href: "/quem-somos" },
      { name: t("Nossa Missão", "Our Mission"), href: "/nossa-missao" },
      { name: t("Equipe", "Team"), href: "/equipe" },
      { name: t("Contato", "Contact"), href: "/contato" },
    ],
    [t("Conteúdos", "Content")]: [
      { name: t("Saúde", "Health"), href: "/categoria/saude" },
      { name: t("Bem-estar", "Wellness"), href: "/categoria/bem-estar" },
      { name: t("Beleza", "Beauty"), href: "/categoria/beleza" },
      { name: t("Receitas", "Recipes"), href: "/categoria/receitas" },
    ],
    [t("Recursos", "Resources")]: [
      { name: t("Blog", "Blog"), href: "/blog" },
      { name: t("Newsletter", "Newsletter"), href: "/newsletter" },
      { name: t("Parceiros", "Partners"), href: "/parceiros" },
      { name: "FAQ", href: "/faq" },
      { name: t("Sitemap", "Sitemap"), href: "/sitemap" },
    ],
    [t("Legal", "Legal")]: [
      { name: t("Termos de Uso", "Terms of Use"), href: "/termos-de-uso" },
      { name: t("Política de Privacidade", "Privacy Policy"), href: "/politica-de-privacidade" },
      { name: "Cookies", href: "/cookies" },
      { name: "Disclaimer", href: "/disclaimer" },
    ],
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <a href="/" className="flex items-center space-x-2 mb-4">
              <img src={logo} alt="Angonurse Logo" className="h-10 w-10" />
              <span className="text-xl font-bold text-primary">Angonurse</span>
            </a>
            <p className="text-sm text-muted-foreground mb-4">
              {t(
                "Compartilhando conhecimento confiável sobre saúde, bem-estar e beleza.",
                "Sharing reliable knowledge about health, wellness and beauty."
              )}
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
      
      <div className="bg-gradient-primary mt-12">
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center text-sm text-white">
          <p>{t("© 2025 Angonurse. Todos os direitos reservados.", "© 2025 Angonurse. All rights reserved.")}</p>
          <p className="flex items-center mt-4 md:mt-0 text-sm text-gray-600">
  {t("Inspirando saúde e bem-estar todos os dias", "Inspiring health and wellness every day")}
</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
