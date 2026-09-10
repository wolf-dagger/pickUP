import { useEffect, useState } from "react";

const getInitialTheme = () => {
  if (typeof window === "undefined") return "light";

  const savedTheme = localStorage.getItem("pickUP-theme");

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("pickUP-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`relative inline-flex h-7 w-14 items-center rounded-full border transition-all duration-300  ${
        isDark
          ? "border-slate-600 bg-slate-800"
          : "border-slate-300 bg-slate-200"
      }`}
    >
      <span className="sr-only">Toggle theme</span>

      <span
        className={`absolute left-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] shadow-md transition-transform duration-300 ${
          isDark ? "translate-x-7" : "translate-x-0"
        }`}
      >
        {isDark ? "☀️" : "🌙"}
      </span>

      <span className="flex w-full justify-between px-2 text-[8px] font-bold uppercase tracking-wide text-slate-500"></span>
    </button>
  );
};

export default ThemeToggle;
