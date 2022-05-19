import useEditor from "../../hooks/editor"
import { useSlateStatic } from "slate-react"
import { MdPhotoCamera } from "react-icons/md"

/**
 * A button which inserts images
 * 
 * @param {String} id - The article's id
 * @returns A button for inserting images
 */
const InsertImageButton = ({ id }) => {

	const editor = useSlateStatic ();
	const { isImageUrl, insertImage } = useEditor ( id );

	return (
		<button
			className="h-7 w-7 bg-white border-black border rounded-full mr-2"
			title="Insert image"
			onClick={() => {
				const url = window.prompt ( 'Enter the URL of the image:' );

				// Checks if the url is an image
				if ( url && !isImageUrl ( url ) ) {
					window.alert ( 'URL is not an image' )
					return;
				}

				// Inserts the image
				insertImage ( editor, url )
			}}
			>
			<MdPhotoCamera className="m-auto" />
		</button>
	)
}

export default InsertImageButton;