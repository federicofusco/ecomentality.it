import { authRedirect, isUUID } from "./../../../lib/auth.admin"
import { v4 as uuid } from "uuid"
import { fetchVideo } from "./../../../lib/video"

const NewVideo = ({ video }) => {
	return null;
}

export default NewVideo;

export const getServerSideProps = async ({ req, res, params, resolvedUrl }) => {

	// Verifies that the video UUID is valid
	if ( !isUUID ( params.id ) ) {

		// Redirects the user to a URL with a valid UUID
		return {
			redirect: {
				destination: `/new/video/${ uuid () }`,
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
		.then ( async () => {

			// Fetches the video
			await fetchVideo ( params.id, true )
				.then (( video ) => {
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