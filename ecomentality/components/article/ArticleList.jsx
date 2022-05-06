import ArticleLink from "./ArticleLink"

/**
 * Displays a list of links to articles
 * 
 * @param {Array} articles - An array of articles
 * @param {Object} author - The article's author's displayName
 * @returns A list of <ArticleLink />s
 */
const ArticleList = ({ articles, author }) => {
	return <>
		{ articles && articles.map ( article => (
			<ArticleLink key={ article.id } timestamp={ article.timestamp } title={ article.title } id={ article.id } author={ author.displayName } /> 
		))}
	</>
}

export default ArticleList;