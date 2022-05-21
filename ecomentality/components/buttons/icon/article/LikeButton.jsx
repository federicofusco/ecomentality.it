import useArticle from "./../../../../hooks/article"
import { useState } from "react"
import { useSnackbar } from "notistack"

import { MdThumbUp, MdThumbUpOffAlt } from "react-icons/md"
import GenericActionButton from "./../GenericActionButton"

/**
 * A button which likes an article
 * 
 * @param {Number} likeCount - The article's like count
 * @param {String} id - The article's ID
 * @param {?Boolean} isFallback - Whether or not to display a fallback button (default: false)
 * @note There is no grafical difference if isFallback is true, it just won't attempt to like the article
 * @returns A button for liking an article
 */
const LikeButton = ({ likeCount, id, isFallback = false }) => {

	const [liked, setLiked] = useState ( false );
	const { likeArticle, dislikeArticle } = useArticle ();
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

			// Attempts to dislike the article
			dislikeArticle ( id )
				.catch (() => setLiked ( true ));
		} else {

			// Attemps to like that article
			likeArticle ( id )
				.catch (() => setLiked ( false ));
		}

		setLiked ( !liked );
	}

	return (
		<GenericActionButton
			onClick={ onClick }
			className={ liked ? "text-green-600" : "text-gray-600" }>
				{ liked ? <MdThumbUp /> : <MdThumbUpOffAlt /> }
				<p className="text-xs">{ liked ? likeCount + 1 : likeCount }</p>
		</GenericActionButton>
	)
}

export default LikeButton;