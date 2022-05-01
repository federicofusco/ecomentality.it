/**
 * Displays a green rounded button
 * 
 * @param {Function} onClick - The click callback
 * @param {Object} children - The button's content
 * @returns A button
 */
const Button = ({ onClick, children }) => {
	return <button onClick={ onClick } className="text-white font-medium bg-green-600 rounded-full py-1 px-3 text-sm ml-auto">{ children }</button>
}

export default Button;