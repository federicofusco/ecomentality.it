import DeleteImageButton from "../buttons/DeleteImageButton"

const ArticleImage = ({ attributes, element }) => {

	// TODO: Switch to next/image

	return (
		<div {...attributes} contentEditable={ false } className="relative select-none flex justify-center">
			<img 
				src={ element.src }
				className="block max-w-full max-h-80 h-full select-none" />
			
			<DeleteImageButton element={ element } />
		</div>
	)

}

export default ArticleImage;