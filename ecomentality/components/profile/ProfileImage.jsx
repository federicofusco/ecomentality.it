import Image from "next/image"

const ProfileImage = ({ src, width = 64, height = 64 }) => {
	return <Image 
		src={ src } 
		loader={({ src }) => src } 
		unoptimized 
		width={ width }
		height={ height }
		className="rounded-full" />
}

export default ProfileImage;