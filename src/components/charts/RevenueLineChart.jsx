import { useMemo, useState } from "react";

// Smooth orange revenue line chart (pure SVG, JSX only)
const RevenueLineChart = ({ data, height = 240 }) => {
  const [hover, setHover] = useState(null);

  const { points, path, area, max, min } = useMemo(() => {
    const values = data.map((d) => d.value);
    const max = Math.max(...values);
    const min = Math.min(...values);
    const range = max - min || 1;
    const w = 100; // viewBox width
    const h = 100; // viewBox height
    const padY = 10;
    const usableH = h - padY * 2;

    const points = data.map((d, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = padY + usableH - ((d.value - min) / range) * usableH;
      return { x, y, ...d };
    });

    // Smooth curve using cubic bezier
    let path = `M ${points[0].x},${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cx = (p0.x + p1.x) / 2;
      path += ` C ${cx},${p0.y} ${cx},${p1.y} ${p1.x},${p1.y}`;
    }
    const area = `${path} L ${points[points.length - 1].x},${h} L ${points[0].x},${h} Z`;
    return { points, path, area, max, min };
  }, [data]);

  return (
    <div className="relative w-full" style={{ height }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
        <defs>
          <linearGradient id="revFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.35" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="revStroke" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="hsl(21 100% 55%)" />
            <stop offset="100%" stopColor="hsl(28 100% 60%)" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[20, 40, 60, 80].map((y) => (
          <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="hsl(var(--border))" strokeWidth="0.2" strokeDasharray="0.5 0.8" />
        ))}

        <path d={area} fill="url(#revFill)" />
        <path d={path} fill="none" stroke="url(#revStroke)" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />

        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="0.9" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
            <rect
              x={p.x - 100 / data.length / 2}
              y="0"
              width={100 / data.length}
              height="100"
              fill="transparent"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              style={{ cursor: "pointer" }}
            />
          </g>
        ))}
      </svg>

      {/* X-axis labels */}
      <div className="flex justify-between mt-2 px-1">
        {data.map((d) => (
          <span key={d.label} className="text-xs text-muted-foreground font-medium">{d.label}</span>
        ))}
      </div>

      {/* Tooltip */}
      {hover !== null && (
        <div
          className="absolute pointer-events-none bg-card border border-border shadow-card-hover rounded-xl px-3 py-2 text-xs animate-fade-in"
          style={{
            left: `${points[hover].x}%`,
            top: `${(points[hover].y / 100) * height - 50}px`,
            transform: "translateX(-50%)",
          }}
        >
          <div className="font-semibold text-foreground">{data[hover].label}</div>
          <div className="text-primary font-bold">₹{data[hover].value.toLocaleString()}</div>
        </div>
      )}
    </div>
  );
};

export default RevenueLineChart;
