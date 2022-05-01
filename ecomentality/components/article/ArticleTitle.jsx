/**
 * Displays an article's header
 * 
 * @param {String} title - The article's title
 * @param {String} author - The author's name
 * @returns Displays a header for a given article
 */
const ArticleTitle = ({ title, author }) => {
	return (
		<div className="mt-24 p-4 w-full text-gray-dark font-serif">
			<h1 className="text-5xl">{ title }</h1>
			<p className="mt-2">Written by { author }</p>
		</div>
	)
}

export default ArticleTitle;