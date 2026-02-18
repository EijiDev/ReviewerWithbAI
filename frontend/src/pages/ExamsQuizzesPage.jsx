import { useState } from "react";
import { Plus, ClipboardList } from "lucide-react";
import AddExamModal from "../components/dashboard/AddExamModal";

export default function ExamsQuizzesPage() {
  const [showModal, setShowModal] = useState(false);
  const [exams] = useState([]);

  return (
    <>
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="flex items-start justify-between mb-6 md:mb-8 gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Exams & Quizzes</h1>
            <p className="text-sm text-gray-400 mt-0.5">Keep track of your upcoming tests.</p>
          </div>
          <button onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 md:px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all shrink-0">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Exam / Quiz</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>

        {exams.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 md:py-20 text-gray-400">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4">
              <ClipboardList className="w-7 h-7 md:w-8 md:h-8 text-indigo-400" strokeWidth={1.5} />
            </div>
            <p className="text-base font-semibold text-gray-700 mb-1">No exams or quizzes</p>
            <p className="text-sm text-gray-400 mb-6 text-center">Add your upcoming exams and quizzes to stay on track!</p>
            <button onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all">
              <Plus className="w-4 h-4" /> Add Exam / Quiz
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {exams.map((exam, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold text-gray-800 text-sm truncate">{exam.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{exam.subject} · {exam.type} · {exam.dateTime}</p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 text-indigo-500 shrink-0">{exam.type}</span>
              </div>
            ))}
          </div>
        )}
      </main>
      {showModal && <AddExamModal onClose={() => setShowModal(false)} />}
    </>
  );
}