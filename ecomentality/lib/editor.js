import { Editor, Text, Transforms } from "slate"
import DOMPurify from "dompurify"
import isUrl from "is-url"

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
		return marks[format] === true ? true : false;
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
			let string = `<p class="w-full mt-4">${DOMPurify.sanitize ( node.text )}</p>`;
			
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
			
			default:
				return children;
		}

	}
	
	/**
	 * Inserts an image into the editor
	 * 
	 * @param {Object} editor - The editor object
	 * @param {String} url - The image's URL
	 */
	const insertImage = ( editor, url ) => {
		const image = {
			type: "image",
			src: url,
			isVoid: true,
			children: [{ text: "" }]
		}
		Transforms.insertNodes ( editor, image );
	}
	
	/**
	 * Checks whether or not a URL leads to an image
	 * TODO: ADD EXT CHECK
	 * 
	 * @param {String} url - The image's URL
	 * @returns Whether or not the URL is an image
	 */
	const isImageUrl = ( url ) => {
		if ( !url ) return false;
		if ( !isUrl ( url ) ) return false;
		return true;
	}

	return {
		isMarkActive,
		toggleMark,
		saveLocalCopy,
		fetchLocalCopy,
		serializeEditor,
		insertImage,
		isImageUrl
	}
}

export default useEditor;