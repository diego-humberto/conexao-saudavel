"use client";

import { useState, useEffect } from "react";
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart, ChartBar, Clock } from "lucide-react";

interface UsageData {
  apps: Array<{
    name: string;
    timeLimit: number;
    timeUsed: number;
  }>;
}

export default function ReportsPage() {
  const [usageData, setUsageData] = useState<UsageData>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("usageData");
      return saved ? JSON.parse(saved) : { apps: [] };
    }
    return { apps: [] };
  });

  const [weeklyData] = useState(() => {
    // Simulando dados semanais
    return Array.from({ length: 7 }, (_, i) => ({
      day: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR', { weekday: 'short' }),
      totalTime: Math.floor(Math.random() * 180 + 60)
    }));
  });

  const totalTimeToday = usageData.apps.reduce((acc, app) => acc + app.timeUsed, 0);
  const mostUsedApp = usageData.apps.reduce((prev, current) => 
    (current.timeUsed > prev.timeUsed) ? current : prev
  , usageData.apps[0]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          Relatórios Estatísticos
        </h1>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-purple-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Tempo Total Hoje
              </h2>
            </div>
            <p className="text-3xl font-bold text-gray-800 dark:text-white">
              {totalTimeToday}min
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <PieChart className="w-6 h-6 text-green-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                App Mais Usado
              </h2>
            </div>
            <p className="text-3xl font-bold text-gray-800 dark:text-white">
              {mostUsedApp?.name}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              {mostUsedApp?.timeUsed}min
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <ChartBar className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Média Diária
              </h2>
            </div>
            <p className="text-3xl font-bold text-gray-800 dark:text-white">
              {Math.round(weeklyData.reduce((acc, day) => acc + day.totalTime, 0) / 7)}min
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
              Uso por Aplicativo
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={usageData.apps}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="timeUsed" fill="#8884d8" name="Tempo Usado (min)" />
                  <Bar dataKey="timeLimit" fill="#82ca9d" name="Limite (min)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
              Tendência Semanal
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="totalTime" 
                    stroke="#8884d8" 
                    name="Tempo Total (min)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}