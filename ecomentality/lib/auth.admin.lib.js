import { auth } from "./admin.lib"

import Cookies from "cookies";

/**
 * Verifies that the request is authenticated
 * 
 * @param {Object} context - The HTTPS request context
 */
export const authRedirect = async ({ req, res }) => {

	// Parses the request cookies
	const cookies = new Cookies ( req, res );
	const token = cookies.get ( "token" );

	let response;

	// Checks if the user sent an id token, and if the token is valid
	if ( token && token.length > 0 ) {

		// Verifies the token
		await auth
			.verifyIdToken ( token )
			.then ( async ( decoded ) => {

				// The token is valid
				response = {
					props: {
						token: decoded
					}
				};
			})
			.catch ( async ( error ) => {

				console.error ( error );

				// The token was invalid
				response = {
					redirect: {
						destination: "/auth/login",
						permanent: false
					}
				};
			});
	}	

	return response || {
		redirect: {
			destination: "/auth/login",
			permanent: false
		}
	};
}