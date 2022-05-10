import Article from "../../../components/article/Article"
import ArticleFallback from "./../../../components/fallbacks/article/ArticleFallback"
import { fetchArticle, fetchArticleIds } from "../../../lib/article"
import { fetchUser } from "../../../lib/auth.admin"
import Head from "next/head"
import { useRouter } from "next/router"

const ViewArticle = ({ article, author }) => {

	const router = useRouter ();

	// Displays fallback page while it's rendered
	// This will not be displayed to crawlers
	if ( router.isFallback ) return <ArticleFallback />;

	return (
		<>
			<Head>
				<title>{ article.title } - GEM</title>
				<meta name="language" content="EN" />
				<meta name="robots" content="index, follow" />
				<meta name="author" content={ author.displayName } />
				<meta name="description" content={`${ article.title }, written by ${ author.displayName }`} />
				<meta name="revised" content={ article.timestamp } /> 
			</Head>
			<Article article={ article } author={ author } />
		</>
	)
}

export const getStaticPaths = async () => {

	let response = {
		paths: [],
		fallback: true
	};

	// Fetches all the article ids
	await fetchArticleIds ()
		.then (( ids ) => {

			// Forms the paths
			var paths = [];
			ids.data.ids.forEach ( id => paths.push ({
				params: {
					id: id 
				}
			}) );

			response = {
				paths,
				fallback: true
			};

		})
		.catch (( error ) => {
			throw Error ( "Failed to form paths!" ) // CHANGE THIS!!!
		});

	return response;
}

export const getStaticProps = async ({ params }) => {

	let response = {
		props: {},
		notFound: false,
		revalidate: 900 // Revalidate every 15 minutes
	}

	// Fetches the article
	await fetchArticle ( params.id )
		.then ( async ( article ) => {

			// Fetches the user
			await fetchUser ( article.data.article.author )
				.then (( user ) => {
					response.props = {
						article: article.data.article,
						author: user.data.user
					}
				})
				.catch (( error ) => {
					console.error ( error );
					response.notFound = true 
				});
		})
		.catch (( error ) => {
			console.error ( error );
			response.notFound = true 
		});

	return response;

}

export default ViewArticle;