/**
 * The GEM Video Hook
 */

 import { firestore } from "./../lib/firebase"
 import { doc, getDoc, updateDoc } from "firebase/firestore";
 
 /**
  * A hook used to interact with videos from the client
  * 
  * @returns {Object} - The following functions:
  * 					 * likeVideo
  * 					 * dislikeVideo
  */
 const useVideo = () => {
 
	 /**
	  * Increments the like count of an video
	  * 
	  * @param {String} id - The video's UUID
	  * @async
	  * @returns {Promise} A promise
	  */
	 const likeVideo = async ( id ) => {
		 return new Promise ( async ( resolve, reject ) => {
 
			 // Gets the current like count
			 const videoRef = doc ( firestore, "videos", id );
			 const videoData = await getDoc ( videoRef );
 
			 // Checks if the video exists
			 if ( !videoData.exists () ) {
				 reject ({
					 status: "ERROR",
					 message: "Whoops something went wrong!",
					 data: {
						 error: {
							 message: "Video doesn't exist!",
							 code: "video/like-failed"
						 }
					 }
				 });
				 return;
			 } 
 
			 const video = videoData.data ();
 
			 // Updates the like count
			 await updateDoc ( videoRef, {
				 likeCount: ( video.likeCount || 0 ) + 1
			 });
 
			 resolve ({
				 status: "OK",
				 message: "Liked video!",
				 data: {
					 likeCount: video.likeCount + 1
				 }
			 });
		 });	
	 }
 
	 /**
	  * Decrements the like count of an video
	  * 
	  * @param {String} id - The video's ID
	  * @async
	  * @returns {Promise} A promise
	  */
	 const dislikeVideo = async ( id ) => {
		 return new Promise ( async ( resolve, reject ) => {
 
			 // Gets the current like count
			 const videoRef = doc ( firestore, "videos", id );
			 const videoData = await getDoc ( videoRef );
 
			 // Checks if the video exists
			 if ( !videoData.exists () ) {
				 reject ({
					 status: "ERROR",
					 message: "Whoops something went wrong!",
					 data: {
						 error: {
							 message: "Video doesn't exist!",
							 code: "video/dislike-failed"
						 }
					 }
				 });
				 return;
			 } 
 
			 const video = videoData.data ();
 
			 // Updates the like count
			 await updateDoc ( videoRef, {
				 likeCount: ( video.likeCount || 1 ) - 1
			 });
 
			 resolve ({
				 status: "OK",
				 message: "Disliked video!",
				 data: {
					 likeCount: video.likeCount - 1
				 }
			 });
		 })
	 }
 
	 return {
		 likeVideo,
		 dislikeVideo
	 }
 }
 
 export default useVideo;