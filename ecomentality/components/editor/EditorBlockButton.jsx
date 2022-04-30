import useEditor from "../../lib/editor";
import { useSlate } from "slate-react";

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