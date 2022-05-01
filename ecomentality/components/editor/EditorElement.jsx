const EditorElement = ({ attributes, children, element }) => {

	// Defines the styles which will be used
	const elementStyle = {
		textAlign: element.align
	}

	// Renders the component based on element.type
	switch ( element.type ) {
		default:
			return <p className="w-full mt-4" style={ elementStyle } {...attributes}>
					{ children }
				</p>
	}
}

export default EditorElement;