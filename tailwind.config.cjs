module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,js,svelte,ts}"],
  plugins: [require("daisyui")],
  daisyui: {
    styled: true,
    themes: [
      {
        dark: {
          primary: "#43919b",
          secondary: "#30aadd",
          accent: "#00ffc6",
          neutral: "#282828",
          "base-content": "#ffffff",
          "base-100": "#111111",
          "--rounded-box": "16px",
          "--rounded-btn": "8px",
          "--rounded-badge": "2px",
          "--tab-radius": "2px",
          "--btn-text-case": "normal-case"
        },
        light: {
          primary: "#407FF3",
          secondary: "#30aadd",
          accent: "#00ffc6",
          neutral: "#e5e5e5",
          "base-content": "#000000",
          "base-100": "#ffffff",
          "--rounded-box": "16px",
          "--rounded-btn": "8px",
          "--rounded-badge": "2px",
          "--tab-radius": "2px",
          "--btn-text-case": "normal-case"
          // 2rem padding on modal-box
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