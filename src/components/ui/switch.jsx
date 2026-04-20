import * as React from "react";
import { cn } from "@/lib/utils";

const Switch = React.forwardRef(({ className, checked, defaultChecked, onCheckedChange, ...props }, ref) => {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(defaultChecked ?? false);
  const value = isControlled ? checked : internal;

  const toggle = () => {
    if (!isControlled) setInternal(!value);
    onCheckedChange?.(!value);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={value}
      ref={ref}
      onClick={toggle}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        value ? "bg-primary" : "bg-muted",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-background shadow-lg ring-0 transition-transform",
          value ? "translate-x-5" : "translate-x-0",
        )}
      />
    </button>
  );
});
Switch.displayName = "Switch";

export { Switch };
