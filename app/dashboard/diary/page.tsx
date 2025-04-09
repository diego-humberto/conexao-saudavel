"use client";

import { useState, useEffect } from "react";
import { Book, Save } from "lucide-react";

interface DiaryEntry {
  id: string;
  date: string;
  mood: 'good' | 'neutral' | 'bad';
  content: string;
  timeSpent: number;
}

export default function DiaryPage() {
  const [entries, setEntries] = useState<DiaryEntry[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("diaryEntries");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [newEntry, setNewEntry] = useState({
    mood: 'neutral',
    content: '',
  });

  useEffect(() => {
    localStorage.setItem("diaryEntries", JSON.stringify(entries));
  }, [entries]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];
    const timeSpent = JSON.parse(localStorage.getItem("usageData") || "{}").apps?.reduce((acc: number, app: any) => acc + app.timeUsed, 0) || 0;

    setEntries(prev => [...prev, {
      id: Date.now().toString(),
      date: today,
      mood: newEntry.mood as 'good' | 'neutral' | 'bad',
      content: newEntry.content,
      timeSpent
    }]);

    setNewEntry({ mood: 'neutral', content: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center mb-8">
          <Book className="w-8 h-8 text-purple-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Diário Reflexivo
          </h1>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-800 dark:text-white mb-2">
                Como você se sente sobre seu uso digital hoje?
              </label>
              <div className="flex space-x-4">
                {['bad', 'neutral', 'good'].map((mood) => (
                  <button
                    key={mood}
                    type="button"
                    onClick={() => setNewEntry(prev => ({ ...prev, mood }))}
                    className={`p-3 rounded-lg ${
                      newEntry.mood === mood 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white'
                    }`}
                  >
                    {mood === 'good' ? '😊' : mood === 'neutral' ? '😐' : '😔'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-800 dark:text-white mb-2">
                Reflexão do dia
              </label>
              <textarea
                value={newEntry.content}
                onChange={(e) => setNewEntry(prev => ({ ...prev, content: e.target.value }))}
                className="w-full h-32 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                placeholder="Como você se sente sobre seu tempo online hoje?"
              />
            </div>

            <button
              type="submit"
              className="flex items-center justify-center w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg"
            >
              <Save className="w-5 h-5 mr-2" />
              Salvar Reflexão
            </button>
          </form>
        </div>

        <div className="space-y-4">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">
                    {entry.mood === 'good' ? '😊' : entry.mood === 'neutral' ? '😐' : '😔'}
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    {new Date(entry.date).toLocaleDateString()}
                  </span>
                </div>
                <span className="text-purple-600 dark:text-purple-400">
                  Tempo online: {entry.timeSpent}min
                </span>
              </div>
              <p className="text-gray-800 dark:text-white whitespace-pre-wrap">
                {entry.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}