import isUrl from "is-url"
import { Transforms } from "slate"

const insertImage = ( editor, url ) => {
	const image = {
		type: "image",
		src: url,
		isVoid: true,
		children: [{text:""}]
	}
	Transforms.insertNodes ( editor, image );
}

const isImageUrl = ( url ) => {
	if ( !url ) return false;
	if ( !isUrl ( url ) ) return false;
	const ext = new URL ( url ).pathname.split ( "." ).pop ();
	return true;
}

const withImages = ( editor ) => {

	const { insertData, isVoid } = editor;

	editor.isVoid = ( element ) => {
		return element.type === "image" ? true : isVoid ( element );
	}

	editor.insertData = ( data ) => {

		const text = data.getData ( "text/plain" );
		const { files } = data;

		if ( files && files.length > 0 ) {

			// Loops through each file
			for ( const file of files ) {

				// Reads each file
				const reader = new FireReader ();
				const [mime] = file.type.split ( "/" );

				// Checks if the file is an image
				if ( mime === "image" ) {
					reader.addEventListener ( "load", () => {

						// Inserts the image
						const url = reader.result;
						insertImage ( editor, url );
					});

					reader.readAsDataUrl ( file );
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

export default withImages;


// import isUrl from "is-url"
// import isDataUri from "is-data-uri"
// import imageType from "image-type"
// import https from "https"
// import { Transforms, Editor } from "slate"

// const withImages = ( editor ) => {

// 	const { insertText, isVoid } = editor;
// 	const ALLOWED_EXTENSIONS = ["png", "jpg", "jpeg", "gif", "webp", "bmp", "ico"];

// 	editor.isVoid = ( element ) => {
// 		return element.type === "image" ? true : isVoid ( element ); 
// 	}

// 	const loadExternalImage = async ( url ) => {
// 		https.get ( url, response => {
// 			response.on ( 'readable', () => {
				
// 				// Reads the response
// 				const chunk = response.read ( imageType.minimumBytes );
// 				response.destroy ();

// 				// Checks if the extension is valid
// 				if ( ALLOWED_EXTENSIONS.includes ( imageType ( chunk ).ext ) ) {

// 					// Inserts the image
// 					Transforms.insertNodes ( editor, {
// 						type:"image", 
// 						src: url,
// 						isVoid: true,
// 						children: []
// 					});
// 				}
// 			});
// 		});
// 	}

// 	// Whenever the user types anything into the document
// 	editor.insertText = ( text ) => {

// 		// Checks if the text is a URL
// 		if ( isUrl ( text ) || isDataUri ( text ) ) {

// 			loadExternalImage ( text );

// 			return;
// 		}

// 		insertText ( text );
// 	}

// 	return editor;
// }

// export default withImages;


// // export function withMyPlugin(editor) {
// //     const { insertText, insertData, normalizeNode, isVoid, isInline } = editor;
  
// //     // called whenever text is inserted into the document (e.g. when
// //     // the user types something)
// //     editor.insertText = (text) => {
// //       // do something interesting!
// // 	  console.log("text",text);
// //       insertText(text);
// //     };
  
// //     // called when the users pastes or drags things into the editor
// //     editor.insertData = (data) => {
// //       // do something interesting!
// // 	  console.log("data", data)
// //       insertData(data);
// //     };
  
// //     // we'll dedicate a whole post to this one, but the gist is that it's used
// //     // to enforce your own custom schema to the document JSON
// //     editor.normalizeNode = (entry) => {
// //       // do something interesting!
// // 	  console.log("entry", entry);
// //       normalizeNode(entry);
// //     };
  
// //     // tells slate that certain nodes don't have any text content (they're _void_)
// //     // super handy for stuff like images and diagrams
// //     editor.isVoid = (element) => {
// //       if (element.type === 'image') {
// //         return true;
// //       }
// //       return isVoid(element);
// //     };
  
// //     // tells slate that certain nodes are inline and should flow with text, like
// //     // the link in our example above
// //     editor.isInline = (element) => {
// //       if (element.type === 'link') {
// //         return true;
// //       }
// //       return isInline(element);
// //     };
  
// //     return editor;
// //   }