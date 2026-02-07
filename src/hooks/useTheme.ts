import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme-preference";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;

  // Default to dark regardless of OS preference
  return "dark";
}

type ThemeContextValue = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  const applyTheme = useCallback((t: Theme) => {
    const root = document.documentElement;
    if (t === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  // Listen for storage events (sync across tabs)
  useEffect(() => {
    const storageHandler = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && (e.newValue === "light" || e.newValue === "dark")) {
        setThemeState(e.newValue as Theme);
      }
    };

    window.addEventListener("storage", storageHandler);

    return () => {
      window.removeEventListener("storage", storageHandler);
    };
  }, []);

  const setTheme = useCallback(
    (t: Theme) => {
      localStorage.setItem(STORAGE_KEY, t);
      setThemeState(t);
      applyTheme(t);
    },
    [applyTheme],
  );

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return React.createElement(ThemeContext.Provider, { value: { theme, setTheme, toggleTheme } }, children);
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    // Fallback for components used outside the provider; keeps behavior predictable.
    console.warn("useTheme must be used within a ThemeProvider");
    return {
      theme: getInitialTheme(),
      setTheme: (t: Theme) => {
        void t;
      },
      toggleTheme: () => {},
    };
  }
  return ctx;
}
