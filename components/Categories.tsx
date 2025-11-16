"use client";

import { Heart, Sparkles, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

const Categories = () => {
  const { language } = useLanguage();

  const categories = [
    {
      name_pt: "Saúde",
      name_en: "Health",
      icon: Activity,
      color: "text-primary",
    },
    {
      name_pt: "Bem-estar",
      name_en: "Wellness",
      icon: Heart,
      color: "text-secondary",
    },
    {
      name_pt: "Beleza",
      name_en: "Beauty",
      icon: Sparkles,
      color: "text-accent",
    },
  ];

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {language === 'pt' ? 'Categorias' : 'Categories'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            const name = language === 'pt' ? category.name_pt : category.name_en;
            
            return (
              <Link key={name} href={`/categoria/${category.name_pt}`}>
                <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-8 text-center">
                    <Icon className={`w-16 h-16 mx-auto mb-4 ${category.color} group-hover:scale-110 transition-transform`} />
                    <h3 className="text-xl font-semibold">{name}</h3>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
