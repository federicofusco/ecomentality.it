import { useRef } from "react"
import ErrorMessage from "../state/ErrorMessage";

/**
 * Displays a login form
 * 
 * @param {Function} param0 - The function which will be called when the form is submitted
 * @param {?String} error - An error message
 * @returns A login form
 */
const LoginForm = ({ onSubmit, error }) => {

	const emailRef = useRef ();
	const passwordRef = useRef ();

	const submitForm = () => {
		onSubmit ( emailRef.current.value, passwordRef.current.value );
	}

	return (
		<div>
			<h1>Login</h1>
			<ErrorMessage message={ error } />
			<input type="text" placeholder="Email" ref={ emailRef } />
			<input type="password" placeholder="Password" ref={ passwordRef } />
			<button onClick={ submitForm }>Login</button>
		</div>
	)
}

export default LoginForm;