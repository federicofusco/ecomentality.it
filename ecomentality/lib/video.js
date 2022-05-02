import { firestore } from "./firebase"
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import useAuth from "./auth"

const useVideo = () => {

	const { isLoggedIn, user } = useAuth ();

	/**
	 * Publishes a new article
	 * 
	 * @param {String} id - The video's UUID
	 * @param {String} title - The video's title
	 * @param {String} body - The video's boddy
	 * @param {URL} link - The video's link on youtube to embed 
	 * @returns A new promise
	 */
	const publishVideo = async ( id, title, body, link ) => {
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

			// Checks if the video ID is valid
			if ( !id.match ( new RegExp ( /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i ) ) ) {
				reject ({
					status: "ERROR",
					message: "The video ID is invalid!",
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
					title: title,
					body: body,
					link: link,
					timestamp: serverTimestamp (),
					author: user.uid
				});

				resolve ({
					status: "OK",
					message: "Published video!",
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
	const fetchVideo = async ( id ) => {
		return new Promise ( async ( resolve, reject ) => {

			// Checks if the article ID is valid
			if ( !id.match ( new RegExp ( /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i ) ) ) {
				reject ({
					status: "ERROR",
					message: "The video ID is invalid!",
					data: {
						error: {
							message: `Invalid video ID (${ id })!`,
							code: "video/invalid-id"
						}
					}
				});
			}

			try {

				// Fetches the article
				const articleData = await getDoc ( doc ( firestore, "videos", id ) );

				// Checks if the article exists
				if ( !articleData.exists () ) {
					reject ({
						status: "ERROR",
						message: "This video doesn't exists!",
						data: {
							error: {
								message: `The video ${ id } doesn't exist!`,
								code: "video/no-video"
							}
						}
					});
				} else {

					// Found the article
					resolve ({
						status: "OK",
						message: "Found video!",
						data: {
							article: articleData.data ()
						}
					});
				}

			} catch ( error ) {

				console.error ( error );

				reject ({
					status: "ERROR",
					message: "Something went wrong while fetching the video!",
					data: {
						error: error
					}
				});
			}

		});
	}

	return {
		publishVideo,
		fetchVideo
	}
}

export default useVideo;