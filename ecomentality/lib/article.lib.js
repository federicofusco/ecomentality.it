import { firestore } from "./firebase.lib"
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import useAuth from "./auth.lib"

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
	 * Fetches an article based on its ID
	 * 
	 * @param {String} id - The atricle's UUID
	 * @returns A promise
	 */
	const fetchArticle = async ( id ) => {
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

				// Fetches the article
				const articleData = await getDoc ( doc ( firestore, "articles", id ) );

				// Checks if the article exists
				if ( !articleData.exists () ) {
					reject ({
						status: "ERROR",
						message: "This article doesn't exists!",
						data: {
							error: {
								message: `The article ${ id } doesn't exist!`,
								code: "article/no-article"
							}
						}
					});
				} else {

					// Found the article
					resolve ({
						status: "OK",
						message: "Found article!",
						data: {
							article: articleData.data ()
						}
					});
				}

			} catch ( error ) {

				console.error ( error );

				reject ({
					status: "ERROR",
					message: "Something went wrong while fetching the article!",
					data: {
						error: error
					}
				});
			}

		});
	}

	return {
		publishArticle,
		fetchArticle
	}
}

export default useArticle;