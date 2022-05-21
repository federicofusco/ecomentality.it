/**
 * The GEM Storage Hook
 */

import { storage } from "./../lib/firebase"
import { ref, uploadBytes, uploadString, getDownloadURL } from "firebase/storage"
import imageType from "image-type"

const dataUriToUint8Array = ( data ) => {

	const BASE64_MARKER = ";base64,";

	var base64Index = data.indexOf ( BASE64_MARKER ) + BASE64_MARKER.length;
	var base64 = data.substring ( base64Index );
	var raw = window.atob ( base64 );
	var rawLength = raw.length;
	var array = new Uint8Array ( new ArrayBuffer ( rawLength ) );;

	for ( let x = 0; x < rawLength; x++ ) {
		array[x] = raw.charCodeAt ( x );
	}

	return array;
}


/**
 * A hook used to interact with Firebase Storage from the client
 * 
 * @returns {Object} - The following functions:
 * 					 * uploadUint8Array
 */
const useStorage = () => {

	const uploadUint8Array = async ( data, addr ) => {
		return new Promise ( async ( resolve, reject ) => {

			const dataRef = ref ( storage, addr );
			await uploadBytes ( dataRef, data, {
				contentType: imageType ( data ).mime
			})
				.then ( async ( result ) => {

					// Fetches the download URL
					await getDownloadURL ( dataRef )
						.then ( url => resolve ({
							status: "OK",
							message: "Uploaded image!",
							data: {
								url
							}
						}))
						.catch ( error => reject ({
							status: "ERROR",
							message: "Failed to array URL!",
							data: {
								error
							}
						}));
				})
				.catch ( error => reject ({
					status: "ERROR",
					message: "Failed to upload array!",
					data: {
						error
					}
				}));

		});
	}

	const uploadDataURL = async ( data, addr ) => {
		return await uploadUint8Array ( dataUriToUint8Array ( data ), addr );
	}

	return {
		uploadUint8Array,
		uploadDataURL
	}
}

export default useStorage;