import Icon from "./../public/logo/icon.jpeg"
import Full from "./../public/logo/full.jpeg"
import Image from "next/image"

const Logo = ({ iconOnly, width = 32, height = 32 }) => {
	return <Image 
		src={ iconOnly ? Icon : Full }
		width={ width }
		height={ height } />
} 

export default Logo;