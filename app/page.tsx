import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedArticles from "@/components/FeaturedArticles";
import RecentArticles from "@/components/RecentArticles";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <FeaturedArticles />
        <RecentArticles />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
