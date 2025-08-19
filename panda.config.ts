import { defineConfig } from "@pandacss/dev";
import { createPreset } from "@park-ui/panda-preset";
import neutral from "@park-ui/panda-preset/colors/neutral";

export default defineConfig({
  conditions: {
    extend: {
      dark: '.dark &, [data-theme="dark"] &',
      light: ".light &",
    },
  },

  // Files to exclude
  exclude: [],
  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // The JSX framework to use
  jsxFramework: "solid",

  // The output directory for your css system
  outdir: "src/styled-system",

  // The extension for the emitted JavaScript files
  outExtension: "js",
  // Whether to use css reset
  preflight: true,

  presets: [
    createPreset({ accentColor: neutral, grayColor: neutral, radius: "2xl" }),
  ],

  // The CSS Syntax to use to use
  syntax: "object-literal",

  // Useful for theme customization
  theme: {
    extend: {},
  },
});
