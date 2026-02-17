import { useState } from "react";
import { X, ChevronDown } from "lucide-react";

export default function AddExamModal({ onClose }) {
  const [form, setForm] = useState({
    title: "",
    type: "Exam",
    subject: "",
    date: "",
  });

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = () => { if (!form.title.trim()) return; onClose(); };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl shadow-xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">Add Exam / Quiz</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Title</label>
            <input type="text" name="title" value={form.title} onChange={handleChange}
              placeholder="e.g. Midterm Exam"
              className="w-full px-4 py-2.5 rounded-xl border border-indigo-400 bg-gray-50 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-200 transition-all" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Type</label>
            <div className="relative">
              <select name="type" value={form.type} onChange={handleChange}
                className="w-full appearance-none px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-indigo-200 transition-all">
                <option>Exam</option><option>Quiz</option><option>Midterm</option><option>Final</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Subject</label>
            <div className="relative">
              <select name="subject" value={form.subject} onChange={handleChange}
                className="w-full appearance-none px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-indigo-200 transition-all">
                <option value="">Select subject</option>
                <option>prog 1</option><option>prog 2</option><option>Math</option><option>Science</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Date</label>
            <input type="date" name="date" value={form.date} onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-indigo-200 transition-all" />
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-8">
          <button onClick={onClose} className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors">Cancel</button>
          <button onClick={handleSubmit} className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-semibold bg-indigo-400 hover:bg-indigo-500 text-white transition-colors">Add Exam</button>
        </div>
      </div>
    </div>
  );
}