import { Sun, Moon } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="relative w-10 h-10 glass-button flex items-center justify-center group"
      aria-label={isDark ? "روشن کردن" : "تاریک کردن"}
      title={isDark ? "حالت روشن" : "حالت تاریک"}
    >
      {/* Sun icon */}
      <Sun
        className={`w-[18px] h-[18px] absolute transition-all duration-500 ease-in-out ${
          isDark ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100 text-amber-500"
        }`}
      />
      {/* Moon icon */}
      <Moon
        className={`w-[18px] h-[18px] absolute transition-all duration-500 ease-in-out ${
          isDark ? "opacity-100 rotate-0 scale-100 text-indigo-300" : "opacity-0 -rotate-90 scale-0"
        }`}
      />
    </button>
  );
}
