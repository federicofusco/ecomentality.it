module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
	  extend: {
		  colors: {
			'light-green': '#8bf095',
			'all-green': '#2EC632',
			'nav-color': '#32a820',
			'dark-green': 'rgb(11, 147, 27)',
			'gray-dark': '#000000d9'
		  },
		  aspectRatio: {
        	'logo-ratio': '967 / 292',
		  },
		  spacing: {
			'550': '550px',
			'470': '470px',
			'90': '90%',
			'111': '111px',
			'520': '520px',
			',8': '-32px',
		  },
		  fontFamily: {
			  'comfortaa': ['Rubik', 'sans-serif'],
			  'poppins': ['Poppins', 'sans-serif']
		  }
	  },
	},
	plugins: [],
}