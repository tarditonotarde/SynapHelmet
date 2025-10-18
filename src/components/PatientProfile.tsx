import { Card } from "@/components/ui/card";
import { User, Calendar, Activity, FileText } from "lucide-react";

interface PatientData {
  id: string;
  name: string;
  age: number;
  gender: string;
  condition: string;
  lastSession?: string;
  totalSessions?: number;
  averageIntensity?: number;
}

interface PatientProfileProps {
  patient: PatientData;
}

export const PatientProfile = ({ patient }: PatientProfileProps) => {
  return (
    <Card className="glassmorphism-card-neu rounded-2xl p-6 border-accent/30 glow-atomic">
      <div className="space-y-4">
        <div className="flex items-center gap-3 border-b border-accent/20 pb-3">
          <User className="w-6 h-6 text-accent" />
          <h3 className="text-lg font-bold text-foreground">Patient Profile</h3>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground font-mono">Name:</span>
            <span className="text-sm font-bold text-foreground">{patient.name}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground font-mono">Age:</span>
            <span className="text-sm font-bold text-foreground">{patient.age} years</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground font-mono">Gender:</span>
            <span className="text-sm font-bold text-foreground">{patient.gender}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground font-mono">Condition:</span>
            <span className="text-sm font-bold text-primary">{patient.condition}</span>
          </div>
        </div>

        <div className="border-t border-accent/20 pt-3 space-y-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-secondary" />
            <span className="text-xs text-muted-foreground font-mono">
              Last Session: {patient.lastSession || "First session"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-secondary" />
            <span className="text-xs text-muted-foreground font-mono">
              Total Sessions: {patient.totalSessions || 0}
            </span>
          </div>

          {patient.averageIntensity !== undefined && (
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-secondary" />
              <span className="text-xs text-muted-foreground font-mono">
                Avg Intensity: {(patient.averageIntensity * 100).toFixed(0)}%
              </span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
