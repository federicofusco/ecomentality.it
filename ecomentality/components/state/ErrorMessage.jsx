/**
 * An error message	
 * 
 * @param {?String} message - The error message
 * @returns An error message component
 */
const ErrorMessage = ({ message }) => {
	return (
		<div>
			{ message && message.length > 0 && <p className="text-red-500">Error: { message }</p> }
		</div>
	)
}

export default ErrorMessage;