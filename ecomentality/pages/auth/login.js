import LoginForm from "../../components/forms/LoginForm"
import { auth } from "../../lib/firebase"
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth"
import useAuth from "../../lib/auth"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { useSnackbar } from "notistack"
import isUrl from "is-url"

const Login = ({ redirectTo }) => {

	const router = useRouter ();
	const { updateIdToken } = useAuth ();
	const { enqueueSnackbar } = useSnackbar ();
	const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword ( auth );

	const login = ( email, password ) => signInWithEmailAndPassword ( email, password );

	useEffect (() => {
		if ( error ) {
			enqueueSnackbar ( error.message, {
				variant: "error",
				autoHideDuration: 3000
			});
		}
	}, [error]);

	// Redirects the user to the home page when they successfully log in
	useEffect (() => {

		// Checks if the user is logged in
		if ( !loading && user && !error ) {

			// Updates the user's ID token
			updateIdToken ( true )
				.then ( () => {

					// Redirects the user
					router.push ( !isUrl ( redirectTo ) ? redirectTo : "/new/article/random-id" );
				});
		}
	}, [user, loading, error, updateIdToken, router])

	return (
		<div>
			<LoginForm onSubmit={ login } />
		</div>
	)
}

export const getServerSideProps = ({ query }) => {
	return {
		props: {
			redirectTo: query.redirect || null
		}
	}
}

export default Login;