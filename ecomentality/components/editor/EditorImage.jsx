import DeleteImageButton from "../buttons/DeleteImageButton"

/**
 * Displays an image in the editor
 * 
 * @param {Boolean} hideDeleteButton - Whether or not to hide the delete button 
 * @returns An image
 */
const ArticleImage = ({ attributes, element, children, hideDeleteButton }) => {

	return (
		<div {...attributes} contentEditable={ false } className="relative object-contain select-none flex justify-center">
			<img 
				src={ element.src }
				alt=""
				className="block max-w-full h-full max-h-80 select-none" />
			
			{/* More voodoo black magic, DON'T TOUCH */}
			<div className="hidden">{ children }</div>
			
			{ !hideDeleteButton && <DeleteImageButton element={ element } /> }
		</div>
	)

}

export default ArticleImage;