import { useState } from "react";
import { BookOpen, HelpCircle, Lightbulb } from "lucide-react";
import { KeyPointCard } from "./KeyPointCard";
import { QuizCard } from "./QuizCard";
import { HighlightedText } from "./HighlightedText";

const TABS = [
  { id: "explanation", label: "Explanation", icon: BookOpen },
  { id: "keypoints", label: "Key Points", icon: Lightbulb },
  { id: "quiz", label: "Quiz", icon: HelpCircle },
];

export function ReviewTabs({ review }) {
  const [activeTab, setActiveTab] = useState("explanation");

  return (
    <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
      <div className="flex border-b border-gray-100 p-1 bg-gray-50/50">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-bold transition-all rounded-2xl
              ${
                activeTab === id
                  ? "text-green-800 bg-white shadow-sm ring-1 ring-gray-100"
                  : "text-gray-400 hover:text-gray-600 hover:bg-white/50"
              }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      <div className="p-6 md:p-8">
        {activeTab === "explanation" && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {review.title}
            </h2>
            <div className="text-gray-700 leading-relaxed text-[15px] space-y-4">
              {review.explanation?.split("\n\n").map((para, i) => (
                <p key={i}>
                  <HighlightedText text={para} />
                </p>
              ))}
            </div>
          </div>
        )}

        {activeTab === "keypoints" && (
          <div className="space-y-3">
            {review.keyPoints?.map((kp, i) => (
              <KeyPointCard
                key={i}
                index={i}
                point={kp.point}
                explanation={kp.explanation}
              />
            ))}
          </div>
        )}

        {activeTab === "quiz" && (
          <div className="space-y-6">
            <div className="text-center pb-4">
              <p className="text-sm font-bold text-gray-800">
                Quick Knowledge Check
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Subukan natin kung nag-sink in yung lesson! 🧠
              </p>
            </div>
            {review.quizQuestions?.map((q, i) => (
              <QuizCard key={i} {...q} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
