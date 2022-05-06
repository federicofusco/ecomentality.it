import { auth } from "./admin"
import Cookies from "cookies";
import { firestore } from "./firebase"
import { getDoc, doc } from "firebase/firestore"

/**
 * Verifies that the request is authenticated
 * 
 * @param {Object} context - The HTTPS request context
 * @returns A promise
 */
export const authRedirect = ({ req, res, resolvedUrl }) => {
	return new Promise ( async ( resolve, reject ) => {

		// Parses the request cookies
		const cookies = new Cookies ( req, res );
		const token = cookies.get ( "token" );

		// Checks if the user sent an id token, and if the token is valid
		if ( token && token.length > 0 ) {

			// Verifies the token
			await auth
				.verifyIdToken ( token )
				.then ( async ( decoded ) => {

					// The token is valid
					resolve ({
						token: decoded
					});
				})
				.catch ( async ( error ) => {

					// The token was invalid
					reject ({
						redirect: {
							destination: `/auth/login?redirect=${ resolvedUrl }`,
							permanent: false
						}
					});
				});
		}	

		reject ({
			redirect: {
				destination: `/auth/login?redirect=${ resolvedUrl }`,
				permanent: false
			}
		});
	});
}

/**
 * Fetches a user fomr the database
 * 
 * @param {String} id - The user's ID
 * @returns A promise
 */
export const fetchUser = async ( id ) => {
	return new Promise ( async ( resolve, reject ) => {

		try {

			// Fetches the user
			const userData = await getDoc ( doc ( firestore, "users", id ) );
	
			// Checks if the user exists
			if ( !userData.exists () ) {
				
				// The user doesn't exist
				reject ({
					status: "ERROR",
					message: "No such user!",
					data: {
						error: {
							message: "User not found!",
							code: "admin/no-user"
						}
					}
				});
			} else {
	
				// Found the user
				const { displayName, profileURL, bio, created } = userData.data ();
				resolve ({
					status: "OK",
					message: "Found user!",
					data: {
						user: {
							name: displayName,
							profile: profileURL,
							bio: bio,
							created: String ( created.toDate () )
						}
					}
				});
			}
	
		} catch ( error ) {
	
			console.error ( error );
	
			reject ({
				status: "ERROR",
				message: "Something went wrong!",
				data: {
					error: error
				}
			});
		}

	});
}