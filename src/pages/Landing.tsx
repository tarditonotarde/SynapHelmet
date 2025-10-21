import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Brain } from "lucide-react";
import { ParticleField } from "@/components/ParticleField";

const Landing = () => {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Auto-navigate to login after 3 seconds
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        navigate("/login");
      }, 800);
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={`min-h-screen bg-gradient-dark relative overflow-hidden flex items-center justify-center transition-opacity duration-800 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <ParticleField density={80} color="#00FFFF" />
      
      <div className="relative z-10 text-center space-y-8 animate-fade-in px-4">
        {/* Animated Logo */}
        <div className="flex justify-center mb-8 animate-float">
          <div className="relative">
            <Brain className="w-32 h-32 text-primary glow-primary animate-pulse-glow" />
            <div className="absolute inset-0 bg-gradient-atomic rounded-full blur-3xl opacity-50" />
          </div>
        </div>

        {/* App Name */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-7xl font-bold text-foreground tracking-wider">
            SympatHelmet
          </h1>
          <div className="h-1 w-64 mx-auto bg-gradient-retro rounded-full glow-primary" />
          <p className="text-lg md:text-xl text-muted-foreground font-mono tracking-wide">
            Neural Immersion Technology
          </p>
          <p className="text-sm text-muted-foreground/70 font-mono">
            v1.0.0 | Medical Protocol System
          </p>
        </div>

        {/* Loading Indicator */}
        <div className="flex justify-center gap-2 pt-8">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
};

export default Landing;
