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
      <header className="glassmorphism-head">
        <div className="head-items">
          <div className="head-line">

            <div className="p-2 rounded-lg bg-primary/10 glow-primary">
              <Brain className="w-6 h-6 text-primary animate-pulse-glow" />
            </div>

            <div className="text-head">

              <h1 className="text-title">
                SympatHelmet
              </h1>
              <p className="text-xs text-muted-foreground">v1.0 - patient selection</p>



            </div>
          </div>

         
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 h-[calc(100vh-120px)] overflow-y-auto">
        <div className="max-w-md mx-auto px-4 py-6 space-y-6">
          {/* Title Section */}
          <div className="text-center space-y-2 animate-fade-in">
            <h2 className="text-2xl font-bold text-foreground text-glow">
              Select Patient
            </h2>
            <p className="text-sm text-muted-foreground">
              Choose a patient to experience their symptoms through neural immersion
            </p>
          </div>

          {/* Patient Cards - Vertical Scroll */}
          <div className="space-y-4">
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
            <div className="sticky bottom-0 pt-4 pb-2 bg-gradient-to-t from-background via-background to-transparent animate-fade-in">
              <Button
                onClick={handleBeginImmersion}
                className="w-full py-6 text-lg font-bold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground glow-primary transition-all duration-300"
              >
                <Brain className="w-5 h-5 mr-2" />
                Begin Neural Immersion
              </Button>
            </div>
          )}

          {/* Safety Notice */}
          <div className="glassmorphism rounded-xl p-4 border border-warning/30 mb-6">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-warning">Safety & Ethics</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  All sessions monitored. Can be terminated anytime. Maximum duration: 30 min.
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
