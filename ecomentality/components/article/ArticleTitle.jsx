/**
 * Displays an article's header
 * 
 * @param {Object} article - The article
 * @returns Displays a header for a given article
 */
const ArticleTitle = ({ title, timestamp, author }) => {

	const date = new Date ( timestamp );

	return (
		<div className="mt-24 px-8 py-4 w-full text-gray-dark font-serif">
			<h1 className="text-5xl">{ title }</h1>
			<p className="mt-2">Written by { author } · {date.getDate ()}/{date.getMonth () + 1}/{date.getFullYear ()}</p>
		</div>
	)
}

export default ArticleTitle;