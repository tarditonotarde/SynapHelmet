import { User, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface PatientCardProps {
  patient: {
    id: string;
    name: string;
    age: number;
    gender: string;
    condition: string;
    consentGiven: boolean;
  };
  isActive: boolean;
  onClick: () => void;
}

export const PatientCard = ({ patient, isActive, onClick }: PatientCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative group cursor-pointer transition-all duration-500 hover:scale-105",
        "min-w-[280px] h-[380px] rounded-2xl p-6",
        "glassmorphism flex flex-col items-center justify-between",
        isActive ? "glow-primary scale-105" : "glow-secondary opacity-70 hover:opacity-100"
      )}
      style={{
        transform: isActive ? "rotateY(0deg)" : "rotateY(-5deg)",
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Consent Badge */}
      {patient.consentGiven && (
        <div className="absolute top-4 right-4 animate-pulse-glow">
          <CheckCircle className="w-6 h-6 text-accent" />
        </div>
      )}

      {/* Patient Avatar */}
      <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary p-1 animate-float">
        <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
          <User className="w-16 h-16 text-primary" />
        </div>
      </div>

      {/* Patient Info */}
      <div className="text-center space-y-2 flex-1 flex flex-col justify-center">
        <h3 className="text-2xl font-bold text-foreground text-glow">{patient.name}</h3>
        <p className="text-muted-foreground">
          {patient.age} years • {patient.gender}
        </p>
        <div className="mt-4 px-4 py-2 rounded-lg bg-muted/20 border border-primary/30">
          <p className="text-sm text-primary font-medium">{patient.condition}</p>
        </div>
      </div>

      {/* Selection Indicator */}
      <div
        className={cn(
          "w-full h-1 rounded-full transition-all duration-300",
          isActive ? "bg-primary glow-primary" : "bg-secondary/30"
        )}
      />
    </div>
  );
};
