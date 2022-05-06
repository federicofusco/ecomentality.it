module.exports = {
	content: [
	  "./pages/**/*.{js,ts,jsx,tsx}",
	  "./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
	  extend: {
		  colors: {
			'all-green' : '#2EC632',
			'nav-color' : '#32a820',
			'dark-green' : 'rgb(11, 147, 27)',
		  },
		  aspectRatio: {
			'logo-ratio' : '967 / 292',
		  },
		  spacing: {
			  '400' : '400px',
		  },
		  fontFamily: {
			  'comfortaa' : ['Rubik', 'sans-serif'],
		  }
	  },
	},
	plugins: [],
  }