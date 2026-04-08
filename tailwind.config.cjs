module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        space: {
          950: "#05040a",
          900: "#0b0815",
          800: "#130f24",
          700: "#1a1330",
          600: "#231a3d",
        },
        accent: {
          400: "#c084fc",
          500: "#a855f7",
          600: "#7e22ce",
        },
      },
      fontFamily: {
        heading: ['"Space Grotesk"', "sans-serif"],
        body: ['"Sora"', "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 30px rgba(168, 85, 247, 0.35)",
        soft: "0 20px 60px rgba(0, 0, 0, 0.45)",
      },
      backgroundImage: {
        "radial-accent":
          "radial-gradient(80% 60% at 70% 20%, rgba(168, 85, 247, 0.25), rgba(5, 4, 10, 0))",
      },
    },
  },
  plugins: [],
};
