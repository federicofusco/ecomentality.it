import { useState } from "react"
import useArticle from "../../lib/article"
import { MdThumbUp, MdThumbUpOffAlt } from "react-icons/md";

/**
 * A button which likes an article
 * 
 * @param {Object} article - The article
 * @returns A button for liking an article
 */
const LikeButton = ({ article }) => {

	const [liked, setLiked] = useState ( false );
	const { likeArticle, dislikeArticle } = useArticle ();
	const { likeCount, id } = article;

	const onClick = () => {
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
		<button onClick={ onClick } className={`w-16 h-16 bg-transparent mt-4 flex justify-center ${ liked ? "text-green-600" : "text-gray-600" } hover:text-green-600 transition-all duration-300`}>
			<div className="my-auto text-2xl">
				{ liked ? <MdThumbUp /> : <MdThumbUpOffAlt /> }
				<p className="text-xs">{ liked ? likeCount + 1 : likeCount }</p>
			</div>
		</button>
	)
}

export default LikeButton;