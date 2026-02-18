import { useState } from "react";
import { Plus, FileText } from "lucide-react";
import AddAssignmentModal from "../components/dashboard/AddAssignments";

const TABS = ["All", "Pending", "Completed", "Overdue"];

export default function MyAssignmentsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [assignments] = useState([]);

  const filtered = assignments.filter((a) => activeTab === "All" || a.status === activeTab);

  return (
    <>
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="flex items-start justify-between mb-5 md:mb-6 gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">My Assignments</h1>
            <p className="text-sm text-gray-400 mt-0.5">Track and manage your assignments.</p>
          </div>
          <button onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 md:px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all shrink-0">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Assignment</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>

        {/* Filter Tabs — scrollable on mobile */}
        <div className="flex gap-2 mb-6 md:mb-8 overflow-x-auto pb-1 scrollbar-hide">
          {TABS.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
                activeTab === tab ? "bg-indigo-600 text-white" : "text-gray-500 hover:bg-gray-100"}`}>
              {tab}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 md:py-20 text-gray-400">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4">
              <FileText className="w-7 h-7 md:w-8 md:h-8 text-indigo-400" strokeWidth={1.5} />
            </div>
            <p className="text-base font-semibold text-gray-700 mb-1">No assignments found</p>
            <p className="text-sm text-gray-400 mb-6 text-center">Add your first assignment to get started!</p>
            <button onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all">
              <Plus className="w-4 h-4" /> Add Assignment
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((a, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold text-gray-800 text-sm truncate">{a.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{a.subject} · Due {a.dueDate}</p>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full shrink-0 ${
                  a.priority === "High" ? "bg-red-50 text-red-500" :
                  a.priority === "Medium" ? "bg-amber-50 text-amber-500" : "bg-green-50 text-green-500"}`}>
                  {a.priority}
                </span>
              </div>
            ))}
          </div>
        )}
      </main>
      {showModal && <AddAssignmentModal onClose={() => setShowModal(false)} />}
    </>
  );
}