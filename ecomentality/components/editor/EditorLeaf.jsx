/**
 * See SlateJS "rendering" documentation
 */
const EditorLeaf = ({ attributes, children, leaf }) => {
	return <span className={`
			${ leaf.bold ? "font-bold" : "" }
			${ leaf.italic ? "italic" : "" }
			${ leaf.underline ? "underline" : "" }
			${ leaf.code ? "font-mono" : "" }
		`} 
		{...attributes}>
		{ children }
	</span>
}

export default EditorLeaf;