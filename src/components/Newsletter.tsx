import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Newsletter = () => {
  const { t } = useLanguage();
  return (
    <section className="py-16 bg-gradient-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center text-white space-y-6">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/20 mb-4">
            <Mail className="h-8 w-8" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">
            {t("Receba Conteúdos Exclusivos", "Receive Exclusive Content")}
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            {t(
              "Assine nossa newsletter e receba dicas de saúde, bem-estar e receitas saudáveis diretamente no seu e-mail",
              "Subscribe to our newsletter and receive health, wellness and healthy recipe tips directly in your email"
            )}
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder={t("Seu melhor e-mail", "Your best email")}
              className="bg-white text-foreground border-0 h-12"
            />
            <Button type="submit" size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold h-12 px-8">
              {t("Assinar", "Subscribe")}
            </Button>
          </form>
          <p className="text-sm text-white/80">
            {t(
              "Sem spam, apenas conteúdo de qualidade. Cancele quando quiser.",
              "No spam, only quality content. Cancel anytime."
            )}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
