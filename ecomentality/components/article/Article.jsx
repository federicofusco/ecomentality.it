import useArticle from "../../lib/article"
import { useEffect, useState } from "react"
import ArticleTitle from "./ArticleTitle"
import ArticleBody from "./ArticleBody"
import ArticleNavbar from "../nav/ArticleNavbar"
import ArticleSidebar from "../nav/ArticleSidebar"

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
				
				// An error occurred while fetching the article
				console.log(error);
			});
	}, []);

	return (
		<div className="w-screen h-screen overflow-x-hidden">
			
			<ArticleNavbar authorId={ !loading ? article.author : null } />
			
			<div className="flex">
				<ArticleSidebar id={ id } />
				<div className="mx-auto max-w-2xl">
					{ !loading && <ArticleTitle article={ article } /> }
					{ !loading && <ArticleBody body={ article.body } /> }
				</div>
			</div>
		</div>
	)

} 

export default Article;