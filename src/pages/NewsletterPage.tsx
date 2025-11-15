import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import SEO from "@/components/SEO";

const NewsletterPage = () => {
  return (
    <div className="min-h-screen">
      <SEO 
        title="Newsletter | Angonurse"
        description="Inscreva-se na newsletter do Angonurse e receba conteúdo exclusivo sobre saúde, bem-estar e beleza diretamente no seu email."
        canonical="https://angonurse.vercel.app/newsletter"
      />
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">Newsletter</h1>
        <div className="prose max-w-none mb-8">
          <p className="text-lg mb-4">
            Inscreva-se em nossa newsletter e receba conteúdo exclusivo diretamente no seu email.
          </p>
          <p>
            Atualizações semanais com os melhores artigos, dicas e novidades sobre saúde e bem-estar.
          </p>
        </div>
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default NewsletterPage;
