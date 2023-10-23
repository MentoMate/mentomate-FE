/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				"main-color": "#ABDEE6",
				"black-100": "#FAFAFA",
				"black-200": "#E5E5E5",
				"black-300": "#B9B9B9",
				"black-400": "#8A8A8A",
				"black-500": "#3C3C3C",
				"black-600": "#121212",
				"red-100": "#F60000",
				"yellow-100": "#FEE500",
				"green-100": "#03C75A",
			},
		},
	},
	plugins: [],
};
