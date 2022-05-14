import ArticleLink from "./ArticleLink"

/**
 * Displays a list of links to articles
 * 
 * @param {Array} articles - An array of articles
 * @param {Object} author - The article's author's displayName
 * @param {?Boolean} isFallback - Whether or not to display a fallback list (default: false)
 * @returns A list of <ArticleLink />s
 */
const ArticleList = ({ articles, author, isFallback = false }) => {

	if ( isFallback ) return null;

	return <>
		{ articles && articles.map ( article => (
			<ArticleLink key={ article.id } timestamp={ article.timestamp } title={ article.title } id={ article.id } author={ author.displayName } /> 
		))}
	</>
}

export default ArticleList;