import EditorBlockButton from "./EditorBlockButton";
import EditorMarkButton from "./EditorMarkButton";
import { MdFormatBold, MdFormatItalic, MdCode, MdFormatUnderlined, MdFormatAlignLeft, MdFormatAlignCenter, MdFormatAlignRight, MdFormatAlignJustify } from "react-icons/md"

/**
 * Displays a toolbar for a SlateJS editor
 */
const EditorToolbar = () => {
	return <div>
		<EditorMarkButton format="bold" icon={ <MdFormatBold /> } />
		<EditorMarkButton format="italic" icon={ <MdFormatItalic /> } />
		<EditorMarkButton format="underline" icon={ <MdFormatUnderlined /> } />
		<EditorMarkButton format="code" icon={ <MdCode /> } />
		<EditorBlockButton format="left" icon={ <MdFormatAlignLeft /> } />
		<EditorBlockButton format="center" icon={ <MdFormatAlignCenter /> } />
		<EditorBlockButton format="right" icon={ <MdFormatAlignRight /> } />
		<EditorBlockButton format="justify" icon={ <MdFormatAlignJustify /> } />
	</div>
}

export default EditorToolbar;
