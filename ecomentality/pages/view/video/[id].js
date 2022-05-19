import { fetchAllVideoIds, fetchVideo } from "../../../lib/video"
import { fetchUser } from "./../../../lib/auth.admin"
import { useRouter } from "next/router"
import Head from "next/head" 
import Video from "./../../../components/video/Video"

const ViewVideo = ({ video, author }) => {

	const { isFallback } = useRouter ();

	if ( isFallback ) {
		return <p>Loading...</p>
	}

	return (
		<>
			<Head>
				<title>{ video.title } - GEM</title>
				<meta name="language" content="EN" />
				<meta name="robots" content="all" />
				<meta name="author" content={ author.displayName } />
				<meta name="description" content={`${ video.title }, published by ${ author.displayName }`} />
				<meta name="revised" content={ video.timestamp } /> 
			</Head>
			<Video video={ video } author={ author } />
		</>
	)
}

export const getStaticPaths = async () => {

	let response = {
		paths: [],
		fallback: true
	};

	// Fetches all the article ids
	await fetchAllVideoIds ()
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

	// Fetches the video
	await fetchVideo ( params.id )
		.then ( async ( video ) => {

			// Fetches the user
			await fetchUser ( video.data.video.author )
				.then (( user ) => {
					response.props = {
						video: video.data.video,
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

export default ViewVideo;