import useArticle from "../../lib/article"
import { useEffect, useState } from "react"
import ArticleTitle from "./ArticleTitle"
import ArticleBody from "./ArticleBody"

/**
 * Displays an article
 * 
 * @param {String} id - The article's UUID
 * @returns Displays an article
 */
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
		<div className="w-screen h-screen">
			<div className="mx-auto max-w-2xl">
				{ !loading && <ArticleTitle title={ article.title } author={ article.author } /> }
				{ !loading && <ArticleBody body={ article.body } /> }
			</div>
		</div>
	)

} 

export default Article;