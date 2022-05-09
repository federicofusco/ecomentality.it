import LikeButton from "./../buttons/LikeButton"
import ShareButton from "./../buttons/ShareButton"

/**
 * Displays a sidebar for the current article
 * 
 * @param {Number} likeCount - The article's like count
 * @param {String} id - The article's ID
 * @param {?Boolean} isFallback - Whether or not to display a fallback sidebar (default: false)
 * @returns A sidebar for the current article
 */
const ArticleSidebar = ({ likeCount, id, isFallback = false }) => {
	return (
		<div className="hidden pt-20 sm:block flex-1 bg-white border-r absolute left-0 top-0 h-screen w-16">
			<div className="my-auto">
				<LikeButton isFallback={ isFallback } likeCount={ likeCount } id={ id } />
				<ShareButton isFallback={ isFallback } id={ id } />
			</div>
		</div>
	)
}

export default ArticleSidebar;