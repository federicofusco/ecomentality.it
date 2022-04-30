import DOMPurify from "dompurify"

/**
 * Sanitizes and displays an article's body
 * 
 * @param {String} body - The article's HTML body 
 * @returns Displays the body of an article
 */
const ArticleBody = ({ body }) => {
	return <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize ( body ) }}></div>
}

export default ArticleBody;