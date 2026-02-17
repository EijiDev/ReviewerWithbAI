import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "../ui/Button";
import AddAssignmentModal from "./AddAssignments";
import AddExamModal from "./AddExamModal";

export default function QuickActions() {
  const [showAssignment, setShowAssignment] = useState(false);
  const [showExam, setShowExam] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-6 mb-5">
        <h2 className="text-sm font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="primary" onClick={() => setShowAssignment(true)} className="w-full sm:w-auto justify-center">
            <Plus className="w-4 h-4" />
            Add Assignment
          </Button>
          <Button variant="outline" onClick={() => setShowExam(true)} className="w-full sm:w-auto justify-center">
            <Plus className="w-4 h-4" />
            Add Exam / Quiz
          </Button>
        </div>
      </div>

      {showAssignment && <AddAssignmentModal onClose={() => setShowAssignment(false)} />}
      {showExam && <AddExamModal onClose={() => setShowExam(false)} />}
    </>
  );
}