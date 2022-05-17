/**
 * The GEM Storage Hook
 */

import { storage } from "./../lib/firebase"
import { ref, uploadBytes, uploadString, getDownloadURL } from "firebase/storage"


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
			await uploadBytes ( dataRef, data )
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
		return new Promise ( async ( resolve, reject ) => {

			const dataRef = ref ( storage, addr );
			await uploadString ( dataRef, data )
				.then ( async () => {

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
							message: "Failed to get URL!",
							data: {
								error
							}
						}));
				})
				.catch ( error => reject ({
					status: "ERROR",
					message: "Failed to upload string!",
					data: {
						error
					}
				}));

		});
	}

	return {
		uploadUint8Array,
		uploadDataURL
	}
}

export default useStorage;