import { useRouter } from "next/router"

// TODO: Add SSR for SEO

const ViewArticle = () => {
	const router = useRouter ();
	const articleId = router.query.id;

	return (
		<h1>You're viewing article: { articleId }!</h1>
	)
}

export default ViewArticle;