/**
 * The GEM Editor Hook
 */

import { Editor, Text, Transforms } from "slate"
import isUrl from "is-url"
import DOMPurify from "isomorphic-dompurify"
import useLocalStorage from "./localStorage"

/**
 * A hook used to interact with the editor from the client
 * 
 * @param {String} id - The article's ID
 * @returns {Object} - The following functions:
 * 					 * withImages
 * 					 * isMarkActive
 * 					 * toggleMark 
 * 					 * fetchLocalCopy
 * 					 * saveLocalCopy
 * 					 * insertImage
 * 					 * isImageUrl
 * 					 * serializeEditor
 */
const useEditor = ( id ) => {

	const [localCopy, setLocalCopy] = useLocalStorage ( id, "" );

	/**
	 * An image plugin for the editor
	 * 
	 * @param {Object} editor - The editor object
	 * @returns An editor with image support
	 */
	const withImages = ( editor ) => {

		const { insertData, isVoid } = editor;
	
		/**
		 * Sets image elements as void
		 */
		editor.isVoid = ( element ) => {
			return element.type === "image" ? true : isVoid ( element );
		}
	
		/**
		 * Intercepts any data inserted by the user
		 * and inserts it as an image
		 */
		editor.insertData = ( data ) => {
	
			const text = data.getData ( "text/plain" );
			const { files } = data;
	
			if ( files && files.length > 0 ) {
	
				// Loops through each file
				for ( const file of files ) {
	
					// Reads each file
					const reader = new FileReader ();
					const [mime] = file.type.split ( "/" );
	
					// Checks if the file is an image
					if ( mime === "image" ) {
						reader.addEventListener ( "load", () => {
							
							// Inserts the image
							const url = reader.result;
							insertImage ( editor, url );
						});
	
						reader.readAsDataURL ( file );
					}
				}
			} else if ( isImageUrl ( text ) ) {
	
				// Inserts the image
				insertImage ( editor, text );
			} else {
	
				// Data isn't an image or file,
				insertData ( data );
			}
		}
		
		return editor;
	}

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
	 * @param {String|Object} body - The article's body 
	 * @param {String} editor - The editor object
	 * @returns The editor node (editor content)
	 */
	const fetchLocalCopy = ( body, editor ) => {

		// Get initial total nodes to prevent deleting affecting the loop
		const totalNodes = editor.children.length;

		// No saved content, don't delete anything to prevent errors
		if ( !localCopy ) return;

		// Checks if the local copy is up to date
		if ( localCopy === body ) return;

		// Remove every node except the last one
		// Otherwise SlateJS will return error as there's no content
		for ( let i = 0; i < totalNodes - 1; i++ ) {
			Transforms.removeNodes ( editor, {
				at: [totalNodes - i - 1],
			});
		}
	
		// Add content to SlateJS
		for ( const value of localCopy.data ) {
			Transforms.insertNodes ( editor, value, {
				at: [editor.children.length],
			});
		}
	
		// Remove the last node that was leftover from before
		Transforms.removeNodes ( editor, {
			at: [0],
		});
	}

	/**
	 * Saves the data in the editor to localStorage (for persistence)
	 * 
	 * @param {Object} editor - The editor object
	 */
	const saveLocalCopy = ( editor ) => {

		// Serializes the data text in the editor and saves it to localStorage
		setLocalCopy ({ data: editor.children });
	}
	
	/**
	 * Inserts an image into the editor
	 * 
	 * @param {Object} editor - The editor object
	 * @param {String} url - The image's URL
	 */
	const insertImage = ( editor, url ) => {
		Transforms.insertNodes ( editor, {
			type: "image",
			src: url,
			isVoid: true,
			children: [{ text: "" }]
		}, {
			at: [editor.children.length]
		});
	}
	
	/**
	 * Checks whether or not a URL leads to an image
	 * TODO: ADD EXT CHECK
	 * 
	 * @param {String} url - The image's URL
	 * @returns {Boolean} Whether or not the URL is an image
	 */
	const isImageUrl = ( url ) => {
		if ( !url ) return false;
		if ( !isUrl ( url ) ) return false;
		return true;
	}

	/**
	 * Serializes any given node and its children
	 * 
	 * @param {Object} node - A slate node which needs to be serialized
	 * @returns A string representation of the given node
	 */
	const serializeEditor = ( node ) => {

		if ( Text.isText ( node ) ) {
			let string = `<p class="w-full mt-4">${ DOMPurify.sanitize ( node.text ) }</p>`;
			
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

			case "image": 
				return `<div class="w-full flex justify-center"><img src=${ node.src } className="block max-w-full w-auto max-h-80 h-full select-none" /></div>`;
			
			default:
				return children;
		}

	}

	return {
		withImages,
		isMarkActive,
		toggleMark,
		saveLocalCopy,
		fetchLocalCopy,
		insertImage,
		isImageUrl,
		serializeEditor
	}
}

export default useEditor;