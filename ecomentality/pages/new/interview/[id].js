import { authRedirect, isUUID } from "./../../../lib/auth.admin"
import { v4 as uuid } from "uuid"
import { fetchVideo } from "./../../../lib/video"
import Head from "next/head"
import VideoEditor from "./../../../components/editor/VideoEditor"

const NewVideo = ({ video }) => {
	return (
		<>
			<Head>
				<title>{ ( video && video.title ) || "New video" } - GEM </title>
				<meta name="language" content="EN" />
				<meta name="robots" content="none" />
				<meta name="description" content="The article creation page" />
			</Head>
			<VideoEditor title={ video && video.title } link={ video && video.link } body={ video && video.body } id={ video.id } />
		</>
	)
}

export default NewVideo;

export const getServerSideProps = async ({ req, res, params, resolvedUrl }) => {

	// Verifies that the video UUID is valid
	if ( !isUUID ( params.id ) ) {

		// Redirects the user to a URL with a valid UUID
		return {
			redirect: {
				destination: `/new/interview/${ uuid () }`,
				permanent: false
			}
		};
	}

	let response = {
		props: {},
		notFound: false
	}

	// Verifies that the user is logged in
	await authRedirect ({ req, res, resolvedUrl })
		.then ( async ({ user }) => {

			// Fetches the video
			await fetchVideo ( params.id, true )
				.then (( video ) => {

					if ( user.uid !== video.data.video.author ) response.notFound = true;

					response.props = {
						video: video.data.video
					}
				})
				.catch (( error ) => {
					response.props = {
						video: {
							id: params.id
						}
					}
				});
		})
		.catch (( redirect ) => {

			// Redirects the user
			response = redirect;
		});

	return response;
}