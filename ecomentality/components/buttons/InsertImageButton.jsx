import useEditor from "../../lib/editor"
import { useSlateStatic } from "slate-react"
import { MdPhotoCamera } from "react-icons/md"

const InsertImageButton = () => {

	const editor = useSlateStatic ();
	const { isImageUrl, insertImage } = useEditor ();

	return (
		<button
			className="h-7 w-7 bg-white border-black border rounded-full mr-2"
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