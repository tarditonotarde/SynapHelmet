import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ParticleField } from "@/components/ParticleField";
import { PatientCard } from "@/components/PatientCard";
import { Button } from "@/components/ui/button";
import { Brain, ShieldCheck, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

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

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-dark relative overflow-hidden">
      <ParticleField density={60} color="#00FFFF" />

      {/* Header */}
      <header className="glassmorphism-head">
        <div className="head-items">
          <div className="head-line">
            <div className="logo-head">
              <Brain className="holo-brain logo-h"/>
            </div>

            <div className="text-head">
              <h1 className="text-title">
                SympatHelmet
              </h1>
              <p className="text-xs text-muted-foreground">v1.0 - patient selection</p>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button
              variant="outline"
              size="icon"
              onClick={handleLogout}
              className="glassmorphism border-destructive/30 hover:border-destructive hover:bg-destructive/10 transition-all duration-300"
              aria-label="Logout"
            >
              <LogOut className="h-5 w-5 text-destructive" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="">

          {/* Title Section */}
          <div className="text-center space-y-2 animate-fade-in">
            <h2 className="">
              Select Patient
            </h2>
            <p className="text-sm text-muted-foreground">
              Choose a patient to experience their symptoms through neural immersion
            </p>
          </div>

          {/* Patient Cards - Vertical Scroll */}
          <div className="space-y-4">
            {mockPatients.map((patient, index) => (
              <div key={patient.id}>
                <div
                  className="animate-slide-in"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <PatientCard
                    patient={patient}
                    isActive={selectedPatient === patient.id}
                    onClick={() => setSelectedPatient(patient.id)}
                  />
                </div>
                
                {/* Action Button - appears below selected patient */}
                {selectedPatient === patient.id && (
                  <div className="mt-3 animate-fade-in">
                    <Button
                      onClick={handleBeginImmersion}
                      className="w-full py-6 text-lg font-bold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground glow-primary transition-all duration-300"
                    >
                      <Brain className="w-5 h-5 mr-2" />
                      Begin Neural Immersion
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>

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
      </main>
    </div>
  );
};

export default PatientSelection;
