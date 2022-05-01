import DeleteImageButton from "../buttons/DeleteImageButton"

/**
 * Displays an image in the editor
 * 
 * @param {Object} param0 - The SlateJS attributes
 * @returns An image
 */
const ArticleImage = ({ attributes, element, children }) => {

	return (
		<div {...attributes} contentEditable={ false } className="relative select-none flex justify-center">
			<img 
				src={ element.src }
				alt=""
				className="block max-w-full h-full max-h-80 select-none" />
			
			{/* More voodoo black magic, DON'T TOUCH */}
			<div className="hidden">{ children }</div>
			
			<DeleteImageButton element={ element } />
		</div>
	)

}

export default ArticleImage;