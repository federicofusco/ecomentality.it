import useEditor from "../../lib/editor";
import { useSlate } from "slate-react";

/**
 * Displays a block toggle button for a given format
 * 
 * @param {String} param0 - The block format
 * @param {Object} icon - The icon component
 * @returns A block toggle button for a specific format
 */
const EditorBlockButton = ({ format, icon }) => {
	
	const { toggleBlock } = useEditor ();
	const editor = useSlate ();

	return (
		<button onClick={ e => {

			// Toggles the editor block
			e.preventDefault ();
			toggleBlock ( editor, format );
		}}>
			{ icon }
		</button>
	)
}

export default EditorBlockButton;