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
  const stats: StatData[] = [
    {
      label: "Current Intensity",
      value: `${(currentIntensity * 100).toFixed(0)}%`,
      change: 12,
    },
    {
      label: "Session Duration",
      value: `${Math.floor(sessionTime / 60)}`,
      unit: "min",
    },
    {
      label: "Neural Activity",
      value: "87",
      change: -5,
      unit: "%",
    },
    {
      label: "Response Time",
      value: "0.8",
      change: 3,
      unit: "s",
    },
  ];

  return (
    <Card className="glassmorphism-card-neu rounded-2xl p-6 border-primary/30 glow-primary">
      <div className="space-y-4">
        <div className="flex items-center gap-3 border-b border-primary/20 pb-3">
          <Activity className="w-6 h-6 text-primary" />
          <h3 className="text-lg font-bold text-foreground">Live Metrics</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="space-y-1 p-3 rounded-lg bg-background/50 border border-accent/20"
            >
              <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                {stat.label}
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-foreground">
                  {stat.value}
                </span>
                {stat.unit && (
                  <span className="text-sm text-muted-foreground">{stat.unit}</span>
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
