import { useRef } from "react"

/**
 * Displays a login form
 * 
 * @param {Function} onSubmit - The function which will be called when the form is submitted
 * @returns A login form
 */
const LoginForm = ({ onSubmit }) => {

	const emailRef = useRef ();
	const passwordRef = useRef ();

	const submitForm = () => {
		onSubmit ( emailRef.current.value, passwordRef.current.value );
	}

	return (
		<>
			<h1>Login</h1>
			<input defaultValue="test@gmail.com" type="text" placeholder="Email" ref={ emailRef } />
			<input defaultValue="123456" type="password" placeholder="Password" ref={ passwordRef } />
			<button onClick={ submitForm }>Login</button>
		</>
	)
}

export default LoginForm;