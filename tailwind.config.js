/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"main-color": "#8AAAE5",
				"black-100": "#FAFAFA",
				"black-200": "#E5E5E5",
				"black-300": "#B9B9B9",
				"black-400": "#8A8A8A",
				"black-500": "#3C3C3C",
				"black-600": "#121212",
				"red-100": "#F60000",
				"yellow-100": "#FEE500",
				"yellow-200": "#F6EAC2",
				"green-100": "#03C75A",
				"purple-100": "rgba(138, 170, 229, 0.4)",
			},
			minHeight: {
				"min-height": "calc(100vh - 4rem - 15rem)",
			},
			animation: {
				pulse: "pulse 4s 2",
				sonar: "sonar 4s 2",
				chatOpacity: "chatOpacity all 1s",
			},
			keyframes: {
				sonar: {
					"0%": { transform: "scale(0.9) opacity: 1" },
					"100%": { transform: "scale(2) opacity: 0 " },
				},
				pulse: {
					"0%": { transform: "scale(1)" },
					"20%": { transform: "scale(1.4)" },
					"50%": { transform: "scale(.9)" },
					"80%": { transform: "scale(1.2)" },
					"100%": { transform: "scale(1)" },
				},
				chatOpacity: {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
			},
		},
	},
	plugins: [],
};
