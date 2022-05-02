import { useRouter } from "next/router"
import { authRedirect, isUUID } from "./../../../lib/auth.admin"
import { v4 as uuid } from "uuid"
import ArticleEditor from "../../../components/editor/ArticleEditor"

const NewArticle = () => {
	const router = useRouter ();
	const articleId = router.query.id;

	return (
		<div>
			<ArticleEditor articleId={ articleId } />
		</div>
	)
}

export default NewArticle;

export const getServerSideProps = ({ req, params, resolvedUrl }) => {

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

	return authRedirect ({ req, resolvedUrl }); 
}