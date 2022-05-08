import { authRedirect } from "./../../../lib/auth.admin"
import { isUUID } from "./../../../lib/auth"
import { v4 as uuid } from "uuid"
import ArticleEditor from "../../../components/editor/ArticleEditor"
import { fetchArticle } from "../../../lib/article"

const NewArticle = ({ article }) => {
	return (
		<>
			<ArticleEditor title={ article.title } body={ article.body } id={ article.id } />
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
		props: {},
		notFound: false
	}

	// Verifies that the user is logged in
	await authRedirect ({ req, res, resolvedUrl })
		.then ( async () => {

			// Fetches the article
			await fetchArticle ( params.id, true )
				.then (( article ) => {
					response.props = {
						article: article.data.article
					}
				})
				.catch (( error ) => {
					response.props = {
						article: {
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