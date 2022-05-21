import VideoTitle from "./VideoTitle"
import VideoBody from "./VideoBody"
import ArticleNavbar from "./../nav/navbars/ArticleNavbar"
import VideoSidebar from "./../nav/sidebars/VideoSidebar"

/**
 * Displays a video
 * 
 * @param {Object} video - The video
 * @param {Object} author - The video's author
 * @returns Displays an video
 */
const Video = ({ video, author }) => {

	const { likeCount, title, timestamp, link } = video;
	const { displayName } = author;
	const videoId = video.id;
	const authorId = author.id;

	return (
		<div className="w-screen h-screen overflow-x-hidden">
			
	 		<ArticleNavbar authorId={ authorId } />
			
	 		<div className="flex">
	 			<VideoSidebar likeCount={ likeCount } id={ videoId } />
	 			<div className="sm:ml-20 md:mx-auto w-full max-w-2xl">
					<VideoTitle title={ title } timestamp={ timestamp } author={ displayName } />
	 				<VideoBody link={ link } />
	 			</div>
	   		</div> 
		</div>
	)

} 

export default Video;