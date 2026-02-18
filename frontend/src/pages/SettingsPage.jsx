import { useState } from "react";
import { User, ChevronRight, Moon, Sun } from "lucide-react";

function Section({ title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-6 mb-4 md:mb-5">
      <h2 className="text-sm font-bold text-gray-800 mb-4 md:mb-5">{title}</h2>
      {children}
    </div>
  );
}

function Toggle({ enabled, onToggle }) {
  return (
    <button onClick={onToggle}
      className={`relative inline-flex w-11 h-6 items-center rounded-full transition-colors duration-200 focus:outline-none shrink-0 ${enabled ? "bg-indigo-600" : "bg-gray-200"}`}>
      <span className={`inline-block w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 ${enabled ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  );
}

function SettingRow({ label, description, right }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0 gap-3">
      <div className="min-w-0">
        <p className="text-sm font-medium text-gray-700">{label}</p>
        {description && <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{description}</p>}
      </div>
      <div className="shrink-0">{right}</div>
    </div>
  );
}

export default function SettingsPage() {
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [notifications, setNotifications] = useState({ assignments: true, exams: true, reminders: false });
  const [darkMode, setDarkMode] = useState(false);
  const [accentColor, setAccentColor] = useState("indigo");
  const [saved, setSaved] = useState(false);

  const toggleNotif = (key) => setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const ACCENT_COLORS = [
    { key: "indigo",  cls: "bg-indigo-500"  },
    { key: "violet",  cls: "bg-violet-500"  },
    { key: "blue",    cls: "bg-blue-500"    },
    { key: "cyan",    cls: "bg-cyan-500"    },
    { key: "emerald", cls: "bg-emerald-500" },
    { key: "rose",    cls: "bg-rose-500"    },
  ];

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-400 mt-0.5">Manage your account and preferences.</p>
      </div>

      <div className="w-full max-w-2xl mx-auto">
        {/* Profile */}
        <Section title="Profile">
          <div className="flex items-center gap-3 md:gap-4 mb-5">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-indigo-100 flex items-center justify-center shrink-0">
              <User className="w-6 h-6 md:w-7 md:h-7 text-indigo-500" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700">Profile Picture</p>
              <button className="text-xs text-indigo-500 hover:text-indigo-700 mt-0.5 transition-colors">Upload photo</button>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Full Name</label>
              <input type="text" value={profile.name} onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                placeholder="Your name"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Email</label>
              <input type="email" value={profile.email} onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition-all" />
            </div>
            <button onClick={handleSave}
              className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-all">
              {saved ? "Saved ✓" : "Save Changes"}
            </button>
          </div>
        </Section>

        {/* Appearance */}
        <Section title="Appearance">
          <SettingRow label="Dark Mode" description="Coming soon pa boy..."
            right={
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-gray-400" />
                <Toggle enabled={darkMode} onToggle={() => setDarkMode((v) => !v)} />
                <Moon className="w-4 h-4 text-gray-400" />
              </div>
            } />
          <div className="py-3">
            <p className="text-sm font-medium text-gray-700 mb-3">Accent Color</p>
            <div className="flex gap-2 flex-wrap">
              {ACCENT_COLORS.map(({ key, cls }) => (
                <button key={key} onClick={() => setAccentColor(key)}
                  className={`w-7 h-7 rounded-full ${cls} transition-transform hover:scale-110 ${accentColor === key ? "ring-2 ring-offset-2 ring-gray-400 scale-110" : ""}`} />
              ))}
            </div>
          </div>
        </Section>

        {/* Account */}
        <Section title="Account">
          <SettingRow label="Change Password" right={<ChevronRight className="w-4 h-4 text-gray-400" />} />
          <div className="pt-3">
            <button className="text-sm font-semibold text-red-500 hover:text-red-600 transition-colors">Delete Account</button>
          </div>
        </Section>
      </div>
    </main>
  );
}