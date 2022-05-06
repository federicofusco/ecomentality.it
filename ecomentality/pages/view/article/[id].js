import Article from "../../../components/article/Article"
import { isUUID } from "./../../../lib/auth"
import { fetchArticle } from "../../../lib/article"
import { fetchUser } from "../../../lib/auth.admin"


const ViewArticle = ({ article, author }) => {
	return (
		<div>
			<Article article={ article } author={ author } />
		</div>
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