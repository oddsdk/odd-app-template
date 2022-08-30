module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,js,svelte,ts}"],
  plugins: [require("daisyui")],
  darkMode: ['class', '[data-theme="dark"]'],
  daisyui: {
    styled: true,
    themes: [
      {
        dark: {
          primary: "#3b82f6",
          secondary: "#30aadd",
          accent: "#00ffc6",
          neutral: "#282828",
          info: "#bfdbfe",
          success: "#22c55e",
          warning: "#fdba74",
          error: "#ef4444",
          "base-content": "#f8fafc", // Base text content color
          "base-100": "#0f172a", // Base background color
          "--rounded-box": "16px",
          "--rounded-btn": "8px",
          "--rounded-badge": "2px",
          "--tab-radius": "2px",
          "--btn-text-case": "normal-case"
        },
        light: {
          primary: "#3b82f6",
          secondary: "#30aadd",
          accent: "#00ffc6",
          neutral: "#e5e5e5",
          info: "#bfdbfe",
          success: "#15803d",
          warning: "#fdba74",
          error: "#b91c1c",
          "base-content": "#0f172a", // Base text content color
          "base-100": "#f8fafc", // Base background color
          "--rounded-box": "16px",
          "--rounded-btn": "8px",
          "--rounded-badge": "2px",
          "--tab-radius": "2px",
          "--btn-text-case": "normal-case"
        },
      },
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    darkTheme: "dark",
  },
};