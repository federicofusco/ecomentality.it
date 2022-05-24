import ArticleTitle from "./ArticleTitle"
import ArticleBody from "./ArticleBody"
import ArticleNavbar from "./../nav/navbars/ArticleNavbar"
import ArticleSidebar from "./../nav/sidebars/ArticleSidebar"

/**
 * Displays an article
 * 
 * @param {Object} article - The article
 * @param {Object} author - The article's author
 * @param {?Boolean} isFallback - Whether or not to display a fallback article (default: false)
 * @returns Displays an article
 */
const Article = ({ article, author, isFallback = false }) => {

	const { likeCount, title, timestamp, body } = article;
	const { displayName } = author;
	const articleId = article.id;
	const authorId = author.id;

	return (
		<div className="w-screen h-screen overflow-x-hidden">
			
			<ArticleNavbar authorId={ authorId } />
			
			<div className="flex">
				<ArticleSidebar likeCount={ likeCount } id={ articleId } />
				<div className="sm:ml-20 md:mx-auto w-full max-w-2xl">
					<ArticleTitle title={ title } timestamp={ timestamp } author={ displayName } />
					<ArticleBody body={ body } />
				</div>
			</div>
		</div>
	)

} 

export default Article;