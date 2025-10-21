import { useEffect, useState } from "react";
import { Activity, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SymptomVisualizationProps {
  symptomType: "pain" | "fatigue" | "dizziness" | "anxiety";
  intensity: number;
}

export const SymptomVisualization = ({ symptomType, intensity }: SymptomVisualizationProps) => {
  const [pulsePhase, setPulsePhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulsePhase((prev) => (prev + 1) % 100);
    }, 20);

    return () => clearInterval(interval);
  }, []);

  const getSymptomConfig = () => {
    switch (symptomType) {
      case "pain":
        return {
          color: "hsl(0 100% 64%)",
          pattern: "radial-gradient(circle, hsl(0 100% 64% / 0.3) 0%, transparent 70%)",
          description: "Pulsing pain waves detected",
          icon: AlertCircle,
        };
      case "fatigue":
        return {
          color: "hsl(51 100% 50%)",
          pattern: "linear-gradient(180deg, hsl(51 100% 50% / 0.2) 0%, transparent 100%)",
          description: "Energy depletion pattern",
          icon: Activity,
        };
      case "dizziness":
        return {
          color: "hsl(180 100% 41%)",
          pattern: "conic-gradient(from 0deg, hsl(180 100% 41% / 0.3), transparent, hsl(180 100% 41% / 0.3))",
          description: "Rotational instability",
          icon: Activity,
        };
      case "anxiety":
        return {
          color: "hsl(271 76% 53%)",
          pattern: "radial-gradient(ellipse, hsl(271 76% 53% / 0.2) 0%, transparent 60%)",
          description: "Heightened neural activity",
          icon: AlertCircle,
        };
    }
  };

  const config = getSymptomConfig();
  const Icon = config.icon;

  return (
    <div className="relative flex items-center justify-center overflow-hidden">
      {/* Animated Background Pattern */}
      <div
        className="absolute inset-0 animate-pulse-glow"
        style={{
          background: config.pattern,
          transform: `scale(${1 + intensity * 0.5})`,
          opacity: 0.6 + intensity * 0.4,
        }}
      />

      {/* Pulsing Circles for Pain */}
      {symptomType === "pain" && (
        <>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute rounded-full border-2 animate-ping"
              style={{
                borderColor: config.color,
                width: `${100 + i * 100}px`,
                height: `${100 + i * 100}px`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${2 + intensity}s`,
              }}
            />
          ))}
        </>
      )}

      {/* Rotating Pattern for Dizziness */}
      {symptomType === "dizziness" && (
        <div
          className="absolute w-96 h-96 rounded-full"
          style={{
            background: `conic-gradient(from ${pulsePhase * 3.6}deg, ${config.color}, transparent, ${config.color})`,
            opacity: 0.3 + intensity * 0.3,
          }}
        />
      )}

      {/* Glitch Effect for Anxiety */}
      {symptomType === "anxiety" && pulsePhase % 10 === 0 && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            background: `linear-gradient(${Math.random() * 360}deg, ${config.color} 0%, transparent 50%)`,
            opacity: 0.2,
          }}
        />
      )}

      {/* Center HUD */}
      <div className="relative z-10 glassmorphism-card-symp rounded-2xl p-8 space-y-4">
        <div className="flex items-center gap-4">
          <Icon className="w-8 h-8 text-primary animate-pulse-glow" />
          <div>
            <h3 className="text-xl font-bold text-foreground text-glow">
              {symptomType.charAt(0).toUpperCase() + symptomType.slice(1)}
            </h3>
            <p className="text-sm text-muted-foreground">{config.description}</p>
          </div>
        </div>

        {/* Intensity Meter */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Intensity</span>
            <span className="text-primary font-bold">{Math.round(intensity * 100)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full transition-all duration-300 rounded-full",
                intensity > 0.7 ? "bg-destructive glow-destructive" : "bg-primary glow-primary"
              )}
              style={{ width: `${intensity * 100}%` }}
            />
          </div>
        </div>

        {/* Vital Signs */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">Heart Rate</p>
            <p className="text-lg font-bold text-primary">
              {Math.round(60 + intensity * 60)} bpm
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Neural Load</p>
            <p className="text-lg font-bold text-secondary">
              {Math.round(30 + intensity * 70)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
