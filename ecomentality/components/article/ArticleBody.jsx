import DOMPurify from "isomorphic-dompurify"

/**
 * Displays the article's body
 * 
 * @param {String} body - The article's body
 * @returns An article body
 */
const ArticleBody = ({ body }) => {
<<<<<<< Updated upstream
	return <div className="font-serif break-all px-8" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize ( body ) }}></div>
=======
	return <div className="font-serif break-word px-8 pt-8" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize ( body ) }}></div>
>>>>>>> Stashed changes
}

export default ArticleBody;