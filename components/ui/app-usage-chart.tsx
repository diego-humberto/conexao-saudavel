import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AppUsageChartProps {
  data: Array<{
    name: string;
    timeLimit: number;
    timeUsed: number;
  }>;
}

export function AppUsageChart({ data }: AppUsageChartProps) {
  const chartData = data.map(app => ({
    name: app.name,
    "Tempo Usado": app.timeUsed,
    "Limite": app.timeLimit,
  }));

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="Tempo Usado" fill="#8884d8" />
          <Bar dataKey="Limite" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}