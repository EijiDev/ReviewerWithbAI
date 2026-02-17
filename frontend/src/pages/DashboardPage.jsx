import StatsRow from "../components/dashboard/StatsRow";
import QuickActions from "../components/dashboard/QuickActions";
import UpcomingDeadlines from "../components/dashboard/UpcomingDeadlines";

export default function DashboardPage() {
  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="mb-6 md:mb-7">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-0.5">Welcome back! Here's your study overview.</p>
      </div>
      <StatsRow />
      <QuickActions />
      <UpcomingDeadlines />
    </main>
  );
}