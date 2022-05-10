import ArticleTitle from "./ArticleTitle"
import ArticleBody from "./ArticleBody"
import ArticleNavbar from "../nav/ArticleNavbar"
import ArticleSidebar from "../nav/ArticleSidebar"

/**
 * Displays an article
 * 
 * @param {Object} article - The article
 * @param {Object} author - The article's author
 * @param {?Boolean} isFallback - Whether or not to display a fallback article (default: false)
 * @returns Displays an article
 */
const Article = ({ article, author, isFallback = false }) => {

	// The fallback page needs to be seperate and can't drill components due to object destructuring
	if ( isFallback ) {

		// Displays fallback page
		return (
			<div className="w-screen h-screen overflow-x-hidden">
				
				<ArticleNavbar isFallback={ true } />
				
				<div className="flex">
					<ArticleSidebar isFallback={ true } />
					<div className="sm:ml-20 w-full md:mx-auto max-w-2xl">
						<ArticleTitle isFallback={ true } />
						<ArticleBody isFallback={ true } />
					</div>
				</div>
			</div>
		)
	}

	const { likeCount, title, timestamp, body } = article;
	const { displayName } = author;
	const articleId = article.id;
	const authorId = author.id;

	return (
		<div className="w-screen h-screen overflow-x-hidden">
			
			<ArticleNavbar authorId={ authorId } />
			
			<div className="flex">
				<ArticleSidebar likeCount={ likeCount } id={ articleId } />
				<div className="sm:ml-20 md:mx-auto max-w-2xl">
					<ArticleTitle title={ title } timestamp={ timestamp } author={ displayName } />
					<ArticleBody body={ body } />
				</div>
			</div>
		</div>
	)

} 

export default Article;