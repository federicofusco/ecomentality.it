import useEditor from "./../../../hooks/editor"
import useVideo from "./../../../hooks/video"

import { useSlate } from "slate-react"
import { useState } from "react"
import { useSnackbar } from "notistack"

import InsertImageButton from "./../../buttons/icon/editor/InsertImageButton"
import GenericNavbar from "./GenericNavbar"
import Button from "./../../buttons/Button"


/**
 * Displays a navbar in the editor
 * 
 * @param {String} id - The article's ID
 * @param {Ref} titleRef - A ref (see react useRef) to the title input
 * @param {String} link - The video's link
 * @returns A navbar
 */
const VideoEditorNavbar = ({ id, titleRef, link }) => {

	const { serializeEditor } = useEditor ( id );
	const { publishVideo } = useVideo ();
	const { enqueueSnackbar } = useSnackbar ();
	const editor = useSlate ();
	
	const [publishStatus, setPublishStatus] = useState ( "Publish" );

	/**
	 * Attempts to publish the video
	 */
	const publish = async () => {

		setPublishStatus ( "Hold on..." );
		await publishVideo ( id, titleRef.current.value, link, serializeEditor ( editor ) )
			.then (( result ) => {

				// Updates the status
				setTimeout (() => { 

					// Updates the button
					setPublishStatus ( "Done!" );

					// Displays notification
					enqueueSnackbar ( result.message, {
						variant: "success",
						autoHideDuration: 3000
					});
					
					// Resets the button
					setTimeout (() => setPublishStatus ( "Publish" ), 3000 ); 
				}, 1000 );
			})
			.catch ( ( error ) => {

				// Resets the button
				setPublishStatus ( "Publish" );

				// Error handling
				enqueueSnackbar ( error.message, {
					variant: "error",
					autoHideDuration: 3000
				});
			});
	}

	return (
		<GenericNavbar>
			<div className="flex">
				<InsertImageButton id={ id } />
				<Button onClick={ publish }>
					{ publishStatus }
				</Button>
			</div>
		</GenericNavbar>
	)
}

export default VideoEditorNavbar;