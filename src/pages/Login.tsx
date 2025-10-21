import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Brain, Lock, User, ArrowRight } from "lucide-react";
import { ParticleField } from "@/components/ParticleField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ThemeToggle } from "@/components/ThemeToggle";

const DOCTOR_CREDENTIALS = {
  username: "Dr. Peter Dawson",
  password: "sympat2025",
};

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication
    setTimeout(() => {
      if (username === DOCTOR_CREDENTIALS.username && password === DOCTOR_CREDENTIALS.password) {
        toast.success("Access Granted", {
          description: "Welcome, Dr. Dawson",
        });
        setTimeout(() => {
          navigate("/patients");
        }, 800);
      } else {
        toast.error("Access Denied", {
          description: "Invalid credentials. Please try again.",
        });
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-dark relative overflow-hidden flex items-center justify-center p-4">
      <ParticleField density={60} color="#00FFFF" />
      
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md animate-fade-in">
        <div className="glassmorphism-card-neu p-8 rounded-2xl border border-primary/30">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Brain className="w-16 h-16 text-primary glow-primary animate-pulse-glow" />
            </div>
            <h1 className="text-3xl font-bold mb-2">SympatHelmet</h1>
            <p className="text-sm text-muted-foreground font-mono">
              Authorized Medical Personnel Only
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium">
                Medical ID
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your medical ID"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 glassmorphism border-primary/30 focus:border-primary"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Access Code
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your access code"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 glassmorphism border-primary/30 focus:border-primary"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-6 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground glow-primary transition-all duration-300"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Authenticating...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Access System
                  <ArrowRight className="w-5 h-5" />
                </span>
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-primary/20 text-center">
            <p className="text-xs text-muted-foreground font-mono">
              Demo Credentials:<br />
              <span className="text-primary">Dr. Peter Dawson</span> / sympat2025
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground/70 font-mono">
            All sessions are monitored and logged for security purposes
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
