import ArticleTitle from "./ArticleTitle"
import ArticleBody from "./ArticleBody"
import ArticleNavbar from "../nav/ArticleNavbar"
import ArticleSidebar from "../nav/ArticleSidebar"

/**
 * Displays an article
 * 
 * @param {Object} article - The article
 * @param {Object} author - The article's author
 * @returns Displays an article
 */
const Article = ({ article, author }) => {
	return (
		<div className="w-screen h-screen overflow-x-hidden">
			
			<ArticleNavbar authorId={ author.id } />
			
			<div className="flex">
				<ArticleSidebar likeCount={ article.likeCount } id={ article.id } />
				<div className="mx-auto max-w-2xl">
					<ArticleTitle title={ article.title } timestamp={ article.timestamp } author={ author.displayName } />
					<ArticleBody body={ article.body } />
				</div>
			</div>
		</div>
	)

} 

export default Article;