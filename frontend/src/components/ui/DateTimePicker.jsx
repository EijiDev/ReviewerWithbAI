import dayjs from "dayjs";

// Build option arrays
const now = dayjs();

const MONTHS = Array.from({ length: 12 }, (_, i) =>
  ({ value: i + 1, label: dayjs().month(i).format("MMMM") })
);

const YEARS = Array.from({ length: 6 }, (_, i) =>
  ({ value: now.year() + i })
);

const HOURS = Array.from({ length: 12 }, (_, i) => {
  const h = i + 1;
  return { value: h, label: String(h).padStart(2, "0") };
});

const MINUTES = Array.from({ length: 12 }, (_, i) => {
  const m = i * 5;
  return { value: m, label: String(m).padStart(2, "0") };
});

const selectClass =
  "w-full appearance-none px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-indigo-200 transition-all";

export default function DateTimePicker({ value, onChange }) {
  // value: { month, day, year, hour, minute, ampm }
  const {
    month = "",
    day = "",
    year = "",
    hour = "",
    minute = "",
    ampm = "AM",
  } = value || {};

  const set = (key, val) => onChange({ ...value, [key]: val });

  // Days in selected month/year
  const daysInMonth =
    month && year
      ? dayjs(`${year}-${String(month).padStart(2, "0")}-01`).daysInMonth()
      : 31;

  const DAYS = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="space-y-2">
      {/* Date row */}
      <div className="grid grid-cols-3 gap-2">
        {/* Month */}
        <div className="relative col-span-1">
          <select value={month} onChange={(e) => set("month", e.target.value)} className={selectClass}>
            <option value="">Month</option>
            {MONTHS.map((m) => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
        </div>

        {/* Day */}
        <div className="relative col-span-1">
          <select value={day} onChange={(e) => set("day", e.target.value)} className={selectClass}>
            <option value="">Day</option>
            {DAYS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Year */}
        <div className="relative col-span-1">
          <select value={year} onChange={(e) => set("year", e.target.value)} className={selectClass}>
            <option value="">Year</option>
            {YEARS.map((y) => (
              <option key={y.value} value={y.value}>{y.value}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Time row */}
      <div className="grid grid-cols-3 gap-2">
        {/* Hour */}
        <div className="relative">
          <select value={hour} onChange={(e) => set("hour", e.target.value)} className={selectClass}>
            <option value="">HH</option>
            {HOURS.map((h) => (
              <option key={h.value} value={h.value}>{h.label}</option>
            ))}
          </select>
        </div>

        {/* Minute */}
        <div className="relative">
          <select value={minute} onChange={(e) => set("minute", e.target.value)} className={selectClass}>
            <option value="">MM</option>
            {MINUTES.map((m) => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
        </div>

        {/* AM/PM */}
        <div className="relative">
          <select value={ampm} onChange={(e) => set("ampm", e.target.value)} className={selectClass}>
            <option>AM</option>
            <option>PM</option>
          </select>
        </div>
      </div>
    </div>
  );
}

// Helper: convert picker value → dayjs object (or null)
export function pickerToDayjs({ month, day, year, hour, minute, ampm }) {
  if (!month || !day || !year || !hour || minute === "") return null;
  let h = parseInt(hour);
  if (ampm === "PM" && h !== 12) h += 12;
  if (ampm === "AM" && h === 12) h = 0;
  return dayjs(`${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")} ${String(h).padStart(2, "0")}:${String(minute).padStart(2, "0")}`);
}

// Helper: format for display
export function formatPickerDate(val) {
  const d = pickerToDayjs(val);
  return d ? d.format("MMM D, YYYY h:mm A") : "—";
}