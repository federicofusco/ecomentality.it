import { useCallback, useRef, useState } from "react"
import { Editable, Slate, withReact } from "slate-react"
import { createEditor } from "slate"
import { isHotkey } from "is-hotkey"
import EditorElement from "./EditorElement"
import EditorLeaf from "./EditorLeaf"
import useEditor from "../../lib/editor"
import Toolbar from "./Toolbar"


/**
 * An editor for articles
 * 
 * @param {String} articleId - The article's UUID
 * @returns An article editor
 */
const ArticleEditor = ({ articleId }) => {

	const { toggleMark, saveLocalCopy, fetchLocalCopy } = useEditor ();

	// Defines the editor values
	const HOTKEYS = {
		"mod+b": "bold",
		"mod+i": "italic",
		"mod+k": "code",
		"mod+u": "underline"
	};

	// Defines the editor and its elements
	const renderElement = useCallback ( x => <EditorElement {...x} /> );
	const renderLeaf = useCallback ( x => <EditorLeaf {...x} /> );
	const [editor] = useState ( withReact ( createEditor () ) );

	const titleRef = useRef ();

	// Defines the editor's initial value (placeholder)
	const initialValue = fetchLocalCopy ( articleId ) || [{
		type: "paragraph",
		children: [{
			text: ""
		}]
	}];

	return (
		<div className="w-screen h-screen">
			<Slate 
				editor={ editor } 
				value={ initialValue }
				className="w-screen h-screen">

				<Toolbar articleId={ articleId } articleTitleRef={ titleRef } />
		
				<div className="mx-auto max-w-2xl">

					{/* Title Input */}
					<input 
						type="text"
						placeholder="Tell your story..."
						ref={ titleRef }
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
									const mark = HOTKEYS[hotkey];
									toggleMark ( editor, mark );
									return;
								}
							}

							saveLocalCopy ( editor, articleId );
						}}
					/>
				</div>
			</Slate>
		</div>
	)

}

export default ArticleEditor;














// import { createEditor } from "slate"
// import { Slate, Editable, withReact } from "slate-react"
// import { useState, useMemo } from "react"

// const ArticleEditor = ({ id }) => {

// 	// Creates a new editor object
// 	const [editor] = useState (() => withReact ( createEditor () ) );

// 	/**
// 	 * Updates the local copy of the text in the editor to
// 	 * maintain data even if the page refreshes
// 	 * 
// 	 * @param {Object} value - The current editor state
// 	 */
// 	const saveLocalCopy = ( value ) => {

// 		// Determines if the actual text has changed
// 		const isValidChange = editor.operations.some ( x => "set_selection" !== x.type );

// 		if ( isValidChange ) {

// 			// Saves the value to localStorage
// 			localStorage.setItem ( `localCopy-${ id }`, JSON.stringify ( value ) );
// 		} 
// 	}

// 	// Defines a placeholder which will be used in the absence of text
// 	const placeholder = useMemo (() => {

// 		if ( typeof window === "undefined" ) {
// 			return [{
// 				type: "paragraph",
// 				children: [{
// 					text: "Placeholder..."
// 				}]
// 			}];
// 		}

// 		return JSON.parse ( localStorage.getItem ( `localCopy-${ id }` ) ) || [{
// 			type: "paragraph",
// 			children: [{
// 				text: "Placeholder..."
// 			}]
// 		}]
// 	}, []);

// 	return (
// 		<Slate 
// 			editor={ editor } 
// 			value={ placeholder }
// 			onChange={() => saveLocalCopy ()}
// 		>
// 			<Editable />
// 		</Slate>
// 	)
// }

// export default ArticleEditor;