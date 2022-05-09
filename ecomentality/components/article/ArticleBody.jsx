import DOMPurify from "isomorphic-dompurify"

/**
 * Displays the article's body
 * 
 * @param {String} body - The article's body
 * @param {?Boolean} isFallback - Whether or not to display a fallback body (default: false)
 * @returns An article body
 */
const ArticleBody = ({ body, isFallback = false }) => {

	if ( isFallback ) {
		return <div className="font-serif px-8 w-full">
			<div className="animate-pulse bg-gray-300 rounded-full h-3 text-transparent w-full">a</div>
			<div className="animate-pulse mt-1 bg-gray-300 rounded-full h-3 text-transparent w-2/3">a</div>
			<div className="animate-pulse mt-1 bg-gray-300 rounded-full h-3 text-transparent w-5/6">a</div>
			<div className="flex justify-start">
				<div className="animate-pulse mt-1 bg-gray-300 rounded-full h-3 text-transparent w-1/3">a</div>
				<div className="animate-pulse ml-1 mt-1 bg-gray-300 rounded-full h-3 text-transparent w-1/2">a</div>
			</div>
			<div className="animate-pulse mt-1 bg-gray-300 rounded-full h-3 text-transparent w-full">a</div>

		</div>	
	}

	return <div className="font-serif break-all px-8" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize ( body ) }}></div>
}

export default ArticleBody;