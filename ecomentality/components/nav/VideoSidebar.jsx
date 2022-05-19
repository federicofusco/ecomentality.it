import VideoLikeButton from "./../buttons/VideoLikeButton"
import VideoShareButton from "./../buttons/VideoShareButton"

/**
 * Displays a sidebar for the current video
 * 
 * @param {Number} likeCount - The video's like count
 * @param {String} id - The video's ID
 * @returns A sidebar for the current video
 */
const VideoSidebar = ({ likeCount, id, isFallback = false }) => {
	return (
		<div className="hidden pt-20 sm:block flex-1 bg-white border-r absolute left-0 top-0 h-screen w-16">
			<div className="my-auto">
				<VideoLikeButton isFallback={ isFallback } likeCount={ likeCount } id={ id } />
				<VideoShareButton isFallback={ isFallback } id={ id } />
			</div>
		</div>
	)
}

export default VideoSidebar;