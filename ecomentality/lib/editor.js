import { Editor, Text, Transforms } from "slate"
import isUrl from "is-url"
import { useState } from "react"
import { useSnackbar } from "notistack"

/**
 * Author: https://usehooks.com/useLocalStorage/
 * Modified: Federico Fusco
 * 
 * @param {String} key - The localStorage key
 * @param {String} initialValue - The state's initial value
 * @returns A persistent state
 */
const useLocalStorage = ( key, initialValue ) => {

	const { enqueueSnackbar } = useSnackbar ();

	// State to store our value
	// Pass initial state function to useState so logic is only executed once
	const [storedValue, setStoredValue] = useState (() => {
		if ( typeof window === "undefined" ) {
			return initialValue;
		}
  
		try {
			// Get from local storage by key
			const item = window.localStorage.getItem ( key );

			// Parse stored json or if none return initialValue
			return item ? JSON.parse ( item ) : initialValue;
		} catch ( error ) {
			// If error also return initialValue
			enqueueSnackbar ( "Failed to save draft", {
				variant: "error"
			});

			return initialValue;
		}
	});
  
	// Return a wrapped version of useState's setter function that ...
	// ... persists the new value to localStorage.
	const setValue = ( value ) => {
		try {

			// Allow value to be a function so we have same API as useState
			const valueToStore = value instanceof Function ? value ( storedValue ) : value;

			// Save state
			setStoredValue ( valueToStore );

			// Save to local storage
			if ( typeof window !== "undefined" ) {
				window.localStorage.setItem ( key, JSON.stringify ( valueToStore ) );
			}
		} catch ( error ) {

			// A more advanced implementation would handle the error case
			console.log ( error );
		}
	};
  
	return [storedValue, setValue];
}

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
	 * @param {String} editor - The editor object
	 * @returns The editor node (editor content)
	 */
	const fetchLocalCopy = ( article, editor ) => {

		// Get initial total nodes to prevent deleting affecting the loop
		const totalNodes = editor.children.length;

		// No saved content, don't delete anything to prevent errors
		if ( !localCopy ) return;

		// Checks if the local copy is up to date
		if ( localCopy === article.body ) return;

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
	 * @returns Whether or not the URL is an image
	 */
	const isImageUrl = ( url ) => {
		if ( !url ) return false;
		if ( !isUrl ( url ) ) return false;
		return true;
	}

	return {
		withImages,
		isMarkActive,
		toggleMark,
		saveLocalCopy,
		fetchLocalCopy,
		insertImage,
		isImageUrl
	}
}

export default useEditor;