import { authRedirect, isUUID } from "./../../../lib/auth.admin"
import { v4 as uuid } from "uuid"
import ArticleEditor from "./../../../components/editor/ArticleEditor"
import { fetchArticle } from "./../../../lib/article"
import Head from "next/head"

const NewArticle = ({ article }) => {
	return (
		<>
			<Head>
				<title>{ ( article && article.title ) || "New article" } - GEM </title>
				<meta name="language" content="EN" />
				<meta name="robots" content="none" />
				<meta name="description" content="The article creation page" />
			</Head>
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
		.then ( async ({ user }) => {

			// Fetches the article
			await fetchArticle ( params.id, true )
				.then (( article ) => {

					// Verifies that the request comes from the author
					if ( user.uid !== article.data.article.author ) response.notFound = true;

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