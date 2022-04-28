import { auth } from "./firebase.lib"
import { useAuthState } from "react-firebase-hooks/auth"
import { useRouter } from "next/router"

import cookieCutter from "cookie-cutter"

const useAuth = () => {

	// Hooks
	const [user, loading, error] = useAuthState ( auth );
	const router = useRouter ();

	/**
	 * Updates the user's ID token in cookies
	 */
	const updateIdToken = async () => {

		// Verifies that the user is logged in
		if ( !loading && user && !error ) {

			// Parses the user cookies
			const token = cookieCutter.get ( "token" );

			if ( !token || token.length === 0 ) {

				// Generates a new cookie
				await user
					.getIdToken ( user, true )
					.then ( async ( token ) => {
						cookieCutter.set ( "token", token, { path: "/"});
					})
					.catch ( async ( error ) => {

						// An error occured
						console.error ( error );
					});
			}

		} else {

			// The user isn't logged in
			router.push ( "/auth/login" );
		}
	}

	/**
	 * Checks if the user is logged in
	 * 
	 * @returns The user or false
	 */
	const isLoggedIn = () => {
		if ( !loading && user && !error ) {
			return user;
		}

		return false;
	}

	return { 
		updateIdToken, 
		isLoggedIn 
	};
}

export default useAuth;