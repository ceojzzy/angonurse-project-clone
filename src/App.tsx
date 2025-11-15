import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import QuemSomos from "./pages/QuemSomos";
import NossaMissao from "./pages/NossaMissao";
import Equipe from "./pages/Equipe";
import Contato from "./pages/Contato";
import Categoria from "./pages/Categoria";
import Article from "./pages/Article";
import Blog from "./pages/Blog";
import NewsletterPage from "./pages/NewsletterPage";
import Parceiros from "./pages/Parceiros";
import FAQ from "./pages/FAQ";
import TermosDeUso from "./pages/TermosDeUso";
import PoliticaDePrivacidade from "./pages/PoliticaDePrivacidade";
import Cookies from "./pages/Cookies";
import Disclaimer from "./pages/Disclaimer";
import Sitemap from "./pages/Sitemap";
import QuizList from "./pages/QuizList";
import QuizPage from "./pages/QuizPage";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/quem-somos" element={<QuemSomos />} />
            <Route path="/nossa-missao" element={<NossaMissao />} />
            <Route path="/equipe" element={<Equipe />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/categoria/:slug" element={<Categoria />} />
            <Route path="/artigo/:slug" element={<Article />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/newsletter" element={<NewsletterPage />} />
              <Route path="/parceiros" element={<Parceiros />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/termos-de-uso" element={<TermosDeUso />} />
              <Route path="/politica-de-privacidade" element={<PoliticaDePrivacidade />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
              <Route path="/sitemap" element={<Sitemap />} />
              <Route path="/quizes" element={<QuizList />} />
              <Route path="/quiz/:id" element={<QuizPage />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin" element={<Admin />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
