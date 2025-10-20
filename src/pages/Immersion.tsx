import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ParticleField } from "@/components/ParticleField";
import { SymptomVisualization } from "@/components/SymptomVisualization";
import { AudioRecorder } from "@/components/AudioRecorder";
import { PatientProfile } from "@/components/PatientProfile";
import { MedicalStats } from "@/components/MedicalStats";
import { EmotionalMetrics } from "@/components/EmotionalMetrics";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Brain, FileText, AlertTriangle, Activity } from "lucide-react";
import { toast } from "sonner";


const mockPatients = {
  "1": {
    id: "1",
    name: "Sarah Mitchell",
    age: 34,
    gender: "Female",
    condition: "Chronic Migraine",
    lastSession: "2025-03-15",
    totalSessions: 8,
    averageIntensity: 0.65,
  },
  "2": {
    id: "2",
    name: "James Rodriguez",
    age: 28,
    gender: "Male",
    condition: "Anxiety Disorder",
    lastSession: "2025-03-18",
    totalSessions: 5,
    averageIntensity: 0.52,
  },
  "3": {
    id: "3",
    name: "Emily Chen",
    age: 45,
    gender: "Female",
    condition: "Fibromyalgia",
    lastSession: "2025-03-20",
    totalSessions: 12,
    averageIntensity: 0.73,
  },
};

const Immersion = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [intensity, setIntensity] = useState(0.5);
  const [notes, setNotes] = useState("");
  const [showEthicsPanel, setShowEthicsPanel] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [hasSignedEthics, setHasSignedEthics] = useState(false);
  const [showPastNotes, setShowPastNotes] = useState(false);
  
  const patient = mockPatients[patientId as keyof typeof mockPatients];

  useEffect(() => {
    // Session timer
    const timer = setInterval(() => {
      setSessionTime((prev) => prev + 1);
    }, 1000);

    // Safety warning at 5 minutes
    const warningTimeout = setTimeout(() => {
      toast.warning("5 minutes elapsed. Consider taking a break for your well-being.", {
        duration: 5000,
      });
    }, 300000);

    return () => {
      clearInterval(timer);
      clearTimeout(warningTimeout);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleEndSession = () => {
    toast.success("Session ended. Patient data saved.");
    navigate("/");
  };

  const handleTranscription = (text: string) => {
    setNotes(prev => prev + (prev ? "\n\n" : "") + `[Audio Note]: ${text}`);
  };

  const handleConnectionToggle = () => {
    if (!isConnected && !hasSignedEthics) {
      setShowEthicsPanel(true);
    } else {
      setIsConnected(!isConnected);
      if (isConnected) {
        toast.info("Immersion disconnected");
      } else {
        toast.success("Immersion connected successfully");
      }
    }
  };

  const handleSignEthics = () => {
    setHasSignedEthics(true);
    setIsConnected(true);
    setShowEthicsPanel(false);
    toast.success("Ethics form signed. Immersion connected.");
  };

  return (
    <div className="min-h-screen bg-gradient-dark relative overflow-hidden">
      <ParticleField density={80} color="#8A2BE2" />

      {/* Header HUD */}
      <header className="glassmorphism-head">
        <div className="head-items-2">

          <div className="logo-head">
  <Brain               onClick={handleEndSession}
className="holo-brain logo-h"/>
</div>

          <div className="head-line-2">



            <button 
              onClick={handleConnectionToggle}
              className="btn-inm cursor-pointer hover:bg-primary/10 transition-colors"
            >
              <span className="text-sm text-foreground">
                {isConnected ? "Connected" : "Disconnected"}
              </span>
              <Activity 
                className={`w-5 h-5 ${isConnected ? 'text-primary animate-pulse' : 'text-muted-foreground'}`} 
              />
            </button>

            <div className="btn-inm">
              <span className="text-sm text-foreground">Session Time</span>
              <span className="text-primary font-bold">{formatTime(sessionTime)}</span>

            </div>

            <Button
              variant="outline"
              onClick={() => setShowEthicsPanel(!showEthicsPanel)}
              className="border-warning text-warning hover:bg-warning/10"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Ethics
            </Button>
          </div>
        </div>
      </header>

      {/* Main Immersion View */}
      <main>
        {/* Symptom Visualization */}
        <div className="h-64 rounded-2xl overflow-hidden border border-primary/30 glow-primary bg-card/20">
          <SymptomVisualization symptomType="pain" intensity={intensity} />
        </div>

        {/* Patient Profile */}
        {patient && <PatientProfile patient={patient} />}

        {/* Two Column Layout for Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Medical Stats */}
          <MedicalStats currentIntensity={intensity} sessionTime={sessionTime} isConnected={isConnected} />
          
          {/* Emotional Metrics */}
          <EmotionalMetrics intensity={intensity} />
        </div>

        {/* Intensity Control */}
        <div className="glassmorphism-card-inm rounded-2xl p-6 space-y-4 glow-secondary animate-fade-in">
          <div className="flex items-center gap-3">
            <Brain className="w-6 h-6 text-secondary" />
            <h3 className="text-lg font-bold text-foreground">Neural Intensity</h3>
          </div>

          <div className="space-y-3">
            <Slider
              value={[intensity * 100]}
              onValueChange={(value) => setIntensity(value[0] / 100)}
              max={100}
              step={1}
              className="w-full"
            />
            <p className="text-sm text-muted-foreground font-mono">
              Adjust the intensity of symptom simulation
            </p>
          </div>
        </div>

        {/* Notes Panel with Audio Recording */}
        <div className="glassmorphism rounded-2xl p-6 space-y-4 glow-primary animate-fade-in">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-primary" />
            <h3 className="text-lg font-bold text-foreground">Observations</h3>
          </div>

          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Record your observations and diagnostic notes..."
            className="min-h-[200px] bg-background/50 border-primary/30 text-foreground resize-none font-mono"
          />

          <div className="flex flex-col gap-3">
            <AudioRecorder onTranscriptionComplete={handleTranscription} />
            
            <Button
              onClick={() => toast.success("Notes saved to patient record")}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Save Notes
            </Button>

            <Button
              onClick={() => setShowPastNotes(true)}
              variant="outline"
              className="w-full border-primary/30 text-foreground"
            >
              <FileText className="w-4 h-4 mr-2" />
              View Past Notes & Sessions
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleEndSession}
            className="btn-end w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground glow-destructive"
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            End Session
          </Button>
        </div>
      </main>

      {/* Ethics Panel Overlay */}
      {showEthicsPanel && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-fade-in">
          <div className="glassmorphism rounded-2xl p-8 max-w-2xl glow-warning border border-warning/30">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-warning text-glow">
                  Ethics & Safety Protocol
                </h2>
                <Button
                  variant="ghost"
                  onClick={() => setShowEthicsPanel(false)}
                  className="text-muted-foreground"
                >
                  {hasSignedEthics ? "Close" : "Cancel"}
                </Button>
              </div>

              <div className="space-y-4 text-foreground">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold">Informed Consent</h3>
                    <p className="text-sm text-muted-foreground">
                      Patient has provided explicit consent for neural immersion therapy
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold">Privacy Protection</h3>
                    <p className="text-sm text-muted-foreground">
                      All neural data is encrypted and anonymized per medical standards
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold">Usage Limits</h3>
                    <p className="text-sm text-muted-foreground">
                      Maximum session: 30 minutes. Mandatory 2-hour cooldown between sessions
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold">Emergency Protocol</h3>
                    <p className="text-sm text-muted-foreground">
                      Session can be terminated immediately if distress levels exceed safety
                      thresholds
                    </p>
                  </div>
                </div>

                {!hasSignedEthics && (
                  <div className="flex justify-end pt-4 border-t border-warning/20">
                    <Button
                      onClick={handleSignEthics}
                      className="bg-warning hover:bg-warning/90 text-warning-foreground"
                    >
                      Sign & Connect
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Past Notes Dialog */}
      {showPastNotes && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-fade-in">
          <div className="glassmorphism rounded-2xl p-8 max-w-3xl w-full max-h-[80vh] overflow-y-auto glow-primary border border-primary/30">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-primary text-glow">
                  Past Notes & Sessions
                </h2>
                <Button
                  variant="ghost"
                  onClick={() => setShowPastNotes(false)}
                  className="text-muted-foreground"
                >
                  Close
                </Button>
              </div>

              <div className="space-y-4">
                {/* Last Session Summary */}
                <div className="glassmorphism-card-neu rounded-lg p-4 border border-accent/20">
                  <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-secondary" />
                    Last Session
                  </h3>
                  <div className="text-sm text-muted-foreground space-y-1 font-mono">
                    <p>Date: {patient?.lastSession}</p>
                    <p>Duration: 23 minutes</p>
                    <p>Avg Intensity: {(patient?.averageIntensity * 100).toFixed(0)}%</p>
                    <p>Max Heart Rate: 118 bpm</p>
                  </div>
                </div>

                {/* Past Notes */}
                <div className="space-y-3">
                  <h3 className="font-bold text-foreground">Previous Notes</h3>
                  
                  <div className="glassmorphism-card-neu rounded-lg p-4 border border-primary/20">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs text-muted-foreground font-mono">2025-03-15 14:30</span>
                      <span className="text-xs text-secondary font-mono">Session #7</span>
                    </div>
                    <p className="text-sm text-foreground">
                      Patient reported decreased migraine intensity. Neural immersion at 65% 
                      showed positive response. Recommend continuing current treatment protocol.
                    </p>
                  </div>

                  <div className="glassmorphism-card-neu rounded-lg p-4 border border-primary/20">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs text-muted-foreground font-mono">2025-03-12 10:15</span>
                      <span className="text-xs text-secondary font-mono">Session #6</span>
                    </div>
                    <p className="text-sm text-foreground">
                      Initial calibration session. Patient tolerated immersion well. 
                      Starting intensity at 50% with gradual increase planned.
                    </p>
                  </div>

                  <div className="glassmorphism-card-neu rounded-lg p-4 border border-primary/20">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs text-muted-foreground font-mono">2025-03-08 16:45</span>
                      <span className="text-xs text-secondary font-mono">Session #5</span>
                    </div>
                    <p className="text-sm text-foreground">
                      Patient exhibited strong empathetic response during session. 
                      Vital signs remained stable throughout. No adverse effects reported.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Immersion;
