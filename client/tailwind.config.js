const {
  DefaultRouteMatcherManager,
} = require("next/dist/server/future/route-matcher-managers/default-route-matcher-manager");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["Outfit"],
        roboto: ["Roboto"],
      },
    },
  },
  plugins: [],
};
