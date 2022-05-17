import Link from "next/link"

/**
 * Displays a hero title	
 * 
 * @param {String} title - The title which should be displayed
 * @param {?String} subtitle - An optional subtitle
 * @param {?String} redirect - An optional redirect link which will be followed what the "learn more" button is clicked
 * @returns A hero title
 */
const HeroTitle = ({ title, subtitle, redirect }) => {
	return (
		<div className="w-screen h-screen flex justify-center">
			<div className="my-auto">
				<h1 className="text-white text-5xl text-center my-auto">
					{ title }
				</h1>

				{ subtitle && <h3 className="text-white mt-3 max-w-lg text-md text-center px-4">
					{ subtitle }
				</h3> }

				{ redirect && <div className="w-full mt-16 sm:mt-8 flex justify-center px-4">
					<Link href={ redirect }>
						<a className="w-full sm:w-auto">
							<div className="bg-black text-center p-4 w-full sm:w-36 rounded-md text-white">
								Learn More
							</div>
						</a>
					</Link>
				</div> }
			</div>
		</div>
	)
}

export default HeroTitle;