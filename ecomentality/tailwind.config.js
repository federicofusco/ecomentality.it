module.exports = {
	content: [
	  "./pages/**/*.{js,ts,jsx,tsx}",
	  "./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
	  extend: {
		  colors: {
			'light-lime-green' : 'rgb(28, 212, 31)',
		  },
		  aspectRatio: {
			'logo-ratio' : '967 / 292',
		  },
		  spacing: {
			  '520' : '520px',
		  }
	  },
	},
	plugins: [],
  }