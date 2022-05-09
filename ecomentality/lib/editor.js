/**
 * The GEM Editor Lib
 */

const parse5 = require ( 'parse5' );

/**
 * Deserializes an HTML string into a valid JSON value for SlateJS
 * 
 * @param {String} data - The HTML string
 * @async
 * @returns {String} The deserialized HTML string
 */
export const deserializeEditor = async ( data ) => {

	let result = [];

	// Parses the html data
	const parsedData = parse5.parse ( data );

	/* Navigates the HTMLDocument */

	let root = [];
	const navigateTree = async ( node, props ) => {
		node.childNodes.forEach ( ( child ) => {

			if ( child.childNodes?.length > 0 ) {

				// Iterates through the children
				return navigateTree ( child, [...props, child.nodeName] );
			} else {

				// Found a root node
				root.push ( [child, [props]] );
			}
		});
	}

	await navigateTree ( parsedData, [] );

	for ( var y = 0; y < root.length; y++ ) {
		const node = root[y][0];
		const props = root[y][1][0];
		const PROP_MAP = {
			"em": "italic",
			"u": "underline",
			"code": "code",
			"strong": "bold"
		};

		switch ( node.nodeName ) {

			case "#text":
				var element = {
					type: "paragraph",
					children: [{ text: node.value }]
				};

				// Updates properties
				for ( var z = 0; z < props.length; z++ ) {
					if ( Object.keys ( PROP_MAP ).includes ( props[z] ) ) {
						element.children[0][PROP_MAP[props[z]]] = true;
					} 
				}

				result.push ( element );
				break;

			case "IMG": 
				result.push ({
					type: "image",
					isVoid: true,
					src: node.src,
					children: [{ text: "" }]
				});
				break;
		} 

	}

	return result;
}