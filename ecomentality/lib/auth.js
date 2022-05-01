import { auth } from "./firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { getIdToken } from "firebase/auth"
import { useRouter } from "next/router"

import cookieCutter from "cookie-cutter"

const useAuth = () => {

	// Hooks
	const [user, loading, error] = useAuthState ( auth );
	const router = useRouter ();

	/**
	 * Updates the user's ID token in cookies
	 * 
	 * @param {Boolean|Null} forceUpdate - Whether to ignore the presence of a token 
	 * @returns A promise
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
	 * @returns Whether or not the user is logged in
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

export default useAuth;