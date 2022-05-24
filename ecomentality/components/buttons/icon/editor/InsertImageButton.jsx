import useStorage from "./../../../../hooks/storage"
import useEditor from "./../../../../hooks/editor"
import EditorImageModal from "./../../../forms/modal/EditorImageModal"


import { useSlateStatic } from "slate-react"
import { useState } from "react" 
import { useSnackbar } from "notistack"
const axios = require ( "axios" ).default;
import { v4 as uuid } from "uuid"

import { MdPhotoCamera } from "react-icons/md"
import GenericIconButton from "./../GenericIconButton"


/**
 * A button which inserts images
 * 
 * @param {String} id - The article's id
 * @returns A button for inserting images
 */
const InsertImageButton = ({ id }) => {

	const editor = useSlateStatic ();
	const { uploadUint8Array } = useStorage ();
	const { isImageUrl, insertImage } = useEditor ( id );
	const { enqueueSnackbar } = useSnackbar ();
	const [isModalVisible, setModalVisibility] = useState ( false );

	const updateImageLink = async ( link ) => { 

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

		// Uploads the image to firebase via the GEM API
		axios.get ( link, { 
			responseType: "arraybuffer"
		})
		.then ( async ( response ) => {

			// Uploads the image
			await uploadUint8Array ( new Uint8Array ( response.data ), `/assets/articles/${ uuid () }` )
				.then ( url => insertImage ( editor, url.data.url ) )
				.catch ( error => {

					// Ar error occurredd (probably CORS)
					console.error ( error );

					enqueueSnackbar ( "Whoops, failed to get asset!", {
						variant: "error",
						autoHideDuration: 3000
					});
				});
		})
		.catch ( error => {

			// Ar error occurredd (probably CORS)
			console.error ( error );

			enqueueSnackbar ( "Whoops, something went wrong!", {
				variant: "error",
				autoHideDuration: 3000
			});
		});

	}

	return (
		<>
			<GenericIconButton
				title="Insert image"
				onClick={() => setModalVisibility ( true ) }
				className="mr-2">
				<MdPhotoCamera className="m-auto" />
			</GenericIconButton>
			<EditorImageModal onClick={ updateImageLink } onHide={() => setModalVisibility ( !isModalVisible )} title="Insert image" visible={ isModalVisible } />
		</>
	)
}

export default InsertImageButton;