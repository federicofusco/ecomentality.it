// TODO (IMPORTANT): FIX XSS VULNERABILITY

const ArticleBody = ({ body }) => {
	return <div dangerouslySetInnerHTML={{ __html: body }}></div>
}

export default ArticleBody;