import { useRouter } from "next/router"
import { authRedirect } from "../../../lib/auth.admin"
import { v4 as uuid } from "uuid"
import VideoForm from "../../../components/forms/VideoForm"

const NewVideo = () => {
	const router = useRouter ();
	const videoId = router.query.id;

	return (
		<div>
            <VideoForm id={videoId}/>
			{/* <ArticleEditor articleId={ articleId } /> */}
		</div>
	)
}

export default NewVideo;

export const getServerSideProps = ( context ) => {

	// Verifies that the article UUID is valid
	if ( !context.params.id.match ( new RegExp ( /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i ) ) ) {

		// Redirects the user to a URL with a valid UUID
		return {
			redirect: {
				destination: `/new/video/${ uuid () }`,
				permanent: false
			}
		};
	}

	return authRedirect ( context ); 
}