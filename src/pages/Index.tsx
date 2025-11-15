import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedArticles from "@/components/FeaturedArticles";
import RecentArticles from "@/components/RecentArticles";
import SocialMedia from "@/components/SocialMedia";
import Newsletter from "@/components/Newsletter";
import WeeklyUpdates from "@/components/WeeklyUpdates";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO 
        title="Angonurse - Saúde, Bem-estar e Beleza"
        description="Portal de conteúdos sobre saúde, bem-estar, beleza, tratamentos, autocuidado e receitas saudáveis. Cuide do seu corpo e mente com Angonurse."
        canonical="https://angonurse.vercel.app/"
        keywords="saúde, bem-estar, beleza, tratamentos, autocuidado, receitas saudáveis, angonurse"
      />
      <Header />
      <main>
        <Hero />
        <FeaturedArticles />
        <RecentArticles />
        <SocialMedia />
        <Newsletter />
        <WeeklyUpdates />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
