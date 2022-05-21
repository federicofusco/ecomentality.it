import LikeButton from "./../../buttons/icon/video/LikeButton"
import ShareButton from "./../../buttons/icon/video/ShareButton"
import GenericSidebar from "./GenericSidebar"

/**
 * Displays a sidebar for the current video
 * 
 * @param {Number} likeCount - The video's like count
 * @param {String} id - The video's ID
 * @returns A sidebar for the current video
 */
const VideoSidebar = ({ likeCount, id, isFallback = false }) => {
	return (
		<GenericSidebar>
				<LikeButton isFallback={ isFallback } likeCount={ likeCount } id={ id } />
				<ShareButton isFallback={ isFallback } id={ id } />
		</GenericSidebar>
	)
}

export default VideoSidebar;