import { fetchAllArticles } from "./../../lib/article"
import Head from "next/head"
import ArticleList from "./../../components/home/ArticleList"
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
			
			<div className="mt-16">
				<ArticleList articles={ articles } />
			</div>

			<Footer />

		</div>
	)
}

export const getStaticProps = async () => {

	let response = {
		props: {}
	}

	// Fetches all the relevant articles
	await fetchAllArticles ()
		.then ( articles => response.props.articles = articles.data.articles )
		.catch ( error => {
			console.error ( error );
			response.notFound = true
		});

	return response;
}

export default Articles