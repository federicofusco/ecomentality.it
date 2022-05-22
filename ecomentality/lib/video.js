/**
 * The GEM Video Lib
 */

import { firestore } from "./firebase"
import { doc, getDoc, getDocs, collection, query, limit } from "firebase/firestore";
import { deserializeEditor } from "./editor"

export const fetchVideo = async ( id, deserialize ) => {
	return new Promise ( async ( resolve, reject ) => {

		try {

			// Fetches the video
			const videoData = await getDoc ( doc ( firestore, "videos", id ) );
	
			// Checks if the video exists
			if ( !videoData.exists () ) {
				
				// The video doesn't exist
				reject ({
					status: "ERROR",
					message: "The video doesn't exist!",
					data: {}
				});
			} else {
	
				// Found the video
				const { title, likeCount, body, author, link, timestamp } = videoData.data ();
				resolve ({
					status: "OK",
					message: "Found video!",
					data: {
						video: {
							title,
							likeCount,
							body: deserialize ? await deserializeEditor ( body ) : body,
							author,
							link,
							timestamp: String ( timestamp.toDate () ),
							id
						}
					}
				});
			}
	
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

export const fetchAllVideoIds = async () => {
	return new Promise ( async ( resolve, reject ) => {

		try {

			const videoCollection = collection ( firestore, "videos" );

			// Fetches all the ids
			const ids = [];
			const collectionData = await getDocs ( videoCollection );

			collectionData.forEach ( video => ids.push ( video.id ) );

			resolve ({
				status: "OK",
				message: "Fetched all ids!",
				data: {
					ids
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

export const fetchAllVideos = async ( videoLimit ) => {
	return new Promise ( async ( resolve, reject ) => {

		try {

			const videoCollection = collection ( firestore, "videos" );

			// Refactor this to not repeat code
			if ( videoLimit ) {

				const videoQuery = query ( videoCollection, limit ( videoLimit ) );

				let videos = [];
				const videoData = await getDocs ( videoQuery );
				videoData.forEach (( video ) => { 
					const { title, likeCount, body, author, link, timestamp } = video.data ();
					videos.push ({ 
						title,
						likeCount,
						body, 
						author, 
						link,
						timestamp: String ( timestamp.toDate () ),
						id: video.id
					});
				});

				// Found the videos
				resolve ({
					status: "OK",
					message: "Found videos!",
					data: {
						videos
					}
				});
				return;
			}

			let videos = [];
			const videoData = await getDocs ( videoCollection );
			videoData.forEach (( video ) => { 
				const { title, likeCount, body, author, link, timestamp } = video.data ();
				videos.push ({ 
					title,
					likeCount,
					body, 
					author, 
					link,
					timestamp: String ( timestamp.toDate () ),
					id: video.id
				});
			});

			// Found the videos
			resolve ({
				status: "OK",
				message: "Found videos!",
				data: {
					videos
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