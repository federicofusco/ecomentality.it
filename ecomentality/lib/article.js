/**
 * The GEM Article Lib
 */

import { firestore } from "./firebase"
import { doc, getDoc, getDocs, collection, query, where, limit } from "firebase/firestore";
import { deserializeEditor } from "./editor"

/**
 * Fetches an article based on its ID
 * 
 * @param {String} id - The article's UUID
 * @param {Boolean} deserialize - Whether or not the body of the article should be deserialized
 * @async
 * @returns {Promise} A promise
 */
export const fetchArticle = async ( id, deserialize ) => {
	return new Promise ( async ( resolve, reject ) => {

		try {

			// Fetches the article
			const articleData = await getDoc ( doc ( firestore, "articles", id ) );
	
			// Checks if the article exists
			if ( !articleData.exists () ) {
				
				// The article doesn't exist
				reject ({
					status: "ERROR",
					message: "The article doesn't exist!",
					data: {}
				});
			} else {
	
				// Found the article
				const { title, body, author, likeCount, timestamp } = articleData.data ();
				resolve ({
					status: "OK",
					message: "Found article!",
					data: {
						article: {
							title,
							body: deserialize ? await deserializeEditor ( body ) : body,
							author,
							likeCount: likeCount || 0,
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

/**
 * Fetches all the articles which match a given query
 * 
 * NOTE: See the Firestore query documentation
 * 
 * @param {String} key - The query key
 * @param {String} operation - The query operation (e.i "==", "=>", etc)
 * @param {String} value - The query operation value
 * @async 
 * @returns {Array} The articles which match the query
 */
export const fetchArticles = async ( key, operation, value ) => {
	return new Promise ( async ( resolve, reject ) => {

		const FEATURED_ARTICLE_IDS = [
			"3145c6d0-a7fb-4aeb-8b47-f4fa89598265"
		]

		try {

			const articleCollection = collection ( firestore, "articles" );
			const articleQuery = query ( articleCollection, where ( key, operation, value ) );

			let articles = [];
			const articleData = await getDocs ( articleQuery );
			articleData.forEach (( article ) => { 
				const { title, body, author, likeCount, timestamp } = article.data ();
				articles.push ({ 
					title,
					body, 
					author, 
					likeCount: likeCount || 0, 
					timestamp: String ( timestamp.toDate () ),
					id: article.id
				});
			});

			// Reorders the id list to make sure the "featured" articles are the first ones
			for ( var x = 0; x < ids.length; x++ ) {

				// Checks if the article is featured
				if ( !FEATURED_ARTICLE_IDS.includes ( ids[x] ) ) continue;
 
				// Moves the featured article to the beginning
				ids.unshift ( ids[x] );
				ids.splice ( x + 1, 1 );
			}

			// Found the articles
			resolve ({
				status: "OK",
				message: "Found article!",
				data: {
					articles
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

/**
 * Fetches all of the article ids in the articles/ collection
 * 
 * @returns {Array} An array containing all of the ids
 */
export const fetchArticleIds = async () => {
	return new Promise ( async ( resolve, reject ) => {

		const FEATURED_ARTICLE_IDS = [
			"3145c6d0-a7fb-4aeb-8b47-f4fa89598265"
		]

		try {

			const articleCollection = collection ( firestore, "articles" );

			// Fetches all the ids
			const ids = [];
			const collectionData = await getDocs ( articleCollection );

			collectionData.forEach ( article => ids.push ( article.id ) );

			// Reorders the id list to make sure the "featured" articles are the first ones
			for ( var x = 0; x < ids.length; x++ ) {

				// Checks if the article is featured
				if ( !FEATURED_ARTICLE_IDS.includes ( ids[x] ) ) continue;
 
				// Moves the featured article to the beginning
				ids.unshift ( ids[x] );
				ids.splice ( x + 1, 1 );
			}

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

/**
 * Fetches all the articles
 * 
 * @param {?Number} articleLimit - The limit of articles to fetch (default: null)
 * @async 
 * @returns {Array} The articles 
 */
 export const fetchAllArticles = async ( articleLimit = null ) => {
	return new Promise ( async ( resolve, reject ) => {

		const FEATURED_ARTICLE_IDS = [
			"3145c6d0-a7fb-4aeb-8b47-f4fa89598265"
		]

		try {

			const articleCollection = collection ( firestore, "articles" );

			// Refactor this to not repeat code
			if ( articleLimit ) {

				const articleQuery = query ( articleCollection, limit ( articleLimit ) );

				let articles = [];
				const articleData = await getDocs ( articleQuery );
				articleData.forEach (( article ) => { 
					const { title, body, author, likeCount, timestamp } = article.data ();
					articles.push ({ 
						title,
						body, 
						author, 
						likeCount: likeCount || 0, 
						timestamp: String ( timestamp.toDate () ),
						id: article.id
					});
				});

				// Reorders the article list to make sure the "featured" articles are the first ones
				for ( var x = 0; x < articles.length; x++ ) {

					// Checks if the article is featured
					if ( !FEATURED_ARTICLE_IDS.includes ( articles[x].id ) ) continue;
	
					// Moves the featured article to the beginning
					articles.unshift ( articles[x] );
					articles.splice ( x + 1, 1 );
				}

				// Found the articles
				resolve ({
					status: "OK",
					message: "Found article!",
					data: {
						articles
					}
				});
				return;
			}

			let articles = [];
			const articleData = await getDocs ( articleCollection );
			articleData.forEach (( article ) => { 
				const { title, body, author, likeCount, timestamp } = article.data ();
				articles.push ({ 
					title,
					body, 
					author, 
					likeCount: likeCount || 0, 
					timestamp: String ( timestamp.toDate () ),
					id: article.id
				});
			});

			// Reorders the article list to make sure the "featured" articles are the first ones
			for ( var x = 0; x < articles.length; x++ ) {

				// Checks if the article is featured
				if ( !FEATURED_ARTICLE_IDS.includes ( articles[x].id ) ) continue;
 
				// Moves the featured article to the beginning
				articles.unshift ( articles[x] );
				articles.splice ( x + 1, 1 );
			}

			// Found the articles
			resolve ({
				status: "OK",
				message: "Found article!",
				data: {
					articles
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