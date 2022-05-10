import DOMPurify from "isomorphic-dompurify"

/**
 * Displays the article's body
 * 
 * @param {String} body - The article's body
 * @returns An article body
 */
const ArticleBody = ({ body, isFallback = false }) => {
	return <div className="font-serif break-all px-8" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize ( body ) }}></div>
}

export default ArticleBody;