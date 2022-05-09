/**
 * Displays an article's header
 * 
 * @param {String} title - The article's title
 * @param {String} timestamp - The article's publish datestring
 * @param {String} author - The author's displayName
 * @param {?Boolean} isFallback - Whether or not to display a fallback title (defaults to false)
 * @returns Displays a header for a given article
 */
const ArticleTitle = ({ title, timestamp, author, isFallback = false }) => {

	if ( isFallback ) {
		
		// Displays fallback title
		return (
			<div className="mt-24 px-8 py-4 w-full text-gray-dark font-serif">
				<div className="animate-pulse bg-gray-300 rounded-lg w-full h-5 text-transparent">a</div>
				<div className="animate-pulse mt-2 bg-gray-300 rounded-full w-4/5 h-3 text-transparent">a</div>
			</div>
		)
	}

	const date = new Date ( timestamp );

	return (
		<div className="mt-24 px-8 py-4 w-full text-gray-dark font-serif">
			<h1 className="text-5xl">{ title }</h1>
			<p className="mt-2">Written by { author } · {date.getDate ()}/{date.getMonth () + 1}/{date.getFullYear ()}</p>
		</div>
	)
}

export default ArticleTitle;