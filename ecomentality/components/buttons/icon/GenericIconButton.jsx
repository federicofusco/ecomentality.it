/**
 * A button for deleting images
 * 
 * @param {Function} onClick - The callback which should be called when the button is clicked
 * @param {?String} title - The title which should be displayed when hovering
 * @param {?String} className - Custom classes which should be applied
 * @returns A button for deleting images in the editor
 */
const GenericIconButton = ({ children, onClick, title, className }) => {

	return (
		<button
			onClick={ onClick }
			title={ title }
			className={`${ className } h-7 w-7 bg-white border-black border rounded-full`}>
			{ children }
		</button>
	)
}

export default GenericIconButton;