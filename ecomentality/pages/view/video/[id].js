// import Article from "../../../components/article/Article"
import { isUUID } from "./../../../lib/auth.admin"
import { firestore } from "../../../lib/firebase"
import { getDoc, doc } from "firebase/firestore"

const ViewVideo = ({ video }) => {
	return (
		<div>
            <h1>{video.title}</h1>
            <p>{video.body}</p>
            <h1>{video.title}</h1>
            <iframe 
                width="560" 
                height="315" 
                src={video.link} 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
            </iframe>
            
			{/* <Article article={ article } /> */}
		</div>
	)
}

export const getServerSideProps = async ( context ) => {
	
	// Verifies that the video UUID is valid
	if ( !isUUID ( context.params.id ) ) {

		// The article doesn't exist
		return {
			redirect: {
				destination: "/error/404",
				permanent: false
			}
		};
	}
    
	try {

		// Fetches the article
		const videoData = await getDoc ( doc ( firestore, "videos", context.params.id ) );

		// Checks if the article exists
		if ( !videoData.exists () ) {
			
			// The article doesn't exist
			return {
				notFound: true
			}
		} else {

			// Found the article
			const { title, body, author, link } = videoData.data ();
			return {
				props: {
					video: {
						title: title,
						body: body,
						author: author,
						link: link,
						id: context.params.id
					}
				}
			}
		}

	} catch ( error ) {

		console.error ( error );

		return {
			notFound: true
		}
	}

}

export default ViewVideo;