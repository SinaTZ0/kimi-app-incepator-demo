/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        indigo: {
          DEFAULT: "hsl(var(--color-indigo))",
          glow: "var(--indigo-glow)",
        },
        dark: {
          base: "hsl(var(--color-dark-base))",
          lifted: "hsl(var(--color-dark-lifted))",
        },
        text: {
          primary: "hsl(var(--color-text-primary))",
          secondary: "hsl(var(--color-text-secondary))",
        },
        surface: "rgb(var(--surface-rgb) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["Vazirmatn", "system-ui", "sans-serif"],
        display: ["Vazirmatn", "system-ui", "sans-serif"],
        mono: ["Vazirmatn", "monospace"],
      },
      fontSize: {
        "display-1": ["clamp(44px, 5vw, 84px)", { lineHeight: "0.95", fontWeight: "600" }],
        "display-2": ["clamp(34px, 3.6vw, 56px)", { lineHeight: "1.05", fontWeight: "600" }],
        "display-3": ["clamp(28px, 2.8vw, 42px)", { lineHeight: "1.1", fontWeight: "600" }],
      },
      borderRadius: {
        glass: "28px",
        "glass-mobile": "22px",
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        glass: "0 28px 100px rgba(0, 0, 0, 0.45)",
        "glow-indigo": "0 10px 30px rgba(79, 109, 245, 0.35)",
        "glow-indigo-lg": "0 14px 40px rgba(79, 109, 245, 0.45)",
      },
      backdropBlur: {
        glass: "22px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 10px 30px rgba(79, 109, 245, 0.35)" },
          "50%": { boxShadow: "0 14px 40px rgba(79, 109, 245, 0.55)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
