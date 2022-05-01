import { useRouter } from "next/router"
import Article from "../../../components/article/Article"
import { isUUID } from "./../../../lib/auth.admin"
import { firestore } from "../../../lib/firebase"
import { getDoc, doc } from "firebase/firestore"

const ViewArticle = ({ article }) => {
	const router = useRouter ();

	return (
		<div>
			<Article article={ article } />
		</div>
	)
}

export const getServerSideProps = async ( context ) => {

	// Verifies that the article UUID is valid
	if ( !isUUID ( context.params.id ) ) {

		// The article doesn't exist
		return {
			redirect: {
				destination: "/error/404",
				permanent: false
			}
		};
	}

	try {

		// Fetches the article
		const articleData = await getDoc ( doc ( firestore, "articles", context.params.id ) );

		// Checks if the article exists
		if ( !articleData.exists () ) {
			
			// The article doesn't exist
			return {
				notFound: true
			}
		} else {

			// Found the article
			const { title, body, author, likeCount } = articleData.data ();
			return {
				props: {
					article: {
						title: title,
						body: body,
						author: author,
						likeCount: likeCount,
						id: context.params.id
					}
				}
			}
		}

	} catch ( error ) {

		console.error ( error );

		return {
			notFound: true
		}
	}

}

export default ViewArticle;