import { CalendarDays, BookMarked } from "lucide-react";

export default function UpcomingDeadlines({ deadlines = [] }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-6">
      <h2 className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-5 md:mb-6">
        <CalendarDays className="w-5 h-5 text-gray-500" />
        Upcoming Deadlines
      </h2>
      {deadlines.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 md:py-10 text-gray-400">
          <BookMarked className="w-10 h-10 mb-3 opacity-30" strokeWidth={1.2} />
          <p className="text-sm text-center">No upcoming deadlines. Add your first assignment or exam!</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {deadlines.map((item, i) => (
            <li key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl text-sm gap-3">
              <span className="font-medium text-gray-700 truncate">{item.title}</span>
              <span className="text-gray-400 shrink-0">{item.due}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}