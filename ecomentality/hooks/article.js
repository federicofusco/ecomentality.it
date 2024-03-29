/**
 * The GEM Article Hook
 */

import { firestore } from "./../lib/firebase"
import { doc, setDoc, getDoc, updateDoc, serverTimestamp, onSnapshot } from "firebase/firestore";
import useAuth from "./auth"

/**
 * A hook used to interact with articles from the client
 * 
 * @returns {Object} - The following functions:
 * 					 * publishArticle
 * 					 * likeArticle
 * 					 * dislikeArticle 
 * 					 * fetchLikeCount
 * 					 * createLikeListener
 */
const useArticle = () => {

	const { isUUID, isLoggedIn, user } = useAuth ();

	/**
	 * Publishes a new article
	 * 
	 * @param {String} id - The article's ID
	 * @param {String} title - The article's title
	 * @param {String} body - The article's body
	 * @async 
	 * @returns {Promise} A new promise
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
			if ( !isUUID ( id ) ) {
				reject ({
					status: "ERROR",
					message: "Invalid article ID!",
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
					title,
					body,
					timestamp: serverTimestamp (),
					author: user.uid,
					likeCount: 0 // TODO: FIX THIS!!!
				});

				// Clears the local copy
				if ( typeof window === "undefined" ) {
					window.localStorage.removeItem ( id );
				}

				resolve ({
					status: "OK",
					message: "Published article!",
					data: {}
				});

			} catch ( error ) {
				console.error(error);
				reject ({
					status: "ERROR",
					message: "Something went wrong! Try again",
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
	 * @async
	 * @returns {Promise} A promise
	 */
	const likeArticle = async ( id ) => {
		return new Promise ( async ( resolve, reject ) => {

			// Gets the current like count
			const articleRef = doc ( firestore, "articles", id );
			const articleData = await getDoc ( articleRef );

			// Checks if the article exists
			if ( !articleData.exists () ) {
				reject ({
					status: "ERROR",
					message: "Whoops something went wrong!",
					data: {
						error: {
							message: "Article doesn't exist!",
							code: "article/like-failed"
						}
					}
				});
				return;
			} 

			const article = articleData.data ();

			// Updates the like count
			await updateDoc ( articleRef, {
				likeCount: ( article.likeCount || 0 ) + 1
			});

			resolve ({
				status: "OK",
				message: "Liked article!",
				data: {
					likeCount: article.likeCount + 1
				}
			});
		});	
	}

	/**
	 * Decrements the like count of an article
	 * 
	 * @param {String} id - The article's ID
	 * @async
	 * @returns {Promise} A promise
	 */
	const dislikeArticle = async ( id ) => {
		return new Promise ( async ( resolve, reject ) => {

			// Gets the current like count
			const articleRef = doc ( firestore, "articles", id );
			const articleData = await getDoc ( articleRef );

			// Checks if the article exists
			if ( !articleData.exists () ) {
				reject ({
					status: "ERROR",
					message: "Whoops something went wrong!",
					data: {
						error: {
							message: "Article doesn't exist!",
							code: "article/dislike-failed"
						}
					}
				});
				return;
			} 

			const article = articleData.data ();

			// Updates the like count
			await updateDoc ( articleRef, {
				likeCount: ( article.likeCount || 1 ) - 1
			});

			resolve ({
				status: "OK",
				message: "Disliked article!",
				data: {
					likeCount: article.likeCount - 1
				}
			});
		})
	}

	/**
	 * Fetches the article's current like count
	 * 
	 * @param {String} id - The article's UUID
	 * @async
	 * @returns {Promise} A promise
	 */
	const fetchLikeCount = async ( id ) => {
		return new Promise ( async ( resolve, reject ) => {

			// Checks if the article ID is valid
			if ( !isUUID ( id ) ) {
				reject ({
					status: "ERROR",
					message: "Invalid article ID!",
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

					// The article doesn't exist
					reject ({
						status: "ERROR",
						message: "The error doesn't exist!",
						data: {}
					});
				} else {

					// Found the article
					const { likeCount } = articleData.data ();

					resolve ({
						status: "OK",
						message: "Fetched like count!",
						data: {
							likeCount
						}
					});
				}

			} catch ( error ) {
				console.error(error);
				reject ({
					status: "ERROR",
					message: "Something went wrong! Try again",
					data: {
						error: error
					}
				});
			}
		
		});
	}

	const createLikeListener = async ( id, callback ) => {

		// Creates a listener on the article's like count
		const unsubscribe = onSnapshot ( doc ( firestore, "articles" , id ), ( doc ) => {

			// Calls the given callback
			callback ( doc );
		});

		return unsubscribe;
	}

	return {
		publishArticle,
		likeArticle,
		dislikeArticle,
		fetchLikeCount,
		createLikeListener
	}
}

export default useArticle;