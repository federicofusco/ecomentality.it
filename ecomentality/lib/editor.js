import { Editor, Text } from "slate"
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
	 * Toggles a specified mark in the given editor
	 * 
	 * @param {Object} editor - The editor object
	 * @param {String} format - The mark format 
	 */
	const toggleEditorMark = ( editor, format ) => {

		// Checks if the mark is already active
		if ( isMarkActive ( editor, format ) ) {
			
			// Disables the mark
			Editor.removeMark ( editor, format );
		} else {

			// Enables the mark
			Editor.addMark ( editor, format, true );

		}
	}

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

	function serializeEditor ( node ) {

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
		toggleEditorMark,
		saveLocalCopy,
		fetchLocalCopy,
		serializeEditor
	}
}

export default useEditor;