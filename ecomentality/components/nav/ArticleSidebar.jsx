import LikeButton from "./../buttons/LikeButton"
import ShareButton from "./../buttons/ShareButton"

/**
 * Displays a sidebar for the current article
 * 
 * @param {Object} article - The article 
 * @returns A sidebar for the current article
 */
const ArticleSidebar = ({ article }) => {
	return (
		<div className="hidden pt-20 sm:block flex-1 bg-white border-r absolute left-0 top-0 h-screen w-16">
			<div className="my-auto">
				<LikeButton article={ article }  />
				<ShareButton article={ article } />
			</div>
		</div>
	)
}

export default ArticleSidebar;