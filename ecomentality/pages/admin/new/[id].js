import { useRouter } from "next/router"
import { authRedirect } from "../../../lib/auth.admin.lib"
import { v4 as uuid } from "uuid"
import ArticleForm from "../../../components/forms/ArticleForm"

const NewArticle = () => {
	const router = useRouter ();
	const articleId = router.query.id;

	return (
		<div>
			<h1>You&apos;re editing article: { articleId }!</h1>
			<ArticleForm id={ articleId} />
		</div>
	)
}

export default NewArticle;

export const getServerSideProps = ( context ) => {

	// Verifies that the article UUID is valid
	if ( !context.params.id.match ( new RegExp ( /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i ) ) ) {

		// Redirects the user to a URL with a valid UUID
		return {
			redirect: {
				destination: `/admin/new/${ uuid () }`,
				permanent: false
			}
		};
	}

	return authRedirect ( context ); 
}