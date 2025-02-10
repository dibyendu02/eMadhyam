import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    "./src/commons/components/**/*.{js,ts,jsx,tsx,mdx}",
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          50: "#f3f9f4", // Lightest
          100: "#e7f3e8",
          200: "#c5e0c6",
          300: "#a3cda4",
          400: "#62a861",
          500: "#21831e", // Default Primary
          600: "#1d751a",
          700: "#186016",
          800: "#134c11",
          900: "#0f380d", // Darkest (Closest to 24670D)
        },
        secondary: {
          50: "#f5f8ff", // Lightest
          100: "#ebf0ff",
          200: "#cddaff",
          300: "#aec4ff",
          400: "#7197ff",
          500: "#336aff", // Default Secondary
          600: "#2e5ee6",
          700: "#264dbf",
          800: "#1e3d99",
          900: "#172e7a", // Darkest
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;