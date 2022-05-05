import { authRedirect, isUUID } from "./../../../lib/auth.admin"
import { firestore } from "./../../../lib/firebase"
import { getDoc, doc } from "firebase/firestore"
import { v4 as uuid } from "uuid"
import ArticleEditor from "../../../components/editor/ArticleEditor"
import { deserializeEditor } from "../../../lib/editor"

const NewArticle = ({ article }) => {
	return (
		<>
			<ArticleEditor article={ article } />
		</>
	)
}

export default NewArticle;

export const getServerSideProps = async ({ req, res, params, resolvedUrl }) => {

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

	let response;

	await authRedirect ({ req, res, resolvedUrl })
		.then ( async () => {
			try {

				// Fetches the article
				const articleData = await getDoc ( doc ( firestore, "articles", params.id ) );
		
				// Checks if the article exists
				if ( !articleData.exists () ) {

					// The article doesn't exist, creates a new one
					response = {
						props: {
							article: {
								id: params.id
							}
						}
					};
				} else {
		
					// Found the article
					const { title, body, author, likeCount } = articleData.data ();
					response = {
						props: {
							article: {
								title: title,
								body: await deserializeEditor ( body ),
								author: author,
								likeCount: likeCount || 0,
								id: params.id
							}
						}
					}
				}
		
			} catch ( error ) {
				
				// Something went wrong
				return;
			}
		})
		.catch (( redirect ) => {

			// Redirects the user
			response = redirect;
		});

	return response || {
		notFound: true
	}
}