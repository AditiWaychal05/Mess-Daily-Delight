import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

// Modern interactive calendar (JSX only, no extra deps)
const Calendar = ({ value, onChange, onClose }) => {
  const today = new Date();
  const initial = value || today;
  const [view, setView] = useState({ year: initial.getFullYear(), month: initial.getMonth() });
  const [selected, setSelected] = useState(value || null);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose?.();
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [onClose]);

  const firstDay = new Date(view.year, view.month, 1).getDay();
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const prevMonth = () =>
    setView(({ year, month }) => (month === 0 ? { year: year - 1, month: 11 } : { year, month: month - 1 }));
  const nextMonth = () =>
    setView(({ year, month }) => (month === 11 ? { year: year + 1, month: 0 } : { year, month: month + 1 }));

  const isToday = (d) => d === today.getDate() && view.month === today.getMonth() && view.year === today.getFullYear();
  const isSelected = (d) =>
    selected && d === selected.getDate() && view.month === selected.getMonth() && view.year === selected.getFullYear();

  const pick = (d) => {
    const date = new Date(view.year, view.month, d);
    setSelected(date);
    onChange?.(date);
  };

  return (
    <div
      ref={ref}
      className="bg-card border border-border rounded-2xl shadow-card-hover p-4 w-[300px] animate-fade-in"
    >
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={prevMonth}
          className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors"
        >
          <ChevronLeft className="w-4 h-4 text-foreground" />
        </button>
        <div className="text-sm font-semibold text-foreground">
          {MONTHS[view.month]} {view.year}
        </div>
        <button
          onClick={nextMonth}
          className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors"
        >
          <ChevronRight className="w-4 h-4 text-foreground" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-1">
        {DAYS.map((d) => (
          <div key={d} className="text-[11px] text-muted-foreground font-medium text-center py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          if (!d) return <div key={i} />;
          const today_ = isToday(d);
          const sel = isSelected(d);
          return (
            <button
              key={i}
              onClick={() => pick(d)}
              className={`h-9 rounded-lg text-sm font-medium transition-all ${
                sel
                  ? "gradient-orange text-primary-foreground shadow-card scale-105"
                  : today_
                    ? "bg-accent text-accent-foreground"
                    : "text-foreground hover:bg-muted"
              }`}
            >
              {d}
            </button>
          );
        })}
      </div>

      <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
        <button
          onClick={() => {
            setSelected(today);
            setView({ year: today.getFullYear(), month: today.getMonth() });
            onChange?.(today);
          }}
          className="text-xs font-medium text-primary hover:underline"
        >
          Today
        </button>
        {selected && (
          <span className="text-xs text-muted-foreground">
            {selected.toLocaleDateString("en-IN", { dateStyle: "medium" })}
          </span>
        )}
      </div>
    </div>
  );
};

export default Calendar;
