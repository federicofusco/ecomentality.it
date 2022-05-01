import { useRouter } from "next/router"
import Article from "../../../components/article/Article"

const ViewArticle = () => {
	const router = useRouter ();
	const articleId = router.query.id;

	return (
		<div>
			<Article id={ articleId } />
		</div>
	)
}

export const getServerSideProps = ( context ) => {

	// Verifies that the article UUID is valid
	if ( !context.params.id.match ( new RegExp ( /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i ) ) ) {

		// The article doesn't exist
		return {
			redirect: {
				destination: "/unknown-article",
				permanent: false
			}
		};
	}

	return {
		props: {}
	}
}

export default ViewArticle;