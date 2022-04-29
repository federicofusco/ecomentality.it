import { createEditor } from "slate"
import { Slate, Editable, withReact } from "slate-react"
import { useState } from "react"

const ArticleEditor = ({ id }) => {

	// Creates a new editor object
	const [editor] = useState (() => withReact ( createEditor () ) );

	// Defines a placeholder which will be used in the absence of text
	const placeholder = [
		{
			type: "paragraph",
			children: [{
				text: "Placeholder..." 
			}]
		}
	];

	return (
		<Slate editor={ editor } value={ placeholder }>
			<Editable />
		</Slate>
	)
}

export default ArticleEditor;