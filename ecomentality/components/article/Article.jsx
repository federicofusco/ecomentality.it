import useArticle from "../../lib/article"
import { useEffect, useState } from "react"
import ArticleTitle from "./ArticleTitle"
import ArticleBody from "./ArticleBody"

const Article = ({ id }) => {

	const { fetchArticle } = useArticle ();
	const [article, setArticle] = useState ( null );
	const [loading, setLoading] = useState ( true );

	// Fetches the article data
	useEffect (() => {
		fetchArticle ( id )
			.then ( ( data ) => {
				setArticle ( data.data.article );
				setLoading ( false );
			})
			.catch ( ( error ) => {
				console.log(error);
				// An error occurred while fetching the article

			});
	}, []);

	return (
		<div>
			{ !loading && <ArticleTitle title={ article.title } author={ article.author } /> }
			{ !loading && <ArticleBody body={ article.body } /> }
		</div>
	)

} 

export default Article;