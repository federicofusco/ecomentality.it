import { useRouter } from "next/router"
import Article from "../../../components/article/Article"
import { isUUID } from "./../../../lib/auth.admin"

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
	if ( !isUUID ( context.params.id ) ) {

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