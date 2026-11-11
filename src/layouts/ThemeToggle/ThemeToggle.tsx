import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsDark(true);
      return;
    }

    if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
      return;
    }

    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (systemDark) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const newValue = !isDark;

    setIsDark(newValue);

    if (newValue) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="h-10 w-10 rounded-xl bg-primary dark:bg-sidebar-dark hover:bg-primary/90 dark:hover:bg-sidebar-dark/90 text-white transition-all duration-300 flex items-center justify-center cursor-pointer"
      aria-label="Toggle Theme"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}