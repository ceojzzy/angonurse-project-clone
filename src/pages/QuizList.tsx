import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Brain, Clock, Award } from "lucide-react";
import SEO from "@/components/SEO";

const quizzes = [
  {
    id: "enfermagem",
    title: "Enfermagem",
    description: "Teste seus conhecimentos em práticas de enfermagem e cuidados de saúde",
    questions: 45,
    difficulty: "Intermediário",
    color: "bg-blue-500"
  },
  {
    id: "analises-clinicas",
    title: "Análises Clínicas",
    description: "Avalie seu domínio em análises laboratoriais e diagnósticos",
    questions: 45,
    difficulty: "Avançado",
    color: "bg-purple-500"
  },
  {
    id: "farmacia",
    title: "Farmácia",
    description: "Desafie-se com questões sobre medicamentos e farmacologia",
    questions: 45,
    difficulty: "Intermediário",
    color: "bg-green-500"
  },
  {
    id: "dermatologia",
    title: "Dermatologia",
    description: "Teste seus conhecimentos sobre pele e tratamentos dermatológicos",
    questions: 45,
    difficulty: "Intermediário",
    color: "bg-pink-500"
  },
  {
    id: "fisioterapia",
    title: "Fisioterapia",
    description: "Avalie seu conhecimento em reabilitação e terapias físicas",
    questions: 45,
    difficulty: "Intermediário",
    color: "bg-orange-500"
  },
  {
    id: "medicina",
    title: "Medicina",
    description: "Desafie-se com questões médicas abrangentes",
    questions: 45,
    difficulty: "Avançado",
    color: "bg-red-500"
  },
  {
    id: "estomatologia",
    title: "Estomatologia",
    description: "Teste seus conhecimentos em saúde bucal e estomatologia",
    questions: 45,
    difficulty: "Intermediário",
    color: "bg-cyan-500"
  }
];

const QuizList = () => {
  return (
    <>
      <SEO 
        title="Quiz Angonurse - Teste seus Conhecimentos em Saúde"
        description="Desafie-se com quizzes interativos sobre enfermagem, medicina, farmácia e outras áreas da saúde. 45 perguntas por quiz com tempo limite de 15 minutos."
        canonical="https://angonurse.vercel.app/quizes"
      />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <Brain className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Quiz Angonurse</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Teste seus conhecimentos em diversas áreas da saúde. Cada quiz contém 45 perguntas com tempo limite de 15 minutos.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizzes.map((quiz) => (
                <Card key={quiz.id} className="hover:shadow-lg transition-shadow animate-fade-in">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg ${quiz.color} flex items-center justify-center mb-4`}>
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl">{quiz.title}</CardTitle>
                    <CardDescription className="text-base mt-2">
                      {quiz.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>15 min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        <span>{quiz.questions} questões</span>
                      </div>
                    </div>
                    <Badge variant="secondary">{quiz.difficulty}</Badge>
                    <Button 
                      className="w-full"
                      onClick={() => window.location.href = `/quiz/${quiz.id}`}
                    >
                      Iniciar Quiz
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default QuizList;