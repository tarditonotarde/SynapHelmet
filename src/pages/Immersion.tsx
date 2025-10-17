import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ParticleField } from "@/components/ParticleField";
import { SymptomVisualization } from "@/components/SymptomVisualization";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Brain, FileText, AlertTriangle, Activity, ArrowLeft } from "lucide-react";
import { toast } from "sonner";


const Immersion = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [intensity, setIntensity] = useState(0.5);
  const [notes, setNotes] = useState("");
  const [showEthicsPanel, setShowEthicsPanel] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);

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



            <div               onClick={handleEndSession}
 className="btn-inm">
              <span className="text-sm text-foreground">Connected</span>
                            <Activity 
                           className="w-5 h-5 text-primary animate-pulse" />

            </div>

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
     
             {/* Left: Symptom Visualization */}
          <div className="h-full rounded-2xl overflow-hidden border border-primary/30 glow-primary bg-card/20">
            <SymptomVisualization symptomType="pain" intensity={intensity} />
          </div>

        {/* Right: Observation Panel */}

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
              <p className="text-sm text-muted-foreground">
                Adjust the intensity of symptom simulation
              </p>
            </div>
          </div>

          {/* Notes Panel */}
          <div className="glassmorphism rounded-2xl p-6 space-y-4 glow-primary animate-fade-in">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-bold text-foreground">Observations</h3>
            </div>

            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Record your observations and diagnostic notes..."
              className="min-h-[200px] bg-background/50 border-primary/30 text-foreground resize-none"
            />

            <div className="flex gap-2">
              <Button
                onClick={() => toast.success("Notes saved to patient record")}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Save Notes
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
                  Close
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Immersion;
