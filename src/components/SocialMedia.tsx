import { Facebook, Youtube, Linkedin, Twitter, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const SocialMedia = () => {
  const { t } = useLanguage();
  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://facebook.com/angonurse",
      color: "hover:bg-[#1877F2] hover:text-white",
    },
    {
      name: "TikTok",
      icon: () => (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
        </svg>
      ),
      url: "https://www.tiktok.com/@angonurse?_t=ZN-8yQdvsaGzp8&_r=1",
      color: "hover:bg-black hover:text-white",
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: "https://youtube.com/@angonurse?si=H6k8P8vjyJvru6xj",
      color: "hover:bg-[#FF0000] hover:text-white",
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      url: "https://whatsapp.com/channel/0029VbAkfjb0Qeamx7kuuR28",
      color: "hover:bg-[#25D366] hover:text-white",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://whatsapp.com/channel/0029VbAkfjb0Qeamx7kuuR28",
      color: "hover:bg-[#0A66C2] hover:text-white",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://www.tiktok.com/@angonurse?_t=ZN-8yQdvsaGzp8&_r=1",
      color: "hover:bg-[#1DA1F2] hover:text-white",
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("Siga-nos nas Redes Sociais", "Follow Us on Social Media")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t(
              "Conecte-se conosco e fique por dentro de todas as novidades",
              "Connect with us and stay up to date with all the news"
            )}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
          {socialLinks.map((social) => {
            const IconComponent = social.icon;
            return (
              <Button
                key={social.name}
                variant="outline"
                size="lg"
                className={`transition-all duration-300 ${social.color}`}
                asChild
              >
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <IconComponent />
                  {social.name}
                </a>
              </Button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SocialMedia;
