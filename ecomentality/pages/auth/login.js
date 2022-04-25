import LoginForm from "../../components/forms/LoginForm"

import { useEffect } from "react"
import { useRouter } from "next/router"

import { auth } from "../../lib/firebase.lib";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth"

const Login = () => {

	const router = useRouter ();
	const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword ( auth ); 

	/**
	 * Redirects the user when they sign in successfully
	 */
	useEffect (() => {

		// Checks if they're signed in
		if ( !loading && user && !error ) {

			// Redirects the user
			router.push ( "/admin" );
		}

	}, [loading, user]);

	return (
		<div>
			<LoginForm 
				onSubmit={ signInWithEmailAndPassword } 
				error={ error ? error.message : null } />
		</div>
	)
}

export default Login;