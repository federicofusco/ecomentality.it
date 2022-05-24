import { fetchAllVideos } from "./../../lib/video"
import { fetchUser } from "./../../lib/auth.admin"
import Head from "next/head"
import VideoList from "./../../components/lists/VideoList"
import Navbar from "./../../components/nav/navbars/Navbar"
import Footer from "./../../components/nav/Footer"

const Videos = ({ videos }) => {
	return (
		<div className="bg-all-green">
			<Head>
				<title>Video - GEM</title>
				<meta name="language" content="EN" />
				<meta name="robots" content="all" />
				<meta name="description" content="A list of the videos" />
			</Head>

	 		<Navbar />
			
	 		<div className="mt-16 min-h-screen">
	 			<VideoList data={ videos } />
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
	await fetchAllVideos ()
		.then ( videos => response.props.videos = videos.data.videos )
		.catch ( error => {
			console.error ( error );
			response.notFound = true
		});

	// Fetches the author for each video
	if ( !response.notFound ) {

		var cached_authors = {};

		for ( var x = 0; x < response.props.videos.length; x++ ) {

			const author = response.props.videos[x].author;

			// Checks if the author has already bbeen fetched
			if ( cached_authors[author] ) {
				response.props.videos[x] = {
					video: response.props.videos[x],
					author: cached_authors[author]
				}
				
				continue;
			}

			// Fetches the user
			await fetchUser ( author )
				.then (( user ) => {

					// Updates the list of fetched aauthors
					cached_authors[author] = user.data.user;

					response.props.videos[x] = {
						video: response.props.videos[x],
						author: user.data.user
					}
				})
				.catch (( error ) => { 
					console.error ( error );
					response.notFound = true 
				});
		}
	}

	return response;
}

export default Videos