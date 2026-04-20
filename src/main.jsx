import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { applyTheme } from "./hooks/use-theme.js";

// Apply theme before render to avoid flash
const stored = localStorage.getItem("messdaily-theme");
const initial = stored || (window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light");
applyTheme(initial);

createRoot(document.getElementById("root")).render(<App />);
