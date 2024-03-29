import useArticle from "./../../../../hooks/article"
import { useState, useEffect } from "react"
import { useSnackbar } from "notistack"
import useLocalStorage from "../../../../hooks/localStorage"

import { MdThumbUp, MdThumbUpOffAlt } from "react-icons/md"
import GenericActionButton from "./../GenericActionButton"

/**
 * A button which likes an article
 * 
 * @param {String} id - The article's ID
 * @param {?Boolean} isFallback - Whether or not to display a fallback button (default: false)
 * @note There is no grafical difference if isFallback is true, it just won't attempt to like the article
 * @returns A button for liking an article
 */
const LikeButton = ({ id, isFallback = false }) => {

	const [liked, setLiked] = useState ( false );
	const [likeCount, setLikeCount] = useState ( "..." );
	const { likeArticle, dislikeArticle, fetchLikeCount, createLikeListener } = useArticle ();
	const { enqueueSnackbar } = useSnackbar ();
	const [localLike, setLocalLike] = useLocalStorage ( `article-${ id }-like-bool`, "" );

	const unsub = createLikeListener ( id, ( doc ) => {
		
		if ( !doc.exists () ) return;

		// Updates the like count
		setLikeCount ( doc.data ().likeCount );
	});

	const onClick = () => {

		if ( isFallback ) {
			enqueueSnackbar ( "Please try again", {
				variant: "error",
				autoHideDuration: 1000
			});

			return;
		};

		if ( liked ) {

			// Attempts to dislike the article
			dislikeArticle ( id )
				.catch (() => {
					setLiked ( true );
					setLocalLike ( true );
				});
		} else {

			// Attemps to like that article
			likeArticle ( id )
				.catch (() => {
					setLiked ( false );
					setLocalLike ( false );
				});
		}

		setLiked ( !liked );
		setLocalLike ( !liked );
	}

	useEffect (() => {

		// Checks if the current user has liked the article
		if ( localLike === true || localLike === false ) setLiked ( localLike );

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
				<div className="flex sm:block">
					{ liked ? <MdThumbUp /> : <MdThumbUpOffAlt /> }
					<p className="text-xs my-auto ml-2 sm:ml-0">{ likeCount }</p>
				</div>
		</GenericActionButton>
	)
}

export default LikeButton;