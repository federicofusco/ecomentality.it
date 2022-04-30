/**
 * Displays an article's header
 * 
 * @param {String} title - The article's title
 * @param {String} author - The author's name
 * @returns Displays a header for a given article
 */
const ArticleTitle = ({ title, author }) => {
	return (
		<div>
			<h1>{ title }</h1>
			<p>Written by { author }</p>
		</div>
	)
}

export default ArticleTitle;