
import type { Config } from "tailwindcss";
import MttClasses from "./components/mtt/styles/MttClasses";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {

		height:{
InputHeight:'var(--InputHeight)'
		},

		borderWith:{
Input:'var(--Border)'
		},
      colors: {
		Alpha: "var(--Alpha)",
		Alpha1: "var(--Alpha1)",
		Alpha2: "var(--Alpha2)",
		Alpha3: "var(--Alpha3)",
		Alpha4: "var(--Alpha4)",
		Alpha5: "var(--Alpha5)",
        Base: "var(--Base)",
        ForeBase: "var(--ForeBase)",
        BaseShade: "var(--BaseShade)",
        BaseShade1: "var(--BaseShade1)",
        BaseShade2: "var(--BaseShade2)",
        BaseShade3: "var(--BaseShade3)",
        BaseShade4: "var(--BaseShade4)",
        BaseShade5: "var(--BaseShade5)",
        BaseShadeDark: "var(--BaseShadeDark)",
        BaseShadeWhite: "var(--BaseShadeWhite)",
        BaseShade1White: "var(--BaseShade1White)",
        BaseShade2White: "var(--BaseShade2White)",
        BaseShade3White: "var(--BaseShade3White)",
        BaseShade4White: "var(--BaseShade4White)",
        BaseShade5White: "var(--BaseShade5White)",
        BaseShadeDarkWhite: "var(--BaseShadeDarkWhite)",
		Pri:'var(--Pri)',
		Sec:'var(--Sec)',
    PriLight:'var(--PriLight)',
    PriLighter:'var(--PriLighter)',
    PriDark:'var(--PriDark)',
    PriDarker:'var(--PriDarker)',
		
		textPri: "var(--textPri)",
        textSec: "var(--textSec)",
		textTert: "var(--textTert)",
        background: "var(--Base)",
        foreground: "var(--ForeBase)",
        card: {
          DEFAULT: "var(--BaseShade5)",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "var(--BaseShade5)",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "var(--HoverPri)",
          foreground: "var(--ForeBase)",
        },
        secondary: {
          DEFAULT: "var(--HoverSec)",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "var(--Alpha3)",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "var(--Border)",
        input: "var(--Border)",
        ring: "var(--Alpha5)",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        xl: "calc(var(--Radius) * 2)",
        lg: "var(--Radius)",
        md: "calc(var(--Radius) - 2px)",
        sm: "calc(var(--Radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), MttClasses],
};
export default config;

