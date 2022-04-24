import { useRouter } from "next/router"

// TODO: Add route authentication

const EditArticle = () => {
	const router = useRouter ();
	const articleId = router.query.id;

	return (
		<h1>You're editing article: { articleId }!</h1>
	)
}

export default EditArticle;