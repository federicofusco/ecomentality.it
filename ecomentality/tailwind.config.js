module.exports = {
	content: [
	  "./pages/**/*.{js,ts,jsx,tsx}",
	  "./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
	  extend: {
		  colors: {
			'all-green' : '#2EC632',
			'nav-color' : '#32a820'
		  },
		  aspectRatio: {
			'logo-ratio' : '967 / 292',
		  },
		  spacing: {
			  '460' : '460px',
		  }
	  },
	},
	plugins: [],
  }