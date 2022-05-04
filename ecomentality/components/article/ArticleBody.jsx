import { useCallback, useState } from "react"
import { Editable, Slate, withReact } from "slate-react"
import { createEditor } from "slate"
import EditorElement from "./../editor/EditorElement"
import EditorLeaf from "./../editor/EditorLeaf"

/**
 * Displays the article's body
 * 
 * @param {Object} article - The article
 * @returns An article body
 */
const ArticleBody = ({ article }) => {

	// Defines the editor and its elements
	// HEADS UP: This is temporary for development (im too lazy to do serialization/deserialization rn), i'll "do it later"
	const renderElement = useCallback ( x => <EditorElement {...x} /> );
	const renderLeaf = useCallback ( x => <EditorLeaf {...x} /> );
	const [editor] = useState ( withReact ( createEditor () ) );

	return (
		<div className="p-4 font-serif text-gray-dark break-all text-lg">
			<Slate 
				editor={ editor } 
				value={ article.body }
				className="w-screen h-screen">

				<div className="mx-auto max-w-2xl">
					<Editable 
						renderElement={ renderElement }
						renderLeaf={ renderLeaf }
						readOnly={ true }
						className="p-4 font-serif text-gray-dark break-all text-lg"
					/>
				</div>
			</Slate>
		</div>
	)

}

export default ArticleBody;