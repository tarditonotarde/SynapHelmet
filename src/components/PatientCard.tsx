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
        "relative group cursor-pointer transition-all duration-500",
        "w-full rounded-2xl p-5",
        "glassmorphism flex flex-col items-center justify-between",
        isActive ? "glow-primary scale-[1.02]" : "glow-secondary opacity-80 hover:opacity-100"
      )}
      style={{
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Consent Badge */}
      {patient.consentGiven && (
        <div className="absolute top-3 right-3 animate-pulse-glow">
          <CheckCircle className="w-5 h-5 text-accent" />
        </div>
      )}

      {/* Horizontal Layout for Mobile */}
      <div className="flex items-center gap-4 w-full">
        {/* Patient Avatar */}
        <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary p-1 flex-shrink-0">
          <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
            <User className="w-10 h-10 text-primary" />
          </div>
        </div>

        {/* Patient Info */}
        <div className="card-elem flex-1 text-left space-y-1">
          <h3 className="text-lg font-bold text-foreground text-glow">{patient.name}</h3>
          <p className="text-xs text-muted-foreground">
            {patient.age} years • {patient.gender}
          </p>
          <div className="btn-card">
            <p className="text-xs text-primary font-medium">{patient.condition}</p>
          </div>
        </div>

        {/* Selection Indicator */}
        <div
          className={cn(
            "w-1 h-16 rounded-full transition-all duration-300 flex-shrink-0",
            isActive ? "bg-primary glow-primary" : "bg-secondary/30"
          )}
        />
      </div>
    </div>
  );
};
