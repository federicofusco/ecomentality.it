import Image from "next/image"

/**
 * Displays a section on the homepage
 * 
 * @param {String} title - The section's title
 * @param {String} p - The section paragraph
 * @param {?Boolean} rightToLeft - Whether to invert the order of the image and text (default: false)
 * @param {String} id - The section's id
 * @returns A section
 */
const InfoSection = ({ title, p = lorem_ipsum, rightToLeft = false, id }) => {

	if ( rightToLeft ) {
		return (
			<div id={ id } className="w-full flex justify-center px-8 pb-8">
				<div className="hidden sm:flex w-1/2 h-80 justify-start">
					<Image 
						src="https://via.placeholder.com/320.png?text=ecomentality.life"
						width="320"
						height="320"
						className="w-72 h-72" />
				</div>
				<div className="w-full flex sm:w-1/2 h-80 text-white">
					<div className="my-auto">
						<h1 className="text-4xl font-bold uppercase font-poppins">{ title }</h1>
						<p className="mt-3 font-medium">{ p }</p>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div id={ id } className="w-full flex justify-center px-8 pb-8">
			<div className="w-full flex sm:w-1/2 h-80 text-white">
				<div className="my-auto">
					<h1 className="text-4xl font-bold uppercase font-poppins">{ title }</h1>
					<p className="mt-3 font-medium">{ p }</p>
				</div>
			</div>
			<div className="hidden sm:flex w-1/2 h-80 justify-end">
				<Image 
					src="https://via.placeholder.com/320.png?text=ecomentality.life"
					width="320"
					height="320"
					className="w-72 h-72" />
			</div>
		</div>
	)
} 

export default InfoSection;

const lorem_ipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu bibendum at varius vel pharetra vel. In ornare quam viverra orci sagittis eu volutpat odio facilisis. Nec feugiat nisl pretium fusce id velit ut. Ultrices mi tempus imperdiet nulla malesuada pellentesque.";