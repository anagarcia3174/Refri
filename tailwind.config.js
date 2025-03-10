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
          background: '#FEF9F2', // Creamy background
          primary: '#4D9E6F',    // Fresh green
          secondary: '#FF9047',  // Vibrant orange
          accent: '#8ECAE6',     // Soft blue
          text: {
            primary: '#2D3B36',   // Dark green-gray
            secondary: '#5C6761', // Medium green-gray
            muted: '#8A9490'      // Light green-gray
          }
        },
        // Dark mode colors
        dark: {
          background: '#1E2826', // Deep green-gray
          primary: '#5ABE85',    // Bright green
          secondary: '#FF9F5C',  // Warm orange
          accent: '#5DADCF',     // Muted blue
          text: {
            primary: '#F7F7F2',   // Off-white
            secondary: '#C7CAC8', // Light gray
            muted: '#919996'      // Medium gray
          }
        }
      },
    },
  },
  darkMode: "media",
  plugins: [],
}