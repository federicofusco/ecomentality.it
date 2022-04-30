import LoginForm from "../../components/forms/LoginForm"
import { auth } from "../../lib/firebase"
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth"
import useAuth from "../../lib/auth"
import { useEffect } from "react"
import { useRouter } from "next/router"

const Login = () => {

	const router = useRouter ();
	const { updateIdToken } = useAuth ();
	const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword ( auth );

	const login = ( email, password ) => signInWithEmailAndPassword ( email, password );

	// Redirects the user to the home page when they successfully log in
	useEffect (() => {

		// Checks if the user is logged in
		if ( !loading && user && !error ) {

			// Updates the user's ID token
			updateIdToken ( true )
				.then ( () => {

					// Redirects the user
					router.push ( "/new/article/random-id" );
				});
		}
	}, [user, loading, error])

	return (
		<div>
			<LoginForm 
				onSubmit={ login } 
				error={ error ? error.message : null } />
		</div>
	)
}

export default Login;