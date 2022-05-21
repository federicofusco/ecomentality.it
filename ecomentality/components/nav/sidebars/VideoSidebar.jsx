import VideoLikeButton from "./../../buttons/VideoLikeButton"
import VideoShareButton from "./../../buttons/VideoShareButton"
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
				<VideoLikeButton isFallback={ isFallback } likeCount={ likeCount } id={ id } />
				<VideoShareButton isFallback={ isFallback } id={ id } />
		</GenericSidebar>
	)
}

export default VideoSidebar;