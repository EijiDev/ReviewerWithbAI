import { useState } from "react";
import { Plus, X } from "lucide-react";

const COLORS = [
  "from-cyan-400 to-blue-500", "from-indigo-400 to-purple-500",
  "from-pink-400 to-rose-500",  "from-emerald-400 to-teal-500",
  "from-orange-400 to-amber-500","from-violet-400 to-purple-600",
];

function AddSubjectModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ name: "", teacher: "" });
  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = () => { if (!form.name.trim()) return; onAdd(form); onClose(); };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl shadow-xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">Add Subject</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors"><X className="w-5 h-5" /></button>
        </div>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Subject Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="e.g. prog 1"
              className="w-full px-4 py-2.5 rounded-xl border border-indigo-400 bg-gray-50 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-200 transition-all" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Teacher / Professor</label>
            <input type="text" name="teacher" value={form.teacher} onChange={handleChange} placeholder="e.g. sir ej"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-200 transition-all" />
          </div>
        </div>
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-8">
          <button onClick={onClose} className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors">Cancel</button>
          <button onClick={handleSubmit} className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors">Add Subject</button>
        </div>
      </div>
    </div>
  );
}

function SubjectCard({ subject, colorClass }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
      <div className={`h-2 bg-gradient-to-r ${colorClass}`} />
      <div className="p-4 md:p-5">
        <h3 className="font-bold text-gray-900 text-base mb-1">{subject.name}</h3>
        <p className="text-sm text-gray-400 mb-4">{subject.teacher || "—"}</p>
        <div className="flex gap-4 text-sm text-gray-400">
          <span>{subject.assignments ?? 0} assignments</span>
          <span>{subject.exams ?? 0} exams</span>
        </div>
      </div>
    </div>
  );
}

export default function MySubjectsPage() {
  const [showModal, setShowModal] = useState(false);
  const [subjects, setSubjects] = useState([
    { name: "prog 1", teacher: "sir ej", assignments: 0, exams: 0 },
    { name: "web development", teacher: "ej sdasdsa", assignments: 0, exams: 0 },
  ]);

  return (
    <>
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="flex items-start justify-between mb-6 md:mb-8 gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">My Subjects</h1>
            <p className="text-sm text-gray-400 mt-0.5">Manage your courses and subjects.</p>
          </div>
          <button onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 md:px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all flex-shrink-0">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Subject</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>

        {subjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <p className="text-sm">No subjects yet. Add your first subject!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {subjects.map((subject, i) => (
              <SubjectCard key={i} subject={subject} colorClass={COLORS[i % COLORS.length]} />
            ))}
          </div>
        )}
      </main>
      {showModal && <AddSubjectModal onClose={() => setShowModal(false)} onAdd={(f) => setSubjects((p) => [...p, { ...f, assignments: 0, exams: 0 }])} />}
    </>
  );
}