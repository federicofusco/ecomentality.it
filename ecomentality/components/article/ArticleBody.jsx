import DOMPurify from "isomorphic-dompurify"

/**
 * Displays the article's body
 * 
 * @param {String} body - The article's body
 * @returns An article body
 */
const ArticleBody = ({ body }) => {
	return <div className="font-serif break-word px-8 pb-20 sm:pb-14" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize ( body ) }}></div>
}

export default ArticleBody;