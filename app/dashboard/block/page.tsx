"use client";

import { useState, useEffect } from "react";
import { Lock, Unlock, Clock, Save } from "lucide-react";

interface App {
  name: string;
  isBlocked: boolean;
  blockUntil: string | null;
}

export default function BlockPage() {
  const [apps, setApps] = useState<App[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("blockedApps");
      return saved ? JSON.parse(saved) : [
        { name: "Instagram", isBlocked: false, blockUntil: null },
        { name: "Facebook", isBlocked: false, blockUntil: null },
        { name: "TikTok", isBlocked: false, blockUntil: null },
        { name: "Twitter", isBlocked: false, blockUntil: null },
        { name: "YouTube", isBlocked: false, blockUntil: null }
      ];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("blockedApps", JSON.stringify(apps));
  }, [apps]);

  const toggleBlock = (appName: string) => {
    setApps(prev => prev.map(app => 
      app.name === appName 
        ? { ...app, isBlocked: !app.isBlocked, blockUntil: !app.isBlocked ? new Date(Date.now() + 3600000).toISOString() : null }
        : app
    ));
  };

  const updateBlockTime = (appName: string, hours: number) => {
    setApps(prev => prev.map(app => 
      app.name === appName 
        ? { ...app, blockUntil: new Date(Date.now() + hours * 3600000).toISOString() }
        : app
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          Bloqueio de Aplicativos
        </h1>

        <div className="grid gap-6">
          {apps.map((app) => (
            <div
              key={app.name}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {app.isBlocked ? (
                    <Lock className="w-6 h-6 text-red-600 mr-3" />
                  ) : (
                    <Unlock className="w-6 h-6 text-green-600 mr-3" />
                  )}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                      {app.name}
                    </h2>
                    {app.blockUntil && app.isBlocked && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Bloqueado até: {new Date(app.blockUntil).toLocaleTimeString()}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  {app.isBlocked && (
                    <select
                      className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg px-3 py-2"
                      onChange={(e) => updateBlockTime(app.name, parseInt(e.target.value))}
                      defaultValue="1"
                    >
                      <option value="1">1 hora</option>
                      <option value="2">2 horas</option>
                      <option value="4">4 horas</option>
                      <option value="8">8 horas</option>
                      <option value="24">24 horas</option>
                    </select>
                  )}

                  <button
                    onClick={() => toggleBlock(app.name)}
                    className={`px-4 py-2 rounded-lg flex items-center ${
                      app.isBlocked
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    {app.isBlocked ? (
                      <>
                        <Unlock className="w-5 h-5 mr-2" />
                        Desbloquear
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5 mr-2" />
                        Bloquear
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}