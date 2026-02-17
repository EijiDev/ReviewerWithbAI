import { FileText, ClipboardList, AlertTriangle } from "lucide-react";
import StatCard from "../ui/StatCard";

const stats = [
  { label: "Total Assignments", value: "0", icon: FileText,     iconBg: "bg-indigo-50", iconColor: "text-indigo-400" },
  { label: "Upcoming Exams",    value: "0", icon: ClipboardList, iconBg: "bg-sky-50",    iconColor: "text-sky-400"   },
  { label: "Overdue Tasks",     value: "0", icon: AlertTriangle, iconBg: "bg-red-50",    iconColor: "text-red-400"   },
];

export default function StatsRow() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 mb-6">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}