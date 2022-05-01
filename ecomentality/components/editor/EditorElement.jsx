import ArticleImage from "./../article/ArticleImage";

const EditorElement = ( props ) => {

	const { attributes, children, element } = props;

	// Defines the styles which will be used
	const elementStyle = {
		textAlign: element.align
	}

	// Renders the component based on element.type
	switch ( element.type ) {

		case "image":
			return <ArticleImage {...props}/>

		default:
			return <p className="w-full mt-4" style={ elementStyle } {...attributes}>{ children }</p>
	}
}

export default EditorElement;