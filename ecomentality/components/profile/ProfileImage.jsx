import Image from "next/image"

/**
 * Displays a profile image
 * 
 * @param {String} src - The profile image's src
 * @param {?Number} width - The image's width (default: 64)
 * @param {?Number} height - The image's height (default: 64)
 * @returns A profile image
 */
const ProfileImage = ({ src, width = 64, height = 64 }) => {
	return <Image 
		src={ src } 
		loader={({ src }) => src } 
		unoptimized 
		alt="Profile"
		width={ width }
		height={ height }
		className="rounded-full" />
}

export default ProfileImage;