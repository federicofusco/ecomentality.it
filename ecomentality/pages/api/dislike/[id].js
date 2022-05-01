import { firestore } from "./../../../lib/firebase"
import { doc, updateDoc, getDoc } from "firebase/firestore"
import { isUUID } from "./../../../lib/auth.admin"

// Updates the like counter on a given article
const dislikeHandler = async ( req, res ) => {
	
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
	if ( ( article.likeCount || 0 ) === 0 ) {
		res.status ( 200 ).json ({
			message: "OK",
			status: 200
		});
		return;
	} 

	// Updates the like count
	await updateDoc ( articleRef, {
		likeCount: article.likeCount - 1
	});

	res.status ( 200 ).json ({
		message: "OK",
		status: 200
	});
}

export default dislikeHandler;