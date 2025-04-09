"use client";

import { useState, useEffect } from "react";
import { Timer, Activity, BarChart, Bell } from "lucide-react";
import { AppUsageChart } from "@/components/ui/app-usage-chart";
import { AppTimer } from "@/components/ui/app-timer";
import { ActivitySuggestions } from "@/components/ui/activity-suggestions";
import { UsageAlerts } from "@/components/ui/usage-alerts";

export default function Dashboard() {
  const [usageData, setUsageData] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("usageData");
      return saved ? JSON.parse(saved) : {
        apps: [
          { name: "Instagram", timeLimit: 60, timeUsed: 45 },
          { name: "TikTok", timeLimit: 45, timeUsed: 30 },
          { name: "Facebook", timeLimit: 30, timeUsed: 20 },
        ]
      };
    }
    return {
      apps: [
        { name: "Instagram", timeLimit: 60, timeUsed: 45 },
        { name: "TikTok", timeLimit: 45, timeUsed: 30 },
        { name: "Facebook", timeLimit: 30, timeUsed: 20 },
      ]
    };
  });

  useEffect(() => {
    localStorage.setItem("usageData", JSON.stringify(usageData));
  }, [usageData]);

  const updateAppLimit = (appName: string, newLimit: number) => {
    setUsageData(prev => ({
      ...prev,
      apps: prev.apps.map(app => 
        app.name === appName ? { ...app, timeLimit: newLimit } : app
      )
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          Dashboard
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <Timer className="w-6 h-6 text-purple-600 mr-2" aria-hidden="true" />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Tempo Total
              </h2>
            </div>
            <p className="text-3xl font-bold text-gray-800 dark:text-white">
              {usageData.apps.reduce((acc, app) => acc + app.timeUsed, 0)}min
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <Activity className="w-6 h-6 text-green-600 mr-2" aria-hidden="true" />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Apps Monitorados
              </h2>
            </div>
            <p className="text-3xl font-bold text-gray-800 dark:text-white">
              {usageData.apps.length}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg col-span-2">
            <div className="flex items-center mb-4">
              <BarChart className="w-6 h-6 text-blue-600 mr-2" aria-hidden="true" />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Uso por Aplicativo
              </h2>
            </div>
            <AppUsageChart data={usageData.apps} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Controle de Tempo
            </h2>
            <AppTimer apps={usageData.apps} onUpdateLimit={updateAppLimit} />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Sugestões de Atividade
            </h2>
            <ActivitySuggestions />
          </div>
        </div>

        <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center mb-4">
            <Bell className="w-6 h-6 text-yellow-600 mr-2" aria-hidden="true" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Alertas de Uso
            </h2>
          </div>
          <UsageAlerts usageData={usageData} />
        </div>
      </div>
    </div>
  );
}