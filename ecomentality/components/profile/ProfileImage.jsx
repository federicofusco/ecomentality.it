import Image from "next/image"

/**
 * Displays a profile image
 * 
 * @param {String} src - The profile image's src
 * @param {?Number} width - The image's width (default: 64)
 * @param {?Number} height - The image's height (default: 64)
 * @param {?Boolean} isFallback - Whether or not to display a fallback image (default: false)
 * @returns A profile image
 */
const ProfileImage = ({ src, width = 64, height = 64, isFallback = false }) => {

	if ( isFallback ) return <div className="w-16 h-16 bg-gray-300 animate-pulse rounded-full text-transparent">a</div>;

	return (
		<>
			<Image 
				src={ src } 
				alt="Profile"
				width={ width }
				height={ height }
				className="rounded-full" />
		</>
	);
}

export default ProfileImage;