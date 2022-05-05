import DOMPurify from "isomorphic-dompurify"

/**
 * Displays the article's body
 * 
 * @param {Object} article - The article
 * @returns An article body
 */
const ArticleBody = ({ article }) => {
	return <div className="font-serif px-8" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize ( article.body ) }}></div>
}

export default ArticleBody;