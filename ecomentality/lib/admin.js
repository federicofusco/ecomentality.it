/**
 * The Firebase Admin SDK
 * 
 * This file exports various files:
 * @exports auth - The admin auth handler
 * @exports firestore - The admin firestore handler
 * 
 * Note: While looking through the firebase documentation,
 * 		 remember to always select the Node.JS option in the
 * 		 snippets when using the Admin SDK
 */

const admin = require ( "firebase-admin" )

const config = {
	type: process.env.FIREBASE_ADMIN_TYPE,
	project_id: process.env.FIREBASE_ADMIN_PROJECT_ID,
	private_key_id: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
	private_key: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'),
	client_email: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
	client_id: process.env.FIREBASE_ADMIN_CLIENT_ID,
	auth_uri: process.env.FIREBASE_ADMIN_AUTH_URI,
	token_uri: process.env.FIREBASE_ADMIN_TOKEN_URI,
	auth_provider_x509_cert_url: process.env.FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
	client_x509_cert_url: process.env.FIREBASE_ADMIN_CLIENT_X509_CERT_URL
}

// Attempts to initialize the admin app
if ( !admin.apps.length ) {
	admin.initializeApp ({
		credential: admin.credential.cert ( config )
	});
}

const auth = admin.auth ();
const firestore = admin.firestore ();

export {
	auth,
	firestore
};