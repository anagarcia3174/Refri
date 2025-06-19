/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        light: {
          primary: '#E57373',        
          secondary: '#FAD4D4',      
          background: '#FFFFFF',
          error: '#E53935',          
          success: '#48BB78',
          warning: '#ED8936',
          text: {
            onBackground: '#1A202C',
            onPrimary: '#FFFFFF',
            onSecondary: '#1A202C',
          },
        },
        dark: {
          primary: '#F28B82',        
          secondary: '#FBC8C8',      
          background: '#1A202C',
          error: '#EF5350',          
          success: '#9AE6B4',
          warning: '#F6AD55',
          text: {
            onBackground: '#F8FAFC',
            onPrimary: '#1A202C',
            onSecondary: '#1A202C',
          },
        },
      },
      fontFamily: {
        'rubik-regular': ['Rubik-Regular'],
        'rubik-medium': ['Rubik-Medium'],
        'rubik-semibold': ['Rubik-SemiBold'],
        'rubik-bold': ['Rubik-Bold'],
        'rubik-light': ['Rubik-Light'],
        'inter-regular': ['Inter-Regular'],
        'inter-medium': ['Inter-Medium'],
        'inter-semibold': ['Inter-SemiBold'],
        'inter-bold': ['Inter-Bold'],
        'inter-light': ['Inter-Light'],
      },
    },
  },
  corePlugins: {
    backgroundOpacity: true,
  },
};
