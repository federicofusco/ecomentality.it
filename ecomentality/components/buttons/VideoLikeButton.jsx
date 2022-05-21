import { useState } from "react"
import useVideo from "../../hooks/video"
import { MdThumbUp, MdThumbUpOffAlt } from "react-icons/md";
import { useSnackbar } from "notistack"

/**
 * A button which likes an video
 * 
 * @param {Number} likeCount - The video's like count
 * @param {String} id - The video's ID
 * @param {?Boolean} isFallback - Whether or not to display a fallback button (default: false)
 * @note There is no grafical difference if isFallback is true, it just won't attempt to like the video
 * @returns A button for liking an video
 */
const VideoLikeButton = ({ likeCount, id, isFallback = false }) => {

	const [liked, setLiked] = useState ( false );
	const { likeVideo, dislikeVideo } = useVideo ();
	const { enqueueSnackbar } = useSnackbar ();

	const onClick = () => {

		if ( isFallback ) {
			enqueueSnackbar ( "Something went wrong", {
				variant: "error",
				autoHideDuration: 1000
			});

			return;
		};

		if ( liked ) {

			// Attempts to dislike the video
			dislikeVideo ( id )
				.catch (() => setLiked ( true ));
		} else {

			// Attemps to like that video
			likeVideo ( id )
				.catch (() => setLiked ( false ));
		}

		setLiked ( !liked );
	}

	return (
		<button onClick={ onClick } className={`w-16 h-16 bg-transparent mt-4 flex justify-center ${ liked ? "text-green-600" : "text-gray-600" } hover:text-green-600 transition-all duration-300`}>
			<div className="my-auto text-2xl">
				{ liked ? <MdThumbUp /> : <MdThumbUpOffAlt /> }
				<p className="text-xs">{ liked ? likeCount + 1 : likeCount }</p>
			</div>
		</button>
	)
}

export default VideoLikeButton;