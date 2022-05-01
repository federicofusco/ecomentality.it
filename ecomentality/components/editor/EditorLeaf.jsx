const EditorLeaf = ({ attributes, children, leaf }) => {

	if ( leaf.bold ) {
		children = (
			<strong>
				{ children }
			</strong>
		)
	}

	if ( leaf.italic ) {
		children = (
			<em>
				{ children }
			</em>
		)
	}

	if ( leaf.underline ) {
		children = (
			<u>
				{ children }
			</u>
		)
	}

	if ( leaf.code ) {
		children = (
			<div className="inline-block bg-gray-200 rounded-md px-1 mx-1">
				<code>{ children }</code>
			</div>
		)
	}

	return <span {...attributes}>
		{ children }
	</span>
}

export default EditorLeaf;