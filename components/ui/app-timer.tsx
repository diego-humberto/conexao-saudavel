import { useState } from 'react';
import { Slider } from "@/components/ui/slider";

interface AppTimerProps {
  apps: Array<{
    name: string;
    timeLimit: number;
    timeUsed: number;
  }>;
  onUpdateLimit: (appName: string, newLimit: number) => void;
}

export function AppTimer({ apps, onUpdateLimit }: AppTimerProps) {
  return (
    <div className="space-y-6">
      {apps.map((app) => (
        <div key={app.name} className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">{app.name}</label>
            <span className="text-sm text-gray-500">
              {app.timeLimit} minutos
            </span>
          </div>
          <Slider
            defaultValue={[app.timeLimit]}
            max={120}
            step={5}
            onValueChange={(value) => onUpdateLimit(app.name, value[0])}
          />
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-600"
              style={{ width: `${(app.timeUsed / app.timeLimit) * 100}%` }}
            />
          </div>
          <p className="text-sm text-gray-500">
            Usado: {app.timeUsed} minutos
          </p>
        </div>
      ))}
    </div>
  );
}