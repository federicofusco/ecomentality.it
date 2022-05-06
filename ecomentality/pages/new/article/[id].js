import { authRedirect } from "./../../../lib/auth.admin"
import { isUUID } from "./../../../lib/auth"
import { v4 as uuid } from "uuid"
import ArticleEditor from "../../../components/editor/ArticleEditor"
import { fetchArticle } from "../../../lib/article"

const NewArticle = ({ article }) => {
	return (
		<>
			<ArticleEditor article={ article } />
		</>
	)
}

export default NewArticle;

export const getServerSideProps = async ({ req, res, params, resolvedUrl }) => {

	// Verifies that the article UUID is valid
	if ( !isUUID ( params.id ) ) {

		// Redirects the user to a URL with a valid UUID
		return {
			redirect: {
				destination: `/new/article/${ uuid () }`,
				permanent: false
			}
		};
	}

	let response = {
		notFound: true
	}

	await authRedirect ({ req, res, resolvedUrl })
		.then ( async () => {
			await fetchArticle ( params.id, true )
				.then (( result ) => response = { props: result.data })
				.catch (( error ) => {
					response = error.data?.notFound ? {
						props: {
							article: {
								id: params.id
							}
						}
					} : error.data;
				});
		})
		.catch (( redirect ) => {

			// Redirects the user
			response = redirect;
		});

	return response;
}