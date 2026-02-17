export default function StatCard({ label, value, icon: Icon, iconBg, iconColor }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 flex items-center justify-between shadow-sm flex-1 min-w-0">
      <div>
        <p className="text-sm text-gray-500 mb-2 font-medium">{label}</p>
        <p className="text-4xl font-bold text-gray-800">{value}</p>
      </div>
      <div className={`${iconBg} p-3 rounded-xl`}>
        <Icon className={`w-6 h-6 ${iconColor}`} strokeWidth={1.5} />
      </div>
    </div>
  );
}