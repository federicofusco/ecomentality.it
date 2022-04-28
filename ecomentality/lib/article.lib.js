import { firestore } from "./firebase.lib"
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import useAuth from "./auth.lib"

const useArticle = () => {

	const { isLoggedIn } = useAuth ();
	const user = isLoggedIn ();

	const publishArticle = async ( id, title, body ) => {
		return new Promise ( async ( resolve, reject ) => {

			// Checks if the article ID is valid
			if ( !id.match ( new RegExp ( /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i ) ) ) {
				reject ({
					status: "ERROR",
					message: "The article ID is invalid!",
					data: {
						error: {
							message: `Invalid article ID (${ id })!`,
							code: "article/invalid-id"
						}
					}
				});
			}

			try {
				
				const article = await setDoc ( doc ( firestore, "users", user.uid, "articles", id ), {
					title: title,
					body: body,
					timestamp: serverTimestamp ()
				});

				resolve ({
					status: "OK",
					message: "Published article!",
					data: {
						id: article.id,
						title: title
					}
				});

			} catch ( error ) {
				reject ({
					status: "ERROR",
					message: "Something went wrong while publishing!",
					data: {
						error: error
					}
				});
			}

		});
	} 

	return {
		publishArticle
	}
}

export default useArticle;