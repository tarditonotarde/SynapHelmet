import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Activity, Clock } from "lucide-react";

interface StatData {
  label: string;
  value: string;
  change?: number;
  unit?: string;
}

interface MedicalStatsProps {
  currentIntensity: number;
  sessionTime: number;
}

export const MedicalStats = ({ currentIntensity, sessionTime }: MedicalStatsProps) => {
  // Simulate realistic vital signs that vary with intensity
  const heartRate = Math.round(70 + currentIntensity * 50); // 70-120 bpm
  const systolic = Math.round(120 + currentIntensity * 20); // 120-140 mmHg
  const diastolic = Math.round(80 + currentIntensity * 10); // 80-90 mmHg
  const spo2 = Math.round(98 - currentIntensity * 3); // 98-95%
  const respRate = Math.round(14 + currentIntensity * 8); // 14-22 bpm
  const temperature = (36.5 + currentIntensity * 1.2).toFixed(1); // 36.5-37.7°C

  const stats: StatData[] = [
    {
      label: "Heart Rate",
      value: heartRate.toString(),
      change: heartRate > 90 ? 8 : -2,
      unit: "bpm",
    },
    {
      label: "Blood Pressure",
      value: `${systolic}/${diastolic}`,
      change: systolic > 130 ? 5 : -3,
      unit: "mmHg",
    },
    {
      label: "SpO₂",
      value: spo2.toString(),
      change: spo2 < 96 ? -2 : 0,
      unit: "%",
    },
    {
      label: "Resp. Rate",
      value: respRate.toString(),
      change: respRate > 18 ? 4 : -1,
      unit: "/min",
    },
    {
      label: "Temperature",
      value: temperature,
      change: parseFloat(temperature) > 37.2 ? 2 : 0,
      unit: "°C",
    },
    {
      label: "Session Time",
      value: `${Math.floor(sessionTime / 60)}`,
      unit: "min",
    },
  ];

  return (
    <Card className="glassmorphism-card-neu rounded-2xl p-6 border-primary/30 glow-primary">
      <div className="space-y-4">
        <div className="flex items-center gap-3 border-b border-primary/20 pb-3">
          <Activity className="w-6 h-6 text-primary" />
          <h3 className="text-lg font-bold text-foreground">Live Metrics</h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="space-y-1 p-3 rounded-lg bg-background/50 border border-accent/20 hover:border-primary/30 transition-colors"
            >
              <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                {stat.label}
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-foreground">
                  {stat.value}
                </span>
                {stat.unit && (
                  <span className="text-xs text-muted-foreground ml-0.5">{stat.unit}</span>
                )}
              </div>
              {stat.change !== undefined && (
                <div className="flex items-center gap-1">
                  {stat.change > 0 ? (
                    <>
                      <TrendingUp className="w-3 h-3 text-secondary" />
                      <span className="text-xs text-secondary font-mono">
                        +{stat.change}%
                      </span>
                    </>
                  ) : (
                    <>
                      <TrendingDown className="w-3 h-3 text-destructive" />
                      <span className="text-xs text-destructive font-mono">
                        {stat.change}%
                      </span>
                    </>
                  )}
                  <span className="text-xs text-muted-foreground font-mono">
                    vs last session
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-accent/20">
          <div className="flex items-center gap-2 text-accent">
            <Clock className="w-4 h-4" />
            <p className="text-xs font-mono">
              Recommended break in {30 - Math.floor(sessionTime / 60)} minutes
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};
