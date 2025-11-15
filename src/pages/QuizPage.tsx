import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Clock, CheckCircle, XCircle, Award } from "lucide-react";
import SEO from "@/components/SEO";

interface Question {
  id: number;
  text: string;
  image?: string;
  options: string[];
  correctAnswer: number;
}

// Mock questions - In a real app, these would come from a database
const generateMockQuestions = (category: string): Question[] => {
  const questions: Question[] = [];
  for (let i = 1; i <= 45; i++) {
    questions.push({
      id: i,
      text: `Questão ${i} sobre ${category}: Qual das seguintes afirmações está correta?`,
      image: i % 10 === 0 ? "/placeholder.svg" : undefined,
      options: i % 10 === 0 
        ? ["Opção A", "Opção B"] 
        : ["Opção A", "Opção B", "Opção C", "Opção D", "Opção E", "Opção F"],
      correctAnswer: Math.floor(Math.random() * (i % 10 === 0 ? 2 : 6))
    });
  }
  return questions;
};

const QuizPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
  const [isFinished, setIsFinished] = useState(false);
  const [questions] = useState<Question[]>(generateMockQuestions(id || ""));

  useEffect(() => {
    if (timeLeft <= 0) {
      handleFinish();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (questionId: number, answerIndex: number) => {
    setAnswers({ ...answers, [questionId]: answerIndex });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleFinish = () => {
    setIsFinished(true);
  };

  const calculateResults = () => {
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;

    questions.forEach((question) => {
      if (answers[question.id] === undefined) {
        unanswered++;
      } else if (answers[question.id] === question.correctAnswer) {
        correct++;
      } else {
        incorrect++;
      }
    });

    return { correct, incorrect, unanswered };
  };

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const results = isFinished ? calculateResults() : null;

  if (isFinished && results) {
    return (
      <>
        <SEO 
          title="Resultado do Quiz | Angonurse"
          description="Veja seu desempenho no quiz de saúde do Angonurse."
          canonical={`https://angonurse.vercel.app/quiz/${id}`}
        />
        
        <div className="min-h-screen flex flex-col">
          <Header />
          
          <main className="flex-1 container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto">
              <Card className="animate-fade-in">
                <CardHeader className="text-center">
                  <Award className="w-16 h-16 mx-auto mb-4 text-primary" />
                  <CardTitle className="text-3xl mb-2">Quiz Concluído!</CardTitle>
                  <p className="text-muted-foreground">Confira seu desempenho abaixo</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card className="bg-green-50 border-green-200">
                      <CardContent className="pt-6 text-center">
                        <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
                        <p className="text-2xl font-bold text-green-600">{results.correct}</p>
                        <p className="text-sm text-green-700">Acertos</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-red-50 border-red-200">
                      <CardContent className="pt-6 text-center">
                        <XCircle className="w-8 h-8 mx-auto mb-2 text-red-600" />
                        <p className="text-2xl font-bold text-red-600">{results.incorrect}</p>
                        <p className="text-sm text-red-700">Erros</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gray-50 border-gray-200">
                      <CardContent className="pt-6 text-center">
                        <Clock className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                        <p className="text-2xl font-bold text-gray-600">{results.unanswered}</p>
                        <p className="text-sm text-gray-700">Não Respondidas</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="text-center">
                    <p className="text-lg mb-2">
                      Pontuação: <span className="font-bold text-primary">{((results.correct / questions.length) * 100).toFixed(1)}%</span>
                    </p>
                    <Progress value={(results.correct / questions.length) * 100} className="mb-4" />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button onClick={() => navigate("/quizes")} variant="outline">
                      Voltar aos Quizes
                    </Button>
                    <Button onClick={() => window.location.reload()}>
                      Tentar Novamente
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
          
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <SEO 
        title={`Quiz ${id} | Angonurse`}
        description={`Teste seus conhecimentos em ${id} com 45 questões interativas.`}
        canonical={`https://angonurse.vercel.app/quiz/${id}`}
      />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Questão {currentQuestion + 1} de {questions.length}
                </p>
                <Progress value={progress} className="w-64 mt-2" />
              </div>
              <div className="flex items-center gap-2 text-lg font-semibold">
                <Clock className="w-5 h-5" />
                <span className={timeLeft < 60 ? "text-red-600" : ""}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>

            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="text-xl">
                  {question.text}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {question.image && (
                  <div className="relative aspect-video w-full max-w-md mx-auto rounded-lg overflow-hidden bg-muted">
                    <img 
                      src={question.image} 
                      alt="Ilustração da questão" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <RadioGroup 
                  value={answers[question.id]?.toString()}
                  onValueChange={(value) => handleAnswer(question.id, parseInt(value))}
                >
                  <div className="space-y-3">
                    {question.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-accent transition-colors">
                        <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                        <Label 
                          htmlFor={`option-${index}`} 
                          className="flex-1 cursor-pointer font-medium"
                        >
                          {String.fromCharCode(97 + index)}) {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>

                <div className="flex justify-between pt-4">
                  <Button 
                    variant="outline" 
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                  >
                    Anterior
                  </Button>
                  
                  {currentQuestion === questions.length - 1 ? (
                    <Button onClick={handleFinish}>
                      Finalizar Quiz
                    </Button>
                  ) : (
                    <Button onClick={handleNext}>
                      Próxima
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default QuizPage;