import admin from "../lib/admin.lib"
import { getAuth } from "firebase-admin/auth"
import cookie from "cookie"

const authRedirect = ({ req, res }) => {
	
	// Parses the request cookies
	const cookies = cookie.parse ( (req && req.headers.cookie) || "" );

	// Checks if the user sent an id token, and if the token is valid
	if ( cookies.token && cookies.token.length > 0 ) {

		// Verifies the token
		getAuth ( admin )
			.verifyIdToken ( cookies.token )
			.then ( ( decoded ) => {

				// The token is valid
			})
			.catch ( ( error ) => {

				// The token was invalid
				return {
					redirect: {
						destination: "/auth/login",
						permanent: false
					}
				}
			});
	}	

	return {
		redirect: {
			destination: "/auth/login",
			permanent: false
		}
	}
} 

export {
	authRedirect
}