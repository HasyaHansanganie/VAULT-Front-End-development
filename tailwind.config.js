/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: 'class',
	safelist: [
		'bg-luxury-light',
		'bg-luxury-dark',
	],
	theme: {
		extend: {
			animation: {
				'pulse-glow-light': 'pulseGlowLight 1.8s ease-in-out infinite',
				'pulse-glow-dark': 'pulseGlowDark 1.8s ease-in-out infinite'
			},
			keyframes: {
				pulseGlowLight: {
					'0%, 100%': {
						transform: 'scale(1)',
						boxShadow: '0 0 4px rgba(68, 45, 3, 0.8)'
					},
					'50%': {
						transform: 'scale(1.05)',
						boxShadow: '0 0 22px rgb(31, 21, 2)'
					}
				},
				pulseGlowDark: {
					'0%, 100%': {
						transform: 'scale(1)',
						boxShadow: '0 0 4px rgba(255, 255, 200, 0.3)'
					},
					'50%': {
						transform: 'scale(1.05)',
						boxShadow: '0 0 25px rgba(255, 255, 150, 0.6)'
					}
				}
			},
		}
	},

	plugins: [],
};


