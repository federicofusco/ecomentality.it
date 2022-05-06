/**
 * The GEM Article Hook
 */

import { firestore } from "./firebase"
import { doc, setDoc, getDoc, getDocs, serverTimestamp, collection, query, where } from "firebase/firestore";
import useAuth, { isUUID } from "./auth"
import { deserializeEditor } from "./editor"

/**
 * A hook used to interact with articles from the client
 * 
 * @returns {Object} - The following functions:
 * 					 * publishArticle
 * 					 * likeArticle
 * 					 * dislikeArticle 
 */
const useArticle = () => {

	const { isLoggedIn, user } = useAuth ();

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
					title: title,
					body: body,
					timestamp: serverTimestamp (),
					author: user.uid
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
		return new Promise ( ( resolve, reject ) => {

			// Sends a request to the like API
			fetch ( `${ process.env.NEXT_PUBLIC_URL }/api/like/${ id }` )
				.then (( response ) => response.json () )
				.then (( data ) => {

					if ( data.status === 200 ) {

						// Successfully liked the post
						resolve ({
							status: "OK",
							message: "Liked article!",
							data: {}
						});
						return;
					}

					reject ({
						status: "ERROR",
						message: "Whoops something went wrong!",
						data: {
							error: {
								message: data.message,
								code: "article/like-failed"
							}
						}
					});
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
		return new Promise ( ( resolve, reject ) => {

			// Sends a request to the dislike API
			fetch ( `${ process.env.NEXT_PUBLIC_URL }/api/dislike/${ id }` )
				.then (( response ) => response.json () ) 
				.then (( data ) => {

					if ( data.status === 200 ) {
						resolve ({
							status: "OK",
							message: "Disliked article!",
							data: {}
						});
						return;
					}

					reject ({
						status: "ERROR",
						message: "Whoops something went wrong!",
						data: {
							error: {
								message: data.message,
								code: "article/dislike-failed"
							}
						}
					});
				});
		})
	}

	return {
		publishArticle,
		likeArticle,
		dislikeArticle
	}
}

/**
 * Fetches an article based on its ID
 * 
 * @param {String} id - The article's UUID
 * @param {Boolean} deserialize - Whether or not the body of the article should be deserialized
 * @async
 * @returns {Promise} A promise
 */
export const fetchArticle = async ( id, deserialize ) => {
	return new Promise ( async ( resolve, reject ) => {

		try {

			// Fetches the article
			const articleData = await getDoc ( doc ( firestore, "articles", id ) );
	
			// Checks if the article exists
			if ( !articleData.exists () ) {
				
				// The article doesn't exist
				reject ({
					status: "ERROR",
					message: "The article doesn't exist!",
					data: {}
				});
			} else {
	
				// Found the article
				const { title, body, author, likeCount, timestamp } = articleData.data ();
				resolve ({
					status: "OK",
					message: "Found article!",
					data: {
						article: {
							title: title,
							body: deserialize ? await deserializeEditor ( body ) : body,
							author: author,
							likeCount: likeCount || 0,
							timestamp: String ( timestamp.toDate () ),
							id: id
						}
					}
				});
			}
	
		} catch ( error ) {
	
			console.error ( error );
	
			reject ({
				status: "ERROR",
				message: "Something went wrong!",
				data: {}
			});
		}

	});
}

/**
 * Fetches all the articles which match a given query
 * 
 * NOTE: See the Firestore query documentation
 * 
 * @param {String} key - The query key
 * @param {String} operation - The query operation (e.i "==", "=>", etc)
 * @param {String} value - The query operation value
 * @async 
 * @returns {Array} The articles which match the query
 */
export const fetchArticles = async ( key, operation, value ) => {
	return new Promise ( async ( resolve, reject ) => {

		try {

			const articleCollection = collection ( firestore, "articles" );
			const articleQuery = query ( articleCollection, where ( key, operation, value ) );

			let articles = [];
			const articleData = await getDocs ( articleQuery );
			articleData.forEach (( article ) => { 
				const { title, body, author, likeCount, timestamp } = article.data ();
				articles.push ({ 
					title,
					body, 
					author, 
					likeCount: likeCount || 0, 
					timestamp: String ( timestamp.toDate () ),
					id: article.id
				});
			});

			// Found the articles
			resolve ({
				status: "OK",
				message: "Found article!",
				data: {
					articles
				}
			});

		} catch ( error ) {
			
			console.error ( error );
	
			reject ({
				status: "ERROR",
				message: "Something went wrong!",
				data: {}
			});
		}

	});
}

export default useArticle;