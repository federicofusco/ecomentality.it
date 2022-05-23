import { fetchAllArts } from "./../../lib/art"
// import { fetchUser } from "./../../lib/auth.admin"
import Head from "next/head"
import ArtsList from "../../components/arts/ArtsList"
// import ArticleList from "./../../components/lists/ArticleList"
import Navbar from "./../../components/nav/navbars/Navbar"
import Footer from "./../../components/nav/Footer"
import Image from "next/image"
const Arts = ({ arts }) => {
	return (
		<div className="bg-all-green">
			<Head>
				<title>Arts - GEM</title>
				<meta name="language" content="EN" />
				<meta name="robots" content="all" />
				<meta name="description" content="A list of arts" />
			</Head>

			<Navbar />
			<ArtsList arts={arts}/>
			
            
			<Footer />

		</div>
	)
}

export const getStaticProps = async () => {

	let response = {
		props: {}
	}

	// Fetches all the relevant articles
	await fetchAllArts ()
		.then ( arts => response.props.arts = arts.data.arts )
		.catch ( error => {
			console.error ( error );
			response.notFound = true
		});
	
	return response;
}

export default Arts