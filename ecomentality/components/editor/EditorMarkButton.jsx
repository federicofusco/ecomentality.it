import useEditor from "./../../lib/editor";
import { useSlate } from "slate-react"

// TODO: ADD BUTTON ENABLE?DISABLE BASED ON MARK STATUS

/**
 * Displays a toggle button forr a specified mark
 * 
 * @param {String} format - The mark format
 * @param {Object} icon - The button's icon
 * @returns A toggle button for a given mark
 */
const EditorMarkButton = ({ format, icon }) => {

	const { toggleMark } = useEditor ();
	const editor = useSlate ();

	return (
		<button onClick={ e => {
				
			// Toggles the mark
			e.preventDefault ();
			toggleMark ( editor, format );
		}}>
			{ icon }
		</button>
	)
}

export default EditorMarkButton;