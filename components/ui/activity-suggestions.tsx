const activities = [
  {
    title: "Leitura",
    description: "Dedique tempo para ler um livro interessante",
    duration: "30 minutos"
  },
  {
    title: "Exercício",
    description: "Faça uma caminhada ao ar livre",
    duration: "45 minutos"
  },
  {
    title: "Meditação",
    description: "Practice mindfulness e relaxamento",
    duration: "15 minutos"
  }
];

export function ActivitySuggestions() {
  return (
    <div className="space-y-4" role="list">
      {activities.map((activity, index) => (
        <div
          key={activity.title}
          className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg transform transition-all duration-300 hover:scale-105 animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
          role="listitem"
        >
          <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
            {activity.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {activity.description}
          </p>
          <p className="text-purple-600 dark:text-purple-400 text-sm mt-2">
            Duração sugerida: {activity.duration}
          </p>
        </div>
      ))}
    </div>
  );
}