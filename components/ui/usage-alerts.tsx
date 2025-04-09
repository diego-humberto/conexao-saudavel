import { AlertCircle } from "lucide-react";

interface UsageAlertsProps {
  usageData: {
    apps: Array<{
      name: string;
      timeLimit: number;
      timeUsed: number;
    }>;
  };
}

export function UsageAlerts({ usageData }: UsageAlertsProps) {
  const alerts = usageData.apps
    .filter(app => app.timeUsed >= app.timeLimit * 0.8)
    .map(app => ({
      app: app.name,
      message: app.timeUsed >= app.timeLimit
        ? `Limite de tempo excedido para ${app.name}`
        : `Próximo ao limite de tempo para ${app.name}`,
      severity: app.timeUsed >= app.timeLimit ? "high" : "medium"
    }));

  return (
    <div className="space-y-4">
      {alerts.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          Nenhum alerta no momento
        </p>
      ) : (
        alerts.map((alert, index) => (
          <div
            key={index}
            className={`flex items-center p-4 rounded-lg ${
              alert.severity === "high"
                ? "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200"
                : "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200"
            }`}
          >
            <AlertCircle className={`w-5 h-5 mr-2 ${
              alert.severity === "high"
                ? "text-red-600 dark:text-red-400"
                : "text-yellow-600 dark:text-yellow-400"
            }`} />
            <span>
              {alert.message}
            </span>
          </div>
        ))
      )}
    </div>
  );
}