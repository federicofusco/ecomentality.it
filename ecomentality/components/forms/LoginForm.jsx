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
		<div className="w-screen h-screen sm:flex pt-16 bg-green-all">
			<div className="w-full sm:max-w-sm h-auto pt-16 sm:pt-0 px-8 sm:m-auto">
				
				<h1 className="font-black text-white text-3xl text-center mb-8 uppercase font-poppins">Login</h1>
				
				<div className="mt-3">
					<label htmlFor="email" className="font-black block font-poppins uppercase text-xs text-white">Email</label>
					<input id="email" className="w-full bg-transparent outline-none text-white focus:border-b-2 border-b border-white border-solid placeholder:text-white" type="text" placeholder="Email" ref={ emailRef } />
				</div>
				
				<div className="mt-5">
					<label htmlFor="email" className="font-black block font-poppins uppercase text-xs text-white">Password</label>
					<input className="w-full bg-transparent outline-none text-white focus:border-b-2 border-b border-white border-solid placeholder:text-white" type="password" placeholder="Password" ref={ passwordRef } />
				</div>
				
				<button className="w-full h-10 font-poppins bg-white mt-8 sm:mt-12 rounded-md" onClick={ submitForm }>
					Login
				</button>
			</div>
		</div>
	)
}

export default LoginForm;