import Logo from "../Logo"
import useEditor from "../../lib/editor"
import useArticle from "../../lib/article"
import { useSlate } from "slate-react"
import { useState } from "react"

const Toolbar = ({ articleId, articleTitleRef }) => {

	const { serializeEditor } = useEditor ();
	const { publishArticle } = useArticle ();
	const editor = useSlate ();
	const [publishStatus, setPublishStatus] = useState ( "Publish" );

	const publish = async () => {

		setPublishStatus ( "Hold on..." );
		await publishArticle ( articleId, articleTitleRef.current.value, serializeEditor ( editor ) )
			.then ( () => {
				console.log(1);

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

				<button onClick={ publish } className="text-white font-medium bg-green-600 rounded-full py-1 px-3 text-sm ml-auto">{ publishStatus }</button>
			</div>
		</div>
	)
}

export default Toolbar;
