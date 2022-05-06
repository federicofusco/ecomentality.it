import { firestore } from "./../../../lib/firebase"
import { doc, updateDoc, getDoc } from "firebase/firestore"
import { isUUID } from "./../../../lib/auth"

/**
 * Increments a given article's like count
 * 
 * @param {Object} req - The HTTPS request
 * @param {Object} res - The HTTPS response
 * @async
 */
const likeHandler = async ( req, res ) => {
	
	// Checks if the id is valid
	if ( !isUUID ( req.query.id ) ) {
		res.status ( 400 ).json ({
			message: "The article ID is invalid!",
			status: 400
		});
		return;
	}

	// Gets the current like count
	const articleRef = doc ( firestore, "articles", req.query.id );
	const articleData = await getDoc ( articleRef );

	// Checks if the article exists
	if ( !articleData.exists () ) {
		res.status ( 404 ).json ({
			message: "The article doesn't exist!",
			status: 404
		});
		return;
	} 

	const article = articleData.data ();

	// Updates the like count
	await updateDoc ( articleRef, {
		likeCount: ( article.likeCount || 0 ) + 1
	});

	res.status ( 200 ).json ({
		message: "OK",
		status: 200
	});
}

export default likeHandler;