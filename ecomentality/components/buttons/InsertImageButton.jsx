import useEditor from "../../hooks/editor"
import { useSlateStatic } from "slate-react"
import { MdPhotoCamera } from "react-icons/md"
import { useState } from "react" 
import EditorImageModal from "./../forms/modal/EditorImageModal"
import { useSnackbar } from "notistack"

/**
 * A button which inserts images
 * 
 * @param {String} id - The article's id
 * @returns A button for inserting images
 */
const InsertImageButton = ({ id }) => {

	const editor = useSlateStatic ();
	const { isImageUrl, insertImage } = useEditor ( id );
	const { enqueueSnackbar } = useSnackbar ();
	const [isModalVisible, setModalVisibility] = useState ( false );

	const updateImageLink = ( link ) => {

		// Checks if the link is valid
		if ( link && !isImageUrl ( link ) ) {

			enqueueSnackbar ( "Invalid link", {
				variant: "error",
				autoHideDuration: 1500
			});

			return;
		}

		// Link is valid
		setModalVisibility ( false );
		insertImage ( editor, link );
	}

	return (
		<>
			<button
				className="h-7 w-7 bg-white border-black border rounded-full mr-2"
				title="Insert image"
				onClick={() => setModalVisibility ( true ) }
				>
			<MdPhotoCamera className="m-auto" />
			</button>
			<EditorImageModal onClick={ updateImageLink } title="Insert image" visible={ isModalVisible } />
		</>
	)
}

export default InsertImageButton;