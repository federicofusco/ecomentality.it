import Head from "next/head"
import HomeNavbar from "../components/nav/HomeNavbar"
import HeroTitle from "../components/home/HeroTitle"
import InfoSection from "./../components/home/InfoSection"
import ArticleList from "../components/home/ArticleList"
import EventList from "./../components/home/EventList"
import Footer from "./../components/nav/Footer"

import { fetchAllArticles } from "./../lib/article"

const Home = ({ articles }) => {

	return (
		<div className="bg-all-green">
			<Head>
				<title>Home - GEM</title>
				<meta name="language" content="EN" />
				<meta name="robots" content="index, follow" />
				<meta name="description" content="The GEM homepage" />

				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
				<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700;800;900&display=swap" rel="stylesheet" /> 
			</Head>

			<HomeNavbar />

			<div className="pt-6">
				<HeroTitle title="We work for the planet" redirect="/404" subtitle="Lorem ipsum is just dummy text used in demos to give examples without any content" />
			</div>

			<InfoSection rightToLeft={ true } title="Why GEM?" />

			<ArticleList articles={ articles } />

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
	let articles = [];
	await fetchAllArticles ( 3 )
		.then (( result ) => response.props.articles = result.data.articles )
		.catch (( error ) => response.notFound = true ); // CHANGE THIS!!!

	return response;
}

export default Home;