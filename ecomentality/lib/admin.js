const admin = require ( "firebase-admin" )
import { getAuth } from "firebase-admin/auth"
import { getFirestore } from "firebase-admin/firestore"

const config = {
	type: process.env.FIREBASE_ADMIN_TYPE,
	project_id: process.env.FIREBASE_ADMIN_PROJECT_ID,
	private_key_id: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
	private_key: JSON.parse ( process.env.FIREBASE_ADMIN_PRIVATE_KEY ).key,
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

const auth = getAuth ( admin.apps[0] );
const firestore = getFirestore ( admin.apps[0] );

export {
	admin,
	auth,
	firestore
};