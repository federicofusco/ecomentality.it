import { auth } from "./admin"

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

/**
 * Checks if a given UUID is valid
 * 
 * @param {String} uuid - The UUId which needs to be checked
 * @returns Whether or not the UUID is valid
 */
export const isUUID = ( uuid ) => {
	return uuid.match ( new RegExp ( /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i ) );
}