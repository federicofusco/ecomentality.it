/**
 * The GEM Storage Lib
 */

import { storage } from "./firebase"
import { ref, getDownloadURL } from "firebase/storage"

export const fetchUserProfile = async ( profile ) => {
	return new Promise ( async ( resolve, reject ) => {
		
		// Gets the profile image ref
		const profileRef = ref ( storage, `profiles/${ profile }` );

		// Fetches the download URL
		await getDownloadURL ( profileRef )
			.then ( url => resolve ({
				status: "OK",
				message: "Fetched profile!",
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
		
	});
}