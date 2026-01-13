/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(213, 94%, 57%)',
          hover: 'hsl(213, 94%, 47%)',
          light: 'hsl(213, 94%, 95%)',
          dark: 'hsl(213, 94%, 37%)',
        },
        medical: {
          blue: 'hsl(197, 71%, 52%)',
          'blue-light': 'hsl(197, 71%, 92%)',
          'blue-dark': 'hsl(197, 71%, 42%)',
          green: 'hsl(142, 71%, 45%)',
          'green-light': 'hsl(142, 71%, 92%)',
          'green-dark': 'hsl(142, 71%, 35%)',
        },
        accent: {
          DEFAULT: 'hsl(340, 82%, 52%)',
          light: 'hsl(340, 82%, 92%)',
          dark: 'hsl(340, 82%, 42%)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'primary': '0 4px 14px 0 rgba(59, 130, 246, 0.39)',
        'success': '0 4px 14px 0 rgba(16, 185, 129, 0.39)',
        'error': '0 4px 14px 0 rgba(239, 68, 68, 0.39)',
      },
      gridTemplateColumns: {
        auto: "repeat(auto-fill, minmax(200px, 1fr))",
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'fade-in-up': 'fadeInUp 0.4s ease-out',
        'slide-in-left': 'slideInLeft 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
    },
  },
  plugins: [],
};

