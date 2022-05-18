import Logo from "../Logo"
import useEditor from "../../lib/editor"
import useArticle from "../../lib/article"
import { useSlate } from "slate-react"
import { useState } from "react"
import InsertImageButton from "../buttons/InsertImageButton"
import Button from "../buttons/Button"

/**
 * Displays a toolbar in the editor
 * 
 * @param {String} articleId - The article's UUID
 * @param {Ref} articleTitleRef - A ref (see react useRef) to the title input
 * @returns A toolbar
 */
const EditorToolbar = ({ articleId, articleTitleRef }) => {

	const { serializeEditor } = useEditor ( articleId );
	const { publishArticle } = useArticle ();
	const editor = useSlate ();
	const [publishStatus, setPublishStatus] = useState ( "Publish" );

	/**
	 * Attempts to publish the article
	 */
	const publish = async () => {

		setPublishStatus ( "Hold on..." );
		await publishArticle ( articleId, articleTitleRef.current.value, serializeEditor ( editor ) )
			.then ( () => {

				// Updates the status
				setTimeout (() => { 
					setPublishStatus ( "Done!" );
					setTimeout (() => { setPublishStatus ( "Publish" ) }, 3000 ); 
				}, 1000 );
			})
			.catch ( ( error ) => {

				// Error handling
				setError ( error.data.error );
			});
	}

	return (
		<div className="w-screen border-b top-0 fixed z-50 h-16 bg-white px-4 sm:px-16 md:px-48">
			<div className="h-full flex items-center">
				<div className="flex-1 flex">
					<Logo iconOnly={ true } />
					<p className="ml-2 text-sm font-medium text-gray-600 my-auto">Draft saved locally</p>
				</div>

				<div className="flex">
					<InsertImageButton id={ articleId } />
					<Button onClick={ publish }>{ publishStatus }</Button>
				</div>
			</div>
		</div>
	)
}

export default EditorToolbar;