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

type ConnectionState = "disconnected" | "connected" | "paused";

const Immersion = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [intensity, setIntensity] = useState(0.5);
  const [notes, setNotes] = useState("");
  const [showEthicsPanel, setShowEthicsPanel] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [connectionState, setConnectionState] = useState<ConnectionState>("disconnected");
  const [hasSignedEthics, setHasSignedEthics] = useState(false);
  const [showPastNotes, setShowPastNotes] = useState(false);
  
  const patient = mockPatients[patientId as keyof typeof mockPatients];

  useEffect(() => {
    // Session timer - only runs when connected
    if (connectionState !== "connected") return;

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
  }, [connectionState]);

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
    if (connectionState === "disconnected") {
      if (!hasSignedEthics) {
        setShowEthicsPanel(true);
      } else {
        setConnectionState("connected");
        toast.success("Immersion connected successfully");
      }
    } else if (connectionState === "connected") {
      setConnectionState("paused");
      toast.info("Immersion paused");
    } else {
      setConnectionState("connected");
      toast.success("Immersion resumed");
    }
  };

  const handleDisconnect = () => {
    setConnectionState("disconnected");
    setSessionTime(0);
    toast.info("Immersion disconnected. Session reset.");
  };

  const handleSignEthics = () => {
    setHasSignedEthics(true);
    setConnectionState("connected");
    setShowEthicsPanel(false);
    toast.success("Ethics form signed. Immersion connected.");
  };

  const getConnectionLabel = () => {
    switch (connectionState) {
      case "connected":
        return "Connected";
      case "paused":
        return "Paused";
      default:
        return "Disconnected";
    }
  };

  const getConnectionColor = () => {
    switch (connectionState) {
      case "connected":
        return "text-primary";
      case "paused":
        return "text-warning";
      default:
        return "text-muted-foreground";
    }
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
              className="btn-inm cursor-pointer hover:bg-primary/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label={`Connection status: ${getConnectionLabel()}. Click to ${connectionState === "disconnected" ? "connect" : connectionState === "connected" ? "pause" : "resume"}`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleConnectionToggle();
                }
              }}
            >
              <span className={`text-sm font-semibold ${getConnectionColor()}`}>
                {getConnectionLabel()}
              </span>
              <Activity 
                className={`w-5 h-5 ${connectionState === "connected" ? 'text-primary animate-pulse' : connectionState === "paused" ? 'text-warning' : 'text-muted-foreground'}`} 
                aria-hidden="true"
              />
            </button>

            {connectionState !== "disconnected" && (
              <button
                onClick={handleDisconnect}
                className="btn-inm cursor-pointer hover:bg-destructive/10 transition-colors focus:outline-none focus:ring-2 focus:ring-destructive/50"
                aria-label="Disconnect immersion and reset session"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleDisconnect();
                  }
                }}
              >
                <span className="text-sm text-destructive font-semibold">
                  Disconnect
                </span>
              </button>
            )}

            <div className="btn-inm" role="timer" aria-live="polite" aria-atomic="true">
              <span className="text-sm text-foreground">Session Time</span>
              <span className="text-primary font-bold font-mono" aria-label={`Session duration: ${formatTime(sessionTime)}`}>
                {formatTime(sessionTime)}
              </span>
            </div>

            <Button
              variant="outline"
              onClick={() => setShowEthicsPanel(!showEthicsPanel)}
              className="border-warning text-warning hover:bg-warning/10 focus:ring-2 focus:ring-warning/50"
              aria-label="View ethics and safety protocol"
            >
              <AlertTriangle className="w-4 h-4 mr-2" aria-hidden="true" />
              Ethics
            </Button>
          </div>
        </div>
      </header>

      {/* Main Immersion View */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Symptom Visualization */}
        <div className="h-64 w-full rounded-2xl overflow-hidden border border-primary/30 glow-primary bg-card/20" role="img" aria-label="Visual representation of patient symptom intensity">
          <SymptomVisualization symptomType="pain" intensity={intensity} />
        </div>

        {/* Patient Profile */}
        {patient && <PatientProfile patient={patient} />}

        {/* Two Column Layout for Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          {/* Medical Stats */}
          <MedicalStats currentIntensity={intensity} sessionTime={sessionTime} isConnected={connectionState === "connected"} />
          
          {/* Emotional Metrics */}
          <EmotionalMetrics intensity={intensity} />
        </div>

        {/* Intensity Control */}
        <div className="glassmorphism-card-inm rounded-2xl p-6 space-y-4 glow-secondary animate-fade-in w-full" role="region" aria-label="Neural intensity control">
          <div className="flex items-center gap-3">
            <Brain className="w-6 h-6 text-secondary" aria-hidden="true" />
            <h3 className="text-lg font-bold text-foreground">Neural Intensity</h3>
          </div>

          <div className="space-y-3">
            <Slider
              value={[intensity * 100]}
              onValueChange={(value) => setIntensity(value[0] / 100)}
              max={100}
              step={1}
              className="w-full"
              aria-label={`Neural intensity slider. Current value: ${Math.round(intensity * 100)}%`}
            />
            <p className="text-sm text-muted-foreground font-mono" role="note">
              Adjust the intensity of symptom simulation (Current: {Math.round(intensity * 100)}%)
            </p>
          </div>
        </div>

        {/* Notes Panel with Audio Recording */}
        <div className="glassmorphism rounded-2xl p-6 space-y-4 glow-primary animate-fade-in w-full" role="region" aria-label="Session observations and notes">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-primary" aria-hidden="true" />
            <h3 className="text-lg font-bold text-foreground">Observations</h3>
          </div>

          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Record your observations and diagnostic notes..."
            className="min-h-[200px] bg-background/50 border-primary/30 text-foreground resize-none font-mono focus:ring-2 focus:ring-primary/50"
            aria-label="Session observation notes"
          />

          <div className="flex flex-col gap-3">
            <AudioRecorder onTranscriptionComplete={handleTranscription} />
            
            <Button
              onClick={() => toast.success("Notes saved to patient record")}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground focus:ring-2 focus:ring-primary/50"
              aria-label="Save current session notes to patient record"
            >
              Save Notes
            </Button>

            <Button
              onClick={() => setShowPastNotes(true)}
              variant="outline"
              className="w-full border-primary/30 text-foreground focus:ring-2 focus:ring-primary/50"
              aria-label="View past session notes and records"
            >
              <FileText className="w-4 h-4 mr-2" aria-hidden="true" />
              View Past Notes & Sessions
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 w-full flex flex-col items-center">
          <Button
            onClick={handleEndSession}
            className="btn-end w-full max-w-sm bg-destructive hover:bg-destructive/90 text-destructive-foreground glow-destructive focus:ring-2 focus:ring-destructive/50"
            aria-label="End current immersion session and return to patient selection"
          >
            <AlertTriangle className="w-4 h-4 mr-2" aria-hidden="true" />
            End Session
          </Button>
        </div>
      </main>

      {/* Ethics Panel Overlay */}
      {showEthicsPanel && (
        <div 
          className="fixed inset-0 z-30 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-fade-in p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ethics-title"
        >
          <div className="glassmorphism rounded-2xl p-6 sm:p-8 max-w-2xl w-full glow-warning border border-warning/30 max-h-[90vh] overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 id="ethics-title" className="text-xl sm:text-2xl font-bold text-warning text-glow">
                  Ethics & Safety Protocol
                </h2>
                <Button
                  variant="ghost"
                  onClick={() => setShowEthicsPanel(false)}
                  className="text-muted-foreground focus:ring-2 focus:ring-warning/50"
                  aria-label={hasSignedEthics ? "Close ethics panel" : "Cancel and close ethics panel"}
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
                      className="bg-warning hover:bg-warning/90 text-warning-foreground focus:ring-2 focus:ring-warning/50"
                      aria-label="Sign ethics form and connect to immersion"
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
        <div 
          className="fixed inset-0 z-30 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-fade-in p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="past-notes-title"
        >
          <div className="glassmorphism rounded-2xl p-6 sm:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto glow-primary border border-primary/30">
            <div className="space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 id="past-notes-title" className="text-xl sm:text-2xl font-bold text-primary text-glow">
                  Past Notes & Sessions
                </h2>
                <Button
                  variant="ghost"
                  onClick={() => setShowPastNotes(false)}
                  className="text-muted-foreground focus:ring-2 focus:ring-primary/50"
                  aria-label="Close past notes dialog"
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
