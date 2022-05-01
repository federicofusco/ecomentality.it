/**
 * Displays an article's header
 * 
 * @param {Object} article - The article
 * @returns Displays a header for a given article
 */
const ArticleTitle = ({ article }) => {

	// const date = new Date ( article.timestamp.seconds * 1000 );

	return (
		<div className="mt-24 p-4 w-full text-gray-dark font-serif">
			<h1 className="text-5xl">{ article.title }</h1>
			{/* <p className="mt-2">Written by { article.author } · {date.getDate ()}/{date.getMonth () + 1}/{date.getFullYear ()}</p> */}
		</div>
	)
}

export default ArticleTitle;