/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        card: {
          DEFAULT: "var(--color-card)",
          dark: "var(--color-card-dark)",
          foreground: "var(--color-card-foreground)",
        },
        popover: {
          DEFAULT: "var(--color-popover)",
          dark: "var(--color-popover-dark)",
          foreground: "var(--color-popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--color-primary)",
          dark: "var(--color-primary-dark)",
          foreground: "var(--color-primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          light: "var(--color-secondary-light)",
          foreground: "var(--color-secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--color-muted)",
          foreground: "var(--color-muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          foreground: "var(--color-accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--color-destructive)",
          alt: "var(--color-destructive-alt)",
          foreground: "var(--color-destructive-foreground)",
        },
        border: "var(--color-border)",
        input: {
          DEFAULT: "var(--color-input)",
          background: "var(--color-input-background)",
        },
        ring: "var(--color-ring)",

        /* Brand Palette Tokens */
        navy: "var(--color-navy)",
        "horizon-sky": "var(--color-horizon-sky)",
        "coastal-white": "var(--color-coastal-white)",
        "sand-base": "var(--color-sand-base)",
        slate: "var(--color-slate)",
        "yellow-sand": "var(--color-yellow-sand)",
        seafoam: "var(--color-seafoam)",
        coral: "var(--color-coral)",

        /* Semantic Status and Role Tokens */
        success: "var(--color-success)",
        info: "var(--color-info)",
        purple: "var(--color-purple)",
        warning: "var(--color-warning)",
        pending: "var(--color-pending)",
        danger: "var(--color-danger)",
        cyan: "var(--color-cyan)",

        /* Charts */
        chart: {
          1: "var(--color-chart-1)",
          2: "var(--color-chart-2)",
          3: "var(--color-chart-3)",
          4: "var(--color-chart-4)",
          5: "var(--color-chart-5)",
          6: "var(--color-chart-6)",
        },

        /* Brand & Interactive */
        whatsapp: "var(--color-whatsapp)",
        star: {
          active: "var(--color-star-active)",
          inactive: "var(--color-star-inactive)",
        },

        /* Sidebar */
        sidebar: {
          DEFAULT: "var(--color-sidebar)",
          dark: "var(--color-sidebar-dark)",
          foreground: "var(--color-sidebar-foreground)",
          primary: "var(--color-sidebar-primary)",
          "primary-foreground": "var(--color-sidebar-primary-foreground)",
          accent: "var(--color-sidebar-accent)",
          "accent-foreground": "var(--color-sidebar-accent-foreground)",
          border: "var(--color-sidebar-border)",
          ring: "var(--color-sidebar-ring)",
          charcoal: "var(--color-sidebar-charcoal)",
        },
      },
      fontFamily: {
        sans: ['"IBM Plex Sans Arabic"', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
        heading: ['"IBM Plex Sans Arabic"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

