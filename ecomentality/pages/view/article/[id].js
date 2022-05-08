import Article from "../../../components/article/Article"
import { isUUID } from "./../../../lib/auth"
import { fetchArticle } from "../../../lib/article"
import { fetchUser } from "../../../lib/auth.admin"
import Head from "next/head"


const ViewArticle = ({ article, author }) => {
	return (
		<>
			<Head>
				<title>{ article.title } - GEM</title>
				<meta name="language" content="EN" />
				<meta name="robots" content="index,follow" />
				<meta name="author" content={ author.displayName } />
			</Head>
			<Article article={ article } author={ author } />
		</>
	)
}

export const getServerSideProps = async ({ params }) => {

	// Verifies that the article UUID is valid
	if ( !isUUID ( params.id ) ) {

		// The article doesn't exist
		return {
			notFound: true
		};
	}

	let response = {
		props: {},
		notFound: false
	}

	// Fetches the article
	await fetchArticle ( params.id )
		.then ( async ( article ) => {

			// Fetches the user
			await fetchUser ( article.data.article.author )
				.then (( user ) => {
					response.props = {
						article: article.data.article,
						author: user.data.user
					}
				})
				.catch (( error ) => response.notFound = true );
		})
		.catch (( error ) => response.notFound = true );

	return response;

}

export default ViewArticle;