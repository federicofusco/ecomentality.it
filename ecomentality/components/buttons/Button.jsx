/**
 * Displays a green rounded button
 * 
 * @param {String} className - Any custom classes which should be applied
 * @param {Function} onClick - The click callback
 * @param {Object} children - The button's content
 * @param {?Boolean} rounded - Whether or not the button should be rounded (default: true)
 * @param {?Boolean} disabled - Whether or not the button should be disabled (default: false)
 * @returns A button
 */
const Button = ({ className, onClick, children, rounded = true, disabled = false }) => {

	const click = () => !disabled ? onClick () : null;

	return <button onClick={ click } className={`${ className } ${ disabled ? "text-gray-200 bg-green-800 cursor-not-allowed" : "" } text-white font-medium bg-green-600 ${ rounded ? "rounded-full" : "rounded-md" } py-1 px-3 text-sm ml-auto`}>
		{ children }
	</button>
}

export default Button;