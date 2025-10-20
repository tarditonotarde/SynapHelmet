import { Card } from "@/components/ui/card";
import { Heart, Brain, Frown, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface EmotionalMetricsProps {
  intensity: number;
}

export const EmotionalMetrics = ({ intensity }: EmotionalMetricsProps) => {
  // Simulate emotional metrics that vary with intensity
  const painLevel = Math.round(intensity * 85);
  const anxietyLevel = Math.round(intensity * 72);
  const stressLevel = Math.round(intensity * 68);
  const discomfortLevel = Math.round(intensity * 79);

  const metrics = [
    {
      label: "Pain Level",
      value: painLevel,
      icon: Frown,
      color: painLevel > 70 ? "text-destructive" : painLevel > 40 ? "text-warning" : "text-secondary",
      bgColor: painLevel > 70 ? "bg-destructive" : painLevel > 40 ? "bg-warning" : "bg-secondary",
    },
    {
      label: "Anxiety",
      value: anxietyLevel,
      icon: Brain,
      color: anxietyLevel > 70 ? "text-destructive" : anxietyLevel > 40 ? "text-warning" : "text-secondary",
      bgColor: anxietyLevel > 70 ? "bg-destructive" : anxietyLevel > 40 ? "bg-warning" : "bg-secondary",
    },
    {
      label: "Stress",
      value: stressLevel,
      icon: Zap,
      color: stressLevel > 70 ? "text-destructive" : stressLevel > 40 ? "text-warning" : "text-secondary",
      bgColor: stressLevel > 70 ? "bg-destructive" : stressLevel > 40 ? "bg-warning" : "bg-secondary",
    },
    {
      label: "Discomfort",
      value: discomfortLevel,
      icon: Heart,
      color: discomfortLevel > 70 ? "text-destructive" : discomfortLevel > 40 ? "text-warning" : "text-secondary",
      bgColor: discomfortLevel > 70 ? "bg-destructive" : discomfortLevel > 40 ? "bg-warning" : "bg-secondary",
    },
  ];

  return (
    <Card className="glassmorphism-card-neu rounded-2xl p-6 border-secondary/30 glow-secondary h-full" role="region" aria-label="Patient emotional and psychological metrics">
      <div className="space-y-4">
        <div className="flex items-center gap-3 border-b border-secondary/20 pb-3">
          <Heart className="w-6 h-6 text-secondary" aria-hidden="true" />
          <h3 className="text-lg font-bold text-foreground">Emotional Metrics</h3>
        </div>

        <div className="grid grid-cols-1 gap-4" role="list" aria-label="List of emotional metrics">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                role="listitem"
                className="space-y-2 p-4 rounded-lg bg-background/50 border border-accent/20 focus-within:ring-2 focus-within:ring-secondary/50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-5 h-5 ${metric.color}`} aria-hidden="true" />
                    <span className="text-sm font-medium text-foreground">
                      {metric.label}
                    </span>
                  </div>
                  <span className={`text-xl font-bold ${metric.color}`} aria-label={`${metric.label}: ${metric.value} percent`}>
                    {metric.value}%
                  </span>
                </div>
                <Progress 
                  value={metric.value} 
                  className="h-2"
                  indicatorClassName={metric.bgColor}
                  aria-label={`${metric.label} progress: ${metric.value}%`}
                />
                <p className="text-xs text-muted-foreground font-mono" role="status">
                  {metric.value > 70 ? "High" : metric.value > 40 ? "Moderate" : "Normal"} - 
                  {metric.value > 70 ? " Requires attention" : metric.value > 40 ? " Monitor closely" : " Within range"}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
