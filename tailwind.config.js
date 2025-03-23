/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins-Regular", "sans-serif"],
        PoppinsBold: ["Poppins-Bold", "sans-serif"],
        PoppinsExtraBold: ["Poppins-ExtraBold", "sans-serif"],
        PoppinsExtraLight: ["Poppins-ExtraLight", "sans-serif"],
        PoppinsLight: ["Poppins-Light", "sans-serif"],
        PoppinsMedium: ["Poppins-Medium", "sans-serif"],
        PoppinsSemiBold: ["Poppins-SemiBold", "sans-serif"],
      },
      colors: {
        // Light mode colors
        light: {
          background: '#FDF8F3', // Warmer creamy background
          primary: '#2A9D8F',    // Teal-green (more modern)
          secondary: '#F4A261',  // Soft coral
          accent: '#98C1D9',     // Muted blue-gray
          text: {
            primary: '#264653',   // Deep blue-gray
            secondary: '#546E7A', // Medium blue-gray
            muted: '#90A4AE'      // Light blue-gray
          }
        },
        // Dark mode colors
        dark: {
          background: '#1D2D35', // Deep blue-gray
          primary: '#2A9D8F',    // Matching teal-green
          secondary: '#E76F51',  // Burnt orange
          accent: '#7FB7CA',     // Muted teal
          text: {
            primary: '#F5F5F5',   // Crisp white
            secondary: '#CFD8DC', // Cool gray
            muted: '#90A4AE'      // Medium gray
          }
        }
      },
    },
  },
  darkMode: "media",
  plugins: [],
}