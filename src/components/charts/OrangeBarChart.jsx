import { useState } from "react";

// Orange-gradient bar chart with hover tooltip
const OrangeBarChart = ({ data, height = 220, valuePrefix = "", valueSuffix = "" }) => {
  const [hover, setHover] = useState(null);
  const max = Math.max(...data.map((d) => d.value));

  return (
    <div className="relative w-full" style={{ height }}>
      <div className="flex items-end justify-between gap-2 sm:gap-3 h-full">
        {data.map((d, i) => {
          const pct = (d.value / max) * 100;
          const isHover = hover === i;
          return (
            <div
              key={d.label}
              className="flex-1 flex flex-col items-center gap-2 group cursor-pointer relative h-full"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            >
              <div className="flex-1 w-full flex items-end">
                <div
                  className={`w-full rounded-t-xl transition-all duration-300 ease-out ${
                    isHover ? "opacity-100 scale-y-105" : "opacity-90"
                  }`}
                  style={{
                    height: `${pct}%`,
                    background: "linear-gradient(180deg, hsl(28 100% 60%) 0%, hsl(21 100% 50%) 100%)",
                    boxShadow: isHover ? "0 8px 24px -4px hsl(21 100% 50% / 0.45)" : "none",
                    transformOrigin: "bottom",
                  }}
                />
              </div>
              <span className={`text-[11px] font-medium transition-colors ${isHover ? "text-primary" : "text-muted-foreground"}`}>
                {d.label}
              </span>

              {isHover && (
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full bg-card border border-border shadow-card-hover rounded-xl px-3 py-2 text-xs whitespace-nowrap animate-fade-in z-10">
                  <div className="font-semibold text-foreground">{d.label}</div>
                  <div className="text-primary font-bold">{valuePrefix}{d.value.toLocaleString()}{valueSuffix}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrangeBarChart;
