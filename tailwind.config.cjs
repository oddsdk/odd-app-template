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
          "--rounded-box": "2px",
          "--rounded-btn": "2px",
          "--rounded-badge": "2px",
          "--tab-radius": "2px"
        },
        light : {
          primary: "#43919b",
          secondary: "#30aadd",
          accent: "#00ffc6",
          neutral: "#e5e5e5",
          "base-content": "#000000",
          "base-100": "#ffffff",
          "--rounded-box": "2px",
          "--rounded-btn": "2px",
          "--rounded-badge": "2px",
          "--tab-radius": "2px"
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