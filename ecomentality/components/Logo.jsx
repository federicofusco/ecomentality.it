import Icon from "./../public/logo/icon.jpeg"
import Full from "./../public/logo/full.jpeg"
import Image from "next/image"

/**
 * Displays the GEM logo
 * 
 * @param {Boolean} iconOnly - Whether or not to only display the logo icon
 * @param {Number} width - The logo's width (default: 32)
 * @param {Number} height - The logo's height (default: 32)
 * @returns The GEM logo
 */
const Logo = ({ iconOnly, width = 32, height = 32 }) => {
	return <Image 
		alt="GEM"
		src={ iconOnly ? Icon : Full }
		width={ width }
		height={ height } 
		className="rounded-lg" />
} 

export default Logo;