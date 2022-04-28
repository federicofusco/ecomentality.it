import { useRouter } from "next/router"
import { authRedirect } from "./../../../lib/auth.admin.lib"

// TODO: Add route authentication

// export const getServerSideProps = authRedirect ( context );

const EditArticle = () => {
	const router = useRouter ();
	const articleId = router.query.id;

	return (
		<h1>You&apos;re editing article: { articleId }!</h1>
	)
}

export default EditArticle;

export const getServerSideProps = ( context ) => {
	return authRedirect ( context ); 
}