import { useState, useEffect } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isInTopHalf, setIsInTopHalf] = useState(true);
  let scrollTimeout: NodeJS.Timeout;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      // Determine if in top 50% or bottom 50%
      setIsInTopHalf(scrollPercentage <= 50);
      
      // Show button while scrolling
      setIsVisible(true);

      // Clear existing timeout
      clearTimeout(scrollTimeout);

      // Hide button after user stops scrolling (2 seconds)
      scrollTimeout = setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const handleClick = () => {
    if (isInTopHalf) {
      // Scroll to bottom
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    } else {
      // Scroll to top
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <Button
      onClick={handleClick}
      className={`fixed bottom-8 right-8 z-50 rounded-full w-12 h-12 p-0 shadow-lg bg-gradient-primary hover:opacity-90 transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16 pointer-events-none"
      }`}
      aria-label={isInTopHalf ? "Rolar para baixo" : "Voltar ao topo"}
    >
      {isInTopHalf ? (
        <ArrowDown className="h-6 w-6 text-white" />
      ) : (
        <ArrowUp className="h-6 w-6 text-white" />
      )}
    </Button>
  );
};

export default ScrollToTop;
