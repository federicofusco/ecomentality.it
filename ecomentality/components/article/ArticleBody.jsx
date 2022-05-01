import DOMPurify from "dompurify"

/**
 * Sanitizes and displays an article's body
 * 
 * @param {String} body - The article's HTML body 
 * @returns Displays the body of an article
 */
const ArticleBody = ({ body }) => {
	return <div className="p-4 font-serif text-gray-dark break-all text-lg" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize ( body ) }}></div>
}

export default ArticleBody;