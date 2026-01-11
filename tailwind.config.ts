import type { Config } from "tailwindcss";

type Themes = "ash" | "charcoal" | "ivory" | "sienna";
type NotificationThemes = "error" | "warning" | "success";

type PalletteType = {
  DEFAULT: string;
  1: string;
  2: string;
  3: string;
  4?: string;
};

const themePallette: Record<Themes, PalletteType> = {
  sienna: {
    DEFAULT: "#b76e79",
    1: "#b35664",
    2: "#a65e69",
    3: "#c4959c",
  },
  ash: {
    DEFAULT: "#cccccc",
    1: "#dedede",
    2: "#c2c2c2",
    3: "#b0b0b0",
  },
  charcoal: {
    DEFAULT: "#141414",
    1: "#080808",
    2: "#1c1c1c",
    3: "#383838",
  },
  ivory: {
    DEFAULT: "#fafafa",
    1: "#ffffff",
    2: "#f2f2f2",
    3: "#e6e6e6",
  }
};

const notificationThemePallette: Record<NotificationThemes, PalletteType> = {
  error: { DEFAULT: "", 1: "", 2: "", 3: "" },
  warning: { DEFAULT: "", 1: "", 2: "", 3: "" },
  success: { DEFAULT: "", 1: "", 2: "", 3: "" }
};

const boxShadows = {
  light: "0 0 17px 7px #12121212",
  medium: "0 0 17px 8.5px #12121219",
  dark: "0 0 15px 6.5px #12121225",
  gold: "0 0 15px 7px #b76e7935",
  "crimson": "0 0 8px 8px #b76e7925"
};

const customAnimations = {
  shine: "shine 0.5s linear",
  "shine-infinite": "shine 3s infinite",
  "shine-infinite-slow": "once 10s linear infinite",
  "shine-infinite-slow-reversed": "once 5s infinite reverse",
  "spin-slow": "spinSlow 8s linear infinite"
};

const customKeyframes = {
  shine: {
    "0%": { left: "-15%" },
    "100%": { left: "115%" }
  },
  once: {
    "0%": { left: "-15%", opacity: "100%" },
    "7%": { left: "115%", opacity: "100%" },
    "7.01%, 100%": { left: "-15%", opacity: "0%" }
  },
  spinSlow: {
    "0%": { rotate: "0deg" },
    "50%": { rotate: "180deg" },
    "100%": { rotate: "360deg" }
  }
};

// ===[ TAILWIND EXPORTS ]=============================================

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./layouts/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./store/**/*.{ts,tsx}",
    "./common/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1280px"
      }
    },
    extend: {
      screens: {
        "1200": "1280px"
      },
      transitionDuration: {
        1500: "2200ms"
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        ...themePallette,
        ...notificationThemePallette,
        "moss": { DEFAULT: "#ad2355" }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" }
        },
        ...customKeyframes
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        ...customAnimations
      },
      height: {
        device: "100dvh",
        "1200": "1280px"
      },
      width: {
        device: "100dvw",
        "1200": "1280px"
      },
      minHeight: {
        device: "100dvh",
        "1200": "1280px"
      },
      minWidth: {
        device: "100dvw",
        "1200": "1280px"
      },
      maxHeight: {
        device: "100dvh",
        "1200": "1280px"
      },
      maxWidth: {
        device: "100dvw",
        "1200": "1280px"
      },
      boxShadow: boxShadows
    }
  },
  plugins: [require("tailwindcss-animate")]
} satisfies Config;

export default config;
