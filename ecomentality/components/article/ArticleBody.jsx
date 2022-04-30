import DOMPurify from "dompurify"

const ArticleBody = ({ body }) => {
	return <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize ( body ) }}></div>
}

export default ArticleBody;