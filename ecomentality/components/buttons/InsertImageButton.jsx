import useEditor from "../../lib/editor"
import { useSlateStatic } from "slate-react"
import { MdPhotoCamera } from "react-icons/md"

const InsertImageButton = ({ id }) => {

	const editor = useSlateStatic ();
	const { isImageUrl, insertImage, saveLocalCopy } = useEditor ( id );

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
				saveLocalCopy ( editor, id );
			}}
			>
			<MdPhotoCamera className="m-auto" />
		</button>
	)
}

export default InsertImageButton;