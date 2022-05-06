import ArticleLink from "./ArticleLink"

const ArticleList = ({ articles, author }) => {
	return <>
		{ articles?.map ( article => (
			<ArticleLink key={ article.id } article={ article } author={ author } /> 
		))}
	</>
}

export default ArticleList;