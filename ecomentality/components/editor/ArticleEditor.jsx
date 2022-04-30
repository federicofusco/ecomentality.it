import { useCallback, useMemo } from "react"
import { Editable, Slate, withReact } from "slate-react"
import { createEditor, Element as SlateElement } from "slate"
import { isHotkey } from "is-hotkey"
import EditorElement from "./EditorElement"
import EditorLeaf from "./EditorLeaf"
import EditorToolbar from "./EditorToolbar"
import EditorMarkButton from "./EditorMarkButton"
import useEditor from "../../lib/editor"

import { FiBold, FiItalic, FiCode, FiUnderline } from "react-icons/fi"

/**
 * An editor for articles
 * 
 * @param {String} id - The article's UUID
 * @returns An article editor
 */
const ArticleEditor = ({ id }) => {

	const { toggleEditorMark, saveLocalCopy, fetchLocalCopy } = useEditor ();

	// Defines the editor values
	const LIST_TYPES = ["numbered-list", "bulleted-list"];
	const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];
	const HOTKEYS = {
		"mod+b": "bold",
		"mod+i": "italic",
		"mod+`": "code",
		"mod+u": "underline"
	};

	// Defines the editor and its elements
	const renderElement = useCallback ( x => <EditorElement {...x} /> );
	const renderLeaf = useCallback ( x => <EditorLeaf {...x} /> );
	const editor = useMemo ( () => withReact ( createEditor () ) );

	// Defines the editor's initial value (placeholder)
	const initialValue = fetchLocalCopy ( id ) || [{
		type: "paragraph",
		children: [{
			text: "THE REACT GODS SHALL BOW DOWN BEFORE MY KNEES",
			bold: true
		}]
	}];

	return (
		<Slate editor={ editor } value={ initialValue }>
			<EditorToolbar>
				<EditorMarkButton format="bold" icon={ <FiBold /> } />
				<EditorMarkButton format="italic" icon={ <FiItalic /> } />
				<EditorMarkButton format="underline" icon={ <FiUnderline /> } />
				<EditorMarkButton format="code" icon={ <FiCode /> } />
			</EditorToolbar>
			<Editable 
				renderElement={ renderElement }
				renderLeaf={ renderLeaf }
				placeholder="Start writing your article"
				autoFocus
				onKeyDown={ e => {
					for ( const hotkey in HOTKEYS ) {

						// Checks if the keypress is a hotkey
						if ( isHotkey ( hotkey, e ) ) {

							// Prevents the hotkey from being entered and toggles the associated mark
							e.preventDefault ();
							const mark = HOTKEYS[hotkey];
							toggleEditorMark ( editor, mark );
							return;
						}
					}

					saveLocalCopy ( editor, id );
				}}
			/>
		</Slate>
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