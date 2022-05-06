import Logo from "../Logo"
import useEditor from "../../lib/editor"
import useArticle from "../../lib/article"
import { useSlate } from "slate-react"
import { useState } from "react"
import InsertImageButton from "../buttons/InsertImageButton"
import Button from "../buttons/Button"
import { useSnackbar } from "notistack"
import GenericNavbar from "./GenericNavbar"

/**
 * Displays a navbar in the editor
 * 
 * @param {String} articleId - The article's UUID
 * @param {Ref} articleTitleRef - A ref (see react useRef) to the title input
 * @returns A navbar
 */
const ArticleToolbar = ({ articleId, articleTitleRef }) => {

	const { serializeEditor } = useEditor ( articleId );
	const { publishArticle } = useArticle ();
	const { enqueueSnackbar } = useSnackbar ();
	const editor = useSlate ();
	const [publishStatus, setPublishStatus] = useState ( "Publish" );

	/**
	 * Attempts to publish the article
	 */
	const publish = async () => {

		setPublishStatus ( "Hold on..." );
		await publishArticle ( articleId, articleTitleRef.current.value, serializeEditor ( editor ) )
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

	return <GenericNavbar actions={ <div className="flex"><InsertImageButton id={ articleId } /><Button onClick={ publish }>{ publishStatus }</Button></div> } />
}

export default ArticleToolbar;
