import GenericSidebar from "./GenericSidebar"
import LikeButton from "./../../buttons/icon/article/LikeButton"
import ShareButton from "./../../buttons/icon/article/ShareButton"

/**
 * Displays a sidebar for the current article
 * 
 * @param {Number} likeCount - The article's like count
 * @param {String} id - The article's ID
 * @returns A sidebar for the current article
 */
const ArticleSidebar = ({ likeCount, id, isFallback = false }) => {
	return (
		<GenericSidebar>
			<LikeButton isFallback={ isFallback } likeCount={ likeCount } id={ id } />
			<ShareButton isFallback={ isFallback } id={ id } />
		</GenericSidebar>
	)
}

export default ArticleSidebar;