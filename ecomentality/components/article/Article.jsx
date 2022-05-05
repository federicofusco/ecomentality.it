import ArticleTitle from "./ArticleTitle"
import ArticleBody from "./ArticleBody"
import ArticleNavbar from "../nav/ArticleNavbar"
import ArticleSidebar from "../nav/ArticleSidebar"

/**
 * Displays an article
 * 
 * @param {Object} article - The article
 * @returns Displays an article
 */
const Article = ({ article }) => {
	return (
		<div className="w-screen h-screen overflow-x-hidden">
			
			<ArticleNavbar article={ article } />
			
			<div className="flex">
				<ArticleSidebar article={ article } />
				<div className="mx-auto max-w-2xl">
					<ArticleTitle article={ article } />
					<ArticleBody article={ article } />
				</div>
			</div>
		</div>
	)

} 

export default Article;