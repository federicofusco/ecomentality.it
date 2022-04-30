const EditorElement = ({ attributes, children, element }) => {

	// Defines the styles which will be used
	const elementStyle = {
		textAlign: element.align
	}

	// Renders the component based on element.type
	switch ( element.type ) {
		case "block-quote":
			return (
				<blockquote style={ elementStyle } {...attributes}>
					{ children }
				</blockquote>
			)
		case "bulleted-list":
			return (
				<ul style={ elementStyle } {...attributes}>
					{ children }
				</ul>
			)
		case "heading-one":
			return (
				<h1 style={ elementStyle } {...attributes}>
					{ children }
				</h1>
			)
		case "heading-two":
			return (
				<h2 style={ elementStyle } {...attributes}>
					{ children }
				</h2>
			)
		case "list-item":
			return (
				<li style={ elementStyle } {...attributes}>
					{ children }
				</li>
			)
		case "numbered-list":
			return (
				<ol style={ elementStyle } {...attributes}>
					{ children }
				</ol>
			)
		default:
			return (
				<p style={ elementStyle } {...attributes}>
					{ children }
				</p>
			)
	}
}

export default EditorElement;