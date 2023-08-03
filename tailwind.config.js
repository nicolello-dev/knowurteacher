/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
		colors: {
			text : {
				DEFAULT: "#000000"
			},
			bg: {
				DEFAULT: "#f6ecfd"
			},
			primary: {
				DEFAULT: "#7e0d74"
			},
			secondary: {
				DEFAULT: "#eaa4e1"
			},
			accent: {
				DEFAULT: "#54245b"
			}
		},
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
