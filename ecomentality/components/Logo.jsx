import Icon from "./../public/logo/icon.jpeg"
import Full from "./../public/logo/full.jpeg"
import Image from "next/image"

/**
 * Displays the GEM logo
 * 
 * @param {Boolean} iconOnly - Whether or not to only display the logo icon
 * @returns The GEM logo
 */
const Logo = ({ iconOnly }) => {
	return <Image 
		alt="GEM"
		src={ iconOnly ? Icon : Full }
		width={ iconOnly ? 292 : 967 }
		height={ 292 } />
} 

export default Logo;