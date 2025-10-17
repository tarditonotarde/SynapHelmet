import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ParticleField } from "@/components/ParticleField";
import { PatientCard } from "@/components/PatientCard";
import { Button } from "@/components/ui/button";
import { Brain, ShieldCheck } from "lucide-react";

const mockPatients = [
  {
    id: "1",
    name: "Sarah Mitchell",
    age: 34,
    gender: "Female",
    condition: "Chronic Migraine",
    consentGiven: true,
  },
  {
    id: "2",
    name: "James Rodriguez",
    age: 28,
    gender: "Male",
    condition: "Anxiety Disorder",
    consentGiven: true,
  },
  {
    id: "3",
    name: "Emily Chen",
    age: 45,
    gender: "Female",
    condition: "Fibromyalgia",
    consentGiven: true,
  },
];

const PatientSelection = () => {
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleBeginImmersion = () => {
    if (selectedPatient) {
      navigate(`/immersion/${selectedPatient}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark relative overflow-hidden">
      <ParticleField density={60} color="#00FFFF" />

      {/* Header */}
      <header className="relative z-10 p-6 border-b border-border/30 glassmorphism">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 glow-primary">
              <Brain className="w-8 h-8 text-primary animate-pulse-glow" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground text-glow">
                Neural Empathy System
              </h1>
              <p className="text-sm text-muted-foreground">v2.0 - Patient Selection Interface</p>
            </div>
          </div>

          <div className="flex items-center gap-2 glassmorphism px-4 py-2 rounded-lg">
            <ShieldCheck className="w-5 h-5 text-accent" />
            <span className="text-sm text-foreground">Ethics Protocol Active</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto p-8">
        <div className="space-y-8">
          {/* Title Section */}
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-4xl font-bold text-foreground text-glow">
              Select Patient for Immersion
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose a patient to experience their symptoms through advanced neural connection
              technology. All participants have provided informed consent.
            </p>
          </div>

          {/* Patient Cards */}
          <div className="flex gap-6 justify-center items-center py-8 overflow-x-auto">
            {mockPatients.map((patient, index) => (
              <div
                key={patient.id}
                className="animate-slide-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <PatientCard
                  patient={patient}
                  isActive={selectedPatient === patient.id}
                  onClick={() => setSelectedPatient(patient.id)}
                />
              </div>
            ))}
          </div>

          {/* Action Button */}
          {selectedPatient && (
            <div className="flex justify-center animate-fade-in">
              <Button
                onClick={handleBeginImmersion}
                className="px-8 py-6 text-lg font-bold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground glow-primary transition-all duration-300 hover:scale-105"
              >
                <Brain className="w-6 h-6 mr-2" />
                Begin Neural Immersion
              </Button>
            </div>
          )}

          {/* Safety Notice */}
          <div className="mt-12 glassmorphism rounded-2xl p-6 border border-warning/30 max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-warning flex-shrink-0 mt-1" />
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-warning">Safety & Ethics Notice</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This system uses advanced empathetic neural mapping to simulate patient
                  experiences. All sessions are monitored and can be terminated at any time.
                  User safety protocols are active. Maximum session duration: 30 minutes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientSelection;
