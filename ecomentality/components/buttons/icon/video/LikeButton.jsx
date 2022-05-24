import { useState, useEffect } from "react"
import useVideo from "./../../../../hooks/video"
import { useSnackbar } from "notistack"

import { MdThumbUp, MdThumbUpOffAlt } from "react-icons/md";
import GenericActionButton from "./../GenericActionButton"

/**
 * A button which likes a video
 * 
 * @param {String} id - The video's ID
 * @param {?Boolean} isFallback - Whether or not to display a fallback button (default: false)
 * @note There is no grafical difference if isFallback is true, it just won't attempt to like the video
 * @returns A button for liking an video
 */
const VideoLikeButton = ({ id, isFallback = false }) => {

	const [liked, setLiked] = useState ( false );
	const [likeCount, setLikeCount] = useState ( "..." );
	const { likeVideo, dislikeVideo, fetchLikeCount, createLikeListener } = useVideo ();
	const { enqueueSnackbar } = useSnackbar ();

	const unsub = createLikeListener ( id, ( doc ) => {

		if ( !doc.exists () ) return;

		// Updates the like count
		setLikeCount ( doc.data ().likeCount );
	});

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

	useEffect (() => {

		// Updates the like count
		const updateLikeCount = async () => {
			await fetchLikeCount ( id ) 
				.then (( likeCount ) => {

					// Updates the like count
					setLikeCount ( likeCount.data.likeCount );
				})
				.catch (( error ) => {

					console.error ( error );

					// An error occurred
					enqueueSnackbar ( "Something went wrong!", {
						variant: "error",
						autoHideDuration: 3000
					});
				});
		}

		updateLikeCount ();
	}, []);

	return (
		<GenericActionButton
			onClick={ onClick }
			className={ liked ? "text-green-600" : "text-gray-600" }>
			{ liked ? <MdThumbUp /> : <MdThumbUpOffAlt /> }
			<p className="text-xs">{ likeCount }</p>
		</GenericActionButton>
	)
}

export default VideoLikeButton;