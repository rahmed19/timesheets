module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		container: {
			center: true,
		},
		extend: {
			fontFamily: {
				oswald: ["Oswald"],
				russo: ["Mukta Malar"],
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
