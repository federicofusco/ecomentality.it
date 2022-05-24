/**
 * The GEM Video Hook
 */

import { firestore } from "./../lib/firebase"
import { doc, getDoc, setDoc, updateDoc, serverTimestamp, onSnapshot } from "firebase/firestore";
import useAuth from "./auth"

/**
 * A hook used to interact with videos from the client
 * 
 * @returns {Object} - The following functions:
 * 					 * publishVideo
 * 					 * likeVideo
 * 					 * dislikeVideo
 */
const useVideo = () => {

	const { isUUID, isLoggedIn, user } = useAuth ();

	/**
	 * Publishes a new video
	 * 
	 * @param {String} id - The video's ID
	 * @param {String} title - The video's title
	 * @param {String} body - The video's body
	 * @param {String} link - The video's link
	 * @async 
	 * @returns {Promise} A new promise
	 */
	const publishVideo = async ( id, title, link, body ) => {
		return new Promise ( async ( resolve, reject ) => {

			// Checks if the user is signed in
			if ( !isLoggedIn () ) {
				reject ({
					status: "ERROR",
					message: "You need to log in to publish videos!",
					data: {
						error: {
							message: "User unauthenticated",
							code: "video/not-authenticated"
						}
					}
				});
			}

			// Checks if the video ID is valid
			if ( !isUUID ( id ) ) {
				reject ({
					status: "ERROR",
					message: "Invalid video ID!",
					data: {
						error: {
							message: `Invalid video ID (${ id })!`,
							code: "video/invalid-id"
						}
					}
				});
			}

			try {
				
				await setDoc ( doc ( firestore, "videos", id ), {
					title,
					body,
					link,
					likeCount: 0, // UPDATE THIS
					timestamp: serverTimestamp (),
					author: user.uid
				});

				// Clears the local copy
				if ( typeof window === "undefined" ) {
					window.localStorage.removeItem ( id );
				}

				resolve ({
					status: "OK",
					message: "Published video!",
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
	 * Increments the like count of an video
	 * 
	 * @param {String} id - The video's UUID
	 * @async
	 * @returns {Promise} A promise
	 */
	const likeVideo = async ( id ) => {
		return new Promise ( async ( resolve, reject ) => {

			// Gets the current like count
			const videoRef = doc ( firestore, "videos", id );
			const videoData = await getDoc ( videoRef );

			// Checks if the video exists
			if ( !videoData.exists () ) {
				reject ({
					status: "ERROR",
					message: "Whoops something went wrong!",
					data: {
						error: {
							message: "Video doesn't exist!",
							code: "video/like-failed"
						}
					}
				});
				return;
			} 

			const video = videoData.data ();

			// Updates the like count
			await updateDoc ( videoRef, {
				likeCount: ( video.likeCount || 0 ) + 1
			});

			resolve ({
				status: "OK",
				message: "Liked video!",
				data: {
					likeCount: video.likeCount + 1
				}
			});
		});	
	}

	/**
	 * Decrements the like count of an video
	 * 
	 * @param {String} id - The video's ID
	 * @async
	 * @returns {Promise} A promise
	 */
	const dislikeVideo = async ( id ) => {
		return new Promise ( async ( resolve, reject ) => {

			// Gets the current like count
			const videoRef = doc ( firestore, "videos", id );
			const videoData = await getDoc ( videoRef );

			// Checks if the video exists
			if ( !videoData.exists () ) {
				reject ({
					status: "ERROR",
					message: "Whoops something went wrong!",
					data: {
						error: {
							message: "Video doesn't exist!",
							code: "video/dislike-failed"
						}
					}
				});
				return;
			} 

			const video = videoData.data ();

			// Updates the like count
			await updateDoc ( videoRef, {
				likeCount: ( video.likeCount || 1 ) - 1
			});

			resolve ({
				status: "OK",
				message: "Disliked video!",
				data: {
					likeCount: video.likeCount - 1
				}
			});
		})
	}

	/**
	 * Fetches the video's current like count
	 * 
	 * @param {String} id - The video's UUID
	 * @async
	 * @returns {Promise} A promise
	 */
	 const fetchLikeCount = async ( id ) => {
		return new Promise ( async ( resolve, reject ) => {

			// Checks if the video ID is valid
			if ( !isUUID ( id ) ) {
				reject ({
					status: "ERROR",
					message: "Invalid video ID!",
					data: {
						error: {
							message: `Invalid video ID (${ id })!`,
							code: "video/invalid-id"
						}
					}
				});
			}

			try {

				// Fetches the video
				const videoData = await getDoc ( doc ( firestore, "videos", id ) );

				// Checks if the video exists
				if ( !videoData.exists () ) {

					// The video doesn't exist
					reject ({
						status: "ERROR",
						message: "The error doesn't exist!",
						data: {}
					});
				} else {

					// Found the video
					const { likeCount } = videoData.data ();

					resolve ({
						status: "OK",
						message: "Fetched like count!",
						data: {
							likeCount
						}
					});
				}

			} catch ( error ) {

				console.error ( error );
				
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

		// Creates a listener on the video's like count
		const unsubscribe = onSnapshot ( doc ( firestore, "videos" , id ), ( doc ) => {

			// Calls the given callback
			callback ( doc );
		});

		return unsubscribe;
	}

	return {
		publishVideo,
		likeVideo,
		dislikeVideo,
		fetchLikeCount,
		createLikeListener
	}
}

export default useVideo;