/**
 * A button which causes an action
 * 
 * @param {String} className - Any custom classes
 * @param {Function} onClick - The callback whish should be called when the button is clicked
 * @returns A button for an action
 */
const GenericActionButton = ({ className, children, onClick }) => {
	return (
		<button onClick={ onClick } className={`${ className } w-16 h-16 bg-transparent mt-0 mx-auto sm:m-0 sm:mt-4 flex justify-center hover:text-green-600 transition-all duration-300`}>
			<div className="my-auto text-2xl">
				{ children }
			</div>
		</button>
	)
}

export default GenericActionButton;