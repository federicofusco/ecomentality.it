import { firestore } from "./firebase"
import { getDocs, collection, query,  } from "firebase/firestore";

export const fetchAllArts = async ( ) => {
	return new Promise ( async ( resolve, reject ) => {

		try {

			const artCollection = collection ( firestore, "arts" );



			let arts = [];
			const artData = await getDocs ( artCollection );
			artData.forEach (( art ) => { 
				const { title, author, link } = art.data ();
				arts.push ({ 
					title,
					author, 
					link,
					id: art.id
				});
			});

			// Found the articles
			resolve ({
				status: "OK",
				message: "Found arts!",
				data: {
					arts
				}
			});

		} catch ( error ) {

			console.error ( error );

			reject ({
				status: "ERROR",
				message: "Something went wrong!",
				data: {
					error
				}
			});
		}

	});
} 