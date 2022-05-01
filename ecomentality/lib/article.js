import { firestore } from "./firebase"
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import useAuth from "./auth"

const useArticle = () => {

	const { isLoggedIn, user } = useAuth ();

	/**
	 * Publishes a new article
	 * 
	 * @param {String} id - The article's UUID
	 * @param {String} title - The article's title
	 * @param {String} body - The article's bodddy
	 * @returns A new promise
	 */
	const publishArticle = async ( id, title, body ) => {
		return new Promise ( async ( resolve, reject ) => {

			// Checks if the user is signed in
			if ( !isLoggedIn () ) {
				reject ({
					status: "ERROR",
					message: "You need to log in to publish articles!",
					data: {
						error: {
							message: "User unauthenticated",
							code: "article/not-authenticated"
						}
					}
				});
			}

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
				
				await setDoc ( doc ( firestore, "articles", id ), {
					title: title,
					body: body,
					timestamp: serverTimestamp (),
					author: user.uid
				});

				resolve ({
					status: "OK",
					message: "Published article!",
					data: {}
				});

			} catch ( error ) {

				console.error ( error );

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

	/**
	 * Increments the like count of an article
	 * 
	 * @param {String} id - The article's UUID
	 * @returns A promise
	 */
	const likeArticle = async ( id ) => {
		return new Promise ( ( resolve, reject ) => {

			// Sends a request to the like API
			fetch ( `${ process.env.NEXT_PUBLIC_URL }/api/like/${ id }` )
				.then (( response ) => response.json () )
				.then (( data ) => {

					if ( data.status === 200 ) {
						resolve ();
						return;
					}

					reject ( data.message );
				});
		});	
	}

	const dislikeArticle = async ( id ) => {
		return new Promise ( ( resolve, reject ) => {

			// Sends a request to the dislike API
			fetch ( `${ process.env.NEXT_PUBLIC_URL }/api/dislike/${ id }` )
				.then (( response ) => response.json () ) 
				.then (( data ) => {

					if ( data.status === 200 ) {
						resolve ();
						return;
					}

					reject ( data.message );
				});
		})
	}

	return {
		publishArticle,
		likeArticle,
		dislikeArticle
	}
}

export default useArticle;