import type { Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: { colors: { background: "var(--bg)", foreground: "var(--fg)", muted: "var(--muted)", line: "var(--border)" }, fontFamily: { sans: ["var(--font-sans)", "Arial", "sans-serif"] } } },
  plugins: [],
} satisfies Config;
