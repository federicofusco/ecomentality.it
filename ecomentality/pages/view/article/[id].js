import Article from "../../../components/article/Article"
import { isUUID } from "./../../../lib/auth"
import { fetchArticle } from "../../../lib/article"


const ViewArticle = ({ article }) => {
	return (
		<div>
			<Article article={ article } />
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
		notFound: true
	}

	await fetchArticle ( params.id )
		.then (( result ) => response = { props: result.data })
		.catch (( error ) => response = error.data );

	return response;

}

export default ViewArticle;