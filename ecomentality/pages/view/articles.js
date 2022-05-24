import { fetchAllArticles } from "./../../lib/article"
import { fetchUser } from "./../../lib/auth.admin"
import Head from "next/head"
import ArticleList from "./../../components/lists/ArticleList"
import Navbar from "./../../components/nav/navbars/Navbar"
import Footer from "./../../components/nav/Footer"

const Articles = ({ articles }) => {
	return (
		<div className="bg-all-green">
			<Head>
				<title>Articles - GEM</title>
				<meta name="language" content="EN" />
				<meta name="robots" content="all" />
				<meta name="description" content="A list of articles" />
			</Head>

			<Navbar />
			
			<div className="mt-16 min-h-screen">
				<ArticleList data={ articles } />
			</div>

			<Footer />

		</div>
	)
}

export const getStaticProps = async () => {

	let response = {
		props: {},
		revalidate: 60
	}

	// Fetches all the relevant articles
	await fetchAllArticles ()
		.then ( articles => response.props.articles = articles.data.articles )
		.catch ( error => {
			console.error ( error );
			response.notFound = true
		});
	
	// Fetches the author for each article
	if ( !response.notFound ) {

		var cached_authors = {};

		for ( var x = 0; x < response.props.articles.length; x++ ) {

			const author = response.props.articles[x].author;

			// Checks if the author has already been fetched
			if ( cached_authors[author] ) {
				response.props.articles[x] = {
					article: response.props.articles[x],
					author: cached_authors[author]
				}

				continue;
			}

			// Fetches the author
			await fetchUser ( author )
				.then (( user ) => {

					// Updates the cached authors
					cached_authors[author] = user.data.user;

					// Updates the article
					response.props.articles[x] = {
						article: response.props.articles[x],
						author: user.data.user
					}
				})
				.catch (( error ) => {

					// Something went wrong
					console.error ( error );

					response.notFound = true;
				});
		}
	}

	return response;
}

export default Articles