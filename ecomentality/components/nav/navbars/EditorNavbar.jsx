import useEditor from "./../../../hooks/editor"
import useArticle from "./../../../hooks/article"

import { useSlate } from "slate-react"
import { useState } from "react"
import { useSnackbar } from "notistack"

import InsertImageButton from "./../../buttons/icon/InsertImageButton"
import GenericNavbar from "./GenericNavbar"
import Button from "./../../buttons/Button"


/**
 * Displays a navbar in the editor
 * 
 * @param {String} id - The article's ID
 * @param {Ref} titleRef - A ref (see react useRef) to the title input
 * @returns A navbar
 */
const ArticleToolbar = ({ id, titleRef }) => {

	const { serializeEditor } = useEditor ( id );
	const { publishArticle } = useArticle ();
	const { enqueueSnackbar } = useSnackbar ();
	const editor = useSlate ();
	
	const [publishStatus, setPublishStatus] = useState ( "Publish" );

	/**
	 * Attempts to publish the article
	 */
	const publish = async () => {

		setPublishStatus ( "Hold on..." );
		await publishArticle ( id, titleRef.current.value, serializeEditor ( editor ) )
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

export default ArticleToolbar;