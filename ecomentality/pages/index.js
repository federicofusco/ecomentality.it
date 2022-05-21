import Head from "next/head"
import Navbar from "./../components/nav/navbars/Navbar"
import HeroTitle from "./../components/home/HeroTitle"
import InfoSection from "./../components/home/InfoSection"
import ArticleList from "./../components/lists/ArticleList"
import EventList from "./../components/home/EventList"
import Footer from "./../components/nav/Footer"
import { fetchUser } from "./../lib/auth.admin"

import { fetchAllArticles } from "./../lib/article"

const Home = ({ articles }) => {
	return (
		<div className="bg-all-green">
			<Head>
				<title>Home - GEM</title>
				<meta name="language" content="EN" />
				<meta name="robots" content="all" />
				<meta name="description" content="The GEM homepage" />
			</Head>

			<Navbar />

			<div className="pt-6">
				<HeroTitle title="We work for the planet" redirect="/404" subtitle="Lorem ipsum is just dummy text used in demos to give examples without any content" />
			</div>

			<InfoSection rightToLeft={ true } title="Why GEM?" />

			<ArticleList data={ articles } />

			<EventList />

			<Footer />
		</div>
	)
}

export const getStaticProps = async () => {

	let response = {
		props: {},
		notFound: false,
		revalidate: 900
	}

	// Fetches all of the authors articles
	await fetchAllArticles ( 3 )
		.then (( result ) => response.props.articles = result.data.articles )
		.catch (( error ) => response.notFound = true ); // CHANGE THIS!!!

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

	// console.log(response.props.articles);

	return response;
}

export default Home;