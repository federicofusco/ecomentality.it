import LoginForm from "../../components/forms/LoginForm"
import { auth } from "../../lib/firebase"
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth"
import useAuth from "../../lib/auth"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { useSnackbar } from "notistack"
import { v4 as uuid } from "uuid"
import isUrl from "is-url"
import Head from "next/head"

const Login = () => {

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
	}, [error, enqueueSnackbar]);

	// Redirects the user to the home page when they successfully log in
	useEffect (() => {

		// Checks if the user is logged in
		if ( !loading && user && !error ) {

			updateIdToken ( true )
				.then ( () => {

					// Redirects the user
					router.push ( router.query.redirect && !isUrl ( router.query.redirect ) ? router.query.redirect : `/new/article/${ uuid () }` );
				})
				.catch ( ( error ) => {
					console.error(error);
					enqueueSnackbar ( error.message, {
						variant: "error",
						autoHideDuration: 3000
					});
				});
		}
	}, [user, loading, error, updateIdToken, router, enqueueSnackbar])

	return (
		<>
			<Head>
				<title>Login - GEM</title>
			</Head>
			<LoginForm onSubmit={ login } />
		</>
	)
}

export default Login;