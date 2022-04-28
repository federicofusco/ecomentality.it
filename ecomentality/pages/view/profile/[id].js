import { useRouter } from "next/router"

// TODO: Add SSR for SEO

const ViewProfile = () => {
	const router = useRouter ();
	const articleId = router.query.id;

	return (
		<h1>You&apos;re viewing profile: { articleId }!</h1>
	)
}

export default ViewProfile;