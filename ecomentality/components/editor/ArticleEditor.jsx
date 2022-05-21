import { useCallback, useRef, useState, useEffect } from "react"
import { Editable, Slate, withReact } from "slate-react"
import { createEditor } from "slate"
import { isHotkey } from "is-hotkey"
import EditorElement from "./EditorElement"
import EditorLeaf from "./EditorLeaf"
import useEditor from "./../../hooks/editor"
import EditorNavbar from "./../nav/navbars/EditorNavbar"

/**
 * An editor for articles
 * 
 * @param {String} title - The article's title
 * @param {String} body - The article's body
 * @param {String} id - The article's ID
 * @returns An article editor
 */
const ArticleEditor = ({ title, body, id }) => {

	const { withImages, toggleMark, saveLocalCopy, fetchLocalCopy } = useEditor ( id );

	// Defines the editor values
	const HOTKEYS = {
		"mod+b": "bold",
		"mod+i": "italic",
		"mod+k": "code",
		"mod+u": "underline"
	};

	// Defines the editor and its elements
	const renderElement = useCallback ( x => <EditorElement {...x} />, []);
	const renderLeaf = useCallback ( x => <EditorLeaf {...x} />, []);
	const [editor] = useState ( withImages ( withReact ( createEditor () ) ) );
	const titleRef = useRef ();
	const initialValue = body || [{
		type: "paragraph",
		children: [{ text: "" }]
	}];

	useEffect (() => {
		setTimeout (() => {
			fetchLocalCopy ( body, editor );
		}, 500 );
	}, []);

	return (
		<div className="w-screen h-screen overflow-x-hidden">
			<Slate 
				editor={ editor } 
				value={ initialValue }
				className="w-screen h-screen">

				<EditorNavbar id={ id } titleRef={ titleRef } />
		
				<div className="mx-auto max-w-2xl">

					{/* Title Input */}
					<input 
						type="text"
						placeholder="Tell your story..."
						ref={ titleRef }
						defaultValue={ title }
						className="mt-24 p-4 w-full text-gray-dark font-serif text-5xl outline-none" />
					
					{/* Editor */}
					<Editable 
						renderElement={ renderElement }
						renderLeaf={ renderLeaf }
						placeholder="Start writing your article"
						autoFocus
						className="p-4 font-serif text-gray-dark break-all text-lg"
						onKeyDown={ e => {
							for ( const hotkey in HOTKEYS ) {

								// Checks if the keypress is a hotkey
								if ( isHotkey ( hotkey, e ) ) {

									// Prevents the hotkey from being entered and toggles the associated mark
									e.preventDefault ();
									toggleMark ( editor, HOTKEYS[hotkey] );
									return;
								}

							}

							saveLocalCopy ( editor );
						}}
					/>
				</div>
			</Slate>
		</div>
	)

}

export default ArticleEditor;