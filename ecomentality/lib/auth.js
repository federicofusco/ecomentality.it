/**
 * The GEM Auth Hook
 */

import { auth } from "./firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { getIdToken } from "firebase/auth"
import { useRouter } from "next/router"

import cookieCutter from "cookie-cutter"

/**
 * A hook used to interact with authentication from the client
 * 
 * @returns {Object} - The following:
 * 					 * updateIdToken
 * 					 * isLoggedIn
 * 					 * user 
 */
const useAuth = () => {

	// Hooks
	const [user, loading, error] = useAuthState ( auth );
	const router = useRouter ();

	/**
	 * Updates the user's ID token in cookies
	 * 
	 * @param {?Boolean} forceUpdate - Whether to ignore the presence of a token 
	 * @async
	 * @returns {Promise} A promise
	 */
	const updateIdToken = async ( forceUpdate ) => {
		return new Promise ( async ( resolve, _ ) => {

			// Verifies that the user is logged in
			if ( isLoggedIn () ) {

				// Parses the user cookies
				const currentToken = cookieCutter.get ( "token" );

				if ( forceUpdate || ( !currentToken || currentToken.length === 0 ) ) {

					// Generates a new token as a cookie
					const token = await getIdToken ( user );
					await cookieCutter.set ( "token", token, {
						path: "/",
						secure: true
					});

					resolve ();
				}

			} else {

				// The user isn't logged in
				router.push ( "/auth/login" );
			}

		});
	}

	/**
	 * Checks if the user is logged in
	 * 
	 * @returns {Boolean} Whether or not the user is logged in
	 */
	const isLoggedIn = () => {
		return !loading && user && !error 
	}

	return { 
		updateIdToken, 
		isLoggedIn,
		user
	};
}

/**
 * Checks if a given UUID is valid
 * 
 * @param {String} uuid - The UUId which needs to be checked
 * @returns {Boolean} Whether or not the UUID is valid
 */
 export const isUUID = ( uuid ) => {
	return uuid.match ( new RegExp ( /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i ) );
}

export default useAuth;