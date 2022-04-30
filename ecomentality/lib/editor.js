import { Editor, Text, Element, Transforms } from "slate"
import escapeHtml from "escape-html"

const useEditor = () => {

	/**
	 * Checks whether or not a specific mark is enabled
	 * 
	 * @param {Object} editor - The editor object
	 * @param {String} format - The format which should be checked
	 * @returns Whether or not the given mark is active
	 */
	const isMarkActive = ( editor, format ) => {
		const marks = Editor.marks ( editor );
		return marks[format] === true
	}

	/**
	 * Checks whether or not a specific block is enabled
	 * 
	 * @param {Object} editor - The editor object
	 * @param {String} format - The format which should be checked
	 * @returns Whether or not the given block is active
	 */
	const isBlockActive = ( editor, format, blockType = "type" ) => {

		if ( !editor.selection ) return false;

		const [match] = Array.from ( Editor.nodes ( editor , {
			at: Editor.unhangRange ( editor, editor.selection ),
			match: node => !Editor.isEditor ( node ) && Element.isElement ( node ) && node[blockType] === format
		}));

		return !!match;
	}

	/**
	 * Toggles a specified mark in the given editor
	 * 
	 * @param {Object} editor - The editor object
	 * @param {String} format - The mark format 
	 */
	const toggleMark = ( editor, format ) => {

		// Checks if the mark is already active
		if ( isMarkActive ( editor, format ) ) {
			
			// Disables the mark
			Editor.removeMark ( editor, format );
		} else {

			// Enables the mark
			Editor.addMark ( editor, format, true );

		}
	}

	const toggleBlock = ( editor, format, TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"], LIST_TYPES = ["numbered-list", "bulleted-list"] ) => {

		// Checks if the block is active and if it's a list
		const isActive = isBlockActive ( editor, format, TEXT_ALIGN_TYPES.includes ( format ) ? "align" : "type" );
		const isList = LIST_TYPES.includes ( format );

		Transforms.unwrapNodes ( editor, {
			match: node => !Editor.isEditor ( node ) && Element.isElement ( node ) && LIST_TYPES.includes ( node.type ) && !TEXT_ALIGN_TYPES.includes ( format ),
			split: true
		});

		let newProperties;
		if ( TEXT_ALIGN_TYPES.includes ( format ) ) newProperties = { align: isActive ? undefined : format }
		Transforms.setNodes ( editor, newProperties );
	
		if ( !isActive && isList ) {
			const block = { type: format, children: [] }
			Transforms.wrapNodes ( editor, block );
		}
	}

	/**
	 * Fetches editor from localStorage (if there is any) based on a given UUID
	 * 
	 * @param {String} id - The article's UUID
	 * @returns The editor node (editor content)
	 */
	const fetchLocalCopy = ( id ) => {

		if ( typeof window === "undefined" ) {
			return;
		}

		// Fetches the serialized data from localStorage (if it exists)
		const json = localStorage.getItem ( `localCopy-${ id }` );
		if ( !json ) {
			return;
		}

		return JSON.parse ( json ).data;
	}

	/**
	 * Saves the data in the editor to localStorage (for persistence)
	 * 
	 * @param {Object} editor - The editor object
	 * @param {String} id - The article's UUID
	 */
	const saveLocalCopy = ( editor, id ) => {

		if ( typeof window === "undefined" || editor.children.length > 0 ) {
			return;
		}
		
		// Serializes the data text in the editor andd saves it to localStorage
		const json = JSON.stringify ({
			data: editor.children
		});

		// Saves the serialized data to localStorage
		localStorage.setItem ( `localCopy-${ id }`, json );
	}

	/**
	 * Serializes any given node and its children
	 * 
	 * @param {Object} node - A slate node which needs to be serialized
	 * @returns A string representation of the given node
	 */
	const serializeEditor = ( node ) => {

		if ( Text.isText ( node ) ) {
			let string = escapeHtml ( node.text );
			
			// Leaf formatting
			if ( node.bold ) {
				string = `<strong>${ string }</strong>`;
			}
		
			if ( node.italic ) {
				string = `<em>${ string }</em>`;
			}
		
			if ( node.underline ) {
				string = `<u>${ string }</u>`;
			}
		
			if ( node.code ) {
				string = `<code>${ string }</code>`;
			}

			return string;
		}

		const children = node.children.map ( n => serializeEditor ( n ) ).join ( "" );
		
		switch ( node.type ) {
			case "block-quote":
				return `<blockquote>${ children }</blockquote>`;

			case "bulleted-list":
				return `<ul>${ children }</ul>`;

			case "heading-one":
				return `<h1>${ children }</h1>`;

			case "heading-two":
				return `<h2>${ children }</h2>`;
	
			case "list-item":
				return `<li>${ children }</li>`;
		
			case "numbered-list":
				return `<ol>${ children }</ol>`;
			
			default:
				return children;
		}

	}

	return {
		isMarkActive,
		toggleMark,
		saveLocalCopy,
		fetchLocalCopy,
		serializeEditor,
		isBlockActive,
		toggleBlock
	}
}

export default useEditor;