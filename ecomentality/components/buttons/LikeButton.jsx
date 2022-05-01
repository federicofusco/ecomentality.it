import { useState } from "react"
import useArticle from "../../lib/article"
import { MdThumbUp, MdThumbUpOffAlt } from "react-icons/md";

const LikeButton = ({ article }) => {

	const [liked, setLiked] = useState ( false );
	const { likeArticle, dislikeArticle } = useArticle ();
	const { likeCount, id } = article;

	const onClick = () => {
		liked ? dislikeArticle ( id ) : likeArticle ( id );
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