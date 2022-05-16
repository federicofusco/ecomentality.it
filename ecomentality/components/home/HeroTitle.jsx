/**
 * Displays a hero title	
 * 
 * @param {String} title - The title which should be displayed
 * @returns A hero title
 */
const HeroTitle = ({ title }) => {
	return (
		<div className="w-screen h-screen flex justify-center">
			<h1 className="text-white text-5xl text-center my-auto">
				{ title }
			</h1>
		</div>
	)
}

export default HeroTitle;