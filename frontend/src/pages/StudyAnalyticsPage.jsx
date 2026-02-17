import { BookOpen, FileText, ClipboardList, TrendingUp } from "lucide-react";

const SUBJECT_COLORS = ["bg-cyan-400","bg-indigo-500","bg-pink-400","bg-emerald-400","bg-orange-400","bg-violet-500"];
const subjects = [
  { name: "prog 1", completed: 0, total: 0 },
  { name: "web development", completed: 0, total: 0 },
];

export default function StudyAnalyticsPage() {
  const completedCount = 0;
  const totalCount = 0;
  const completionPct = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  const stats = [
    { label: "Subjects",        value: "2",  icon: BookOpen,      iconBg: "bg-indigo-50", iconColor: "text-indigo-400" },
    { label: "Assignments",     value: "0",  icon: FileText,      iconBg: "bg-sky-50",    iconColor: "text-sky-400"    },
    { label: "Exams & Quizzes", value: "0",  icon: ClipboardList, iconBg: "bg-amber-50",  iconColor: "text-amber-400"  },
    { label: "Completion Rate", value: "0%", icon: TrendingUp,    iconBg: "bg-green-50",  iconColor: "text-green-400"  },
  ];

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Study Analytics</h1>
        <p className="text-sm text-gray-400 mt-0.5">Track your study progress at a glance.</p>
      </div>

      {/* Stat Cards — 2 cols on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 mb-5 md:mb-6">
        {stats.map(({ label, value, icon: Icon, iconBg, iconColor }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-5 flex items-center justify-between">
            <div className="min-w-0 mr-2">
              <p className="text-xs md:text-sm text-gray-500 mb-1 md:mb-1.5 font-medium leading-tight">{label}</p>
              <p className="text-2xl md:text-3xl font-bold text-gray-800">{value}</p>
            </div>
            <div className={`${iconBg} p-2 md:p-3 rounded-xl flex-shrink-0`}>
              <Icon className={`w-5 h-5 md:w-6 md:h-6 ${iconColor}`} strokeWidth={1.5} />
            </div>
          </div>
        ))}
      </div>

      {/* Assignment Completion */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-6 mb-4 md:mb-5">
        <h2 className="text-sm font-bold text-gray-800 mb-4">Assignment Completion</h2>
        <div className="w-full h-2 bg-gray-100 rounded-full mb-3">
          <div className="h-2 bg-indigo-500 rounded-full transition-all duration-500" style={{ width: `${completionPct}%` }} />
        </div>
        <p className="text-sm text-gray-400">{completedCount} of {totalCount} assignments completed</p>
      </div>

      {/* By Subject */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-6">
        <h2 className="text-sm font-bold text-gray-800 mb-4 md:mb-5">By Subject</h2>
        <div className="space-y-4">
          {subjects.map(({ name, completed, total }, i) => {
            const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
            return (
              <div key={name}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${SUBJECT_COLORS[i % SUBJECT_COLORS.length]}`} />
                    <span className="text-sm text-gray-700 truncate">{name}</span>
                  </div>
                  <span className="text-sm text-gray-400 flex-shrink-0 ml-2">{completed}/{total}</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full">
                  <div className={`h-1.5 rounded-full transition-all duration-500 ${SUBJECT_COLORS[i % SUBJECT_COLORS.length]}`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}