import { useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/TopBar";
import DashboardPage from "./pages/DashboardPage";
import MySubjectsPage from "./pages/MySubjectPage";
import MyAssignmentsPage from "./pages/MyAssignmentPage";
import ExamsQuizzesPage from "./pages/ExamsQuizzesPage";
import AIReviewerPage from "./pages/AiReviewerPage";
import StudyAnalyticsPage from "./pages/StudyAnalyticsPage";
import SettingsPage from "./pages/SettingsPage";

export default function App() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (activeNav) {
      case "Dashboard":       return <DashboardPage />;
      case "My Subjects":     return <MySubjectsPage />;
      case "My Assignments":  return <MyAssignmentsPage />;
      case "Exams & Quizzes": return <ExamsQuizzesPage />;
      case "AI Reviewer":     return <AIReviewerPage />;
      case "Study Analytics": return <StudyAnalyticsPage />;
      case "Settings":        return <SettingsPage />;
      default:
        return (
          <main className="flex-1 flex items-center justify-center text-gray-400 text-sm">
            {activeNav} — coming soon
          </main>
        );
    }
  };

  const handleNavChange = (label) => {
    setActiveNav(label);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden md:rounded-2xl md:border md:border-gray-200 md:shadow-xl">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        activeNav={activeNav}
        setActiveNav={handleNavChange}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        {renderPage()}
      </div>
    </div>
  );
}