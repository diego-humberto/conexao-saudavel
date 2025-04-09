"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Lock, 
  Book, 
  BarChart, 
  Bell,
  Activity
} from "lucide-react";

const menuItems = [
  {
    path: "/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard"
  },
  {
    path: "/dashboard/block",
    icon: Lock,
    label: "Bloqueio"
  },
  {
    path: "/dashboard/diary",
    icon: Book,
    label: "Diário"
  },
  {
    path: "/dashboard/reports",
    icon: BarChart,
    label: "Relatórios"
  }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white dark:bg-gray-800 h-screen sticky top-0 shadow-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">
          Conexão Saudável
        </h1>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? "bg-purple-600 text-white" 
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}