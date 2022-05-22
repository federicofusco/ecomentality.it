import DOMPurify from "isomorphic-dompurify"

const VideoBody = ({ body, link }) => {
	return (
		<>
			<div className="w-full flex justify-center">
				<iframe 
					width="560"  
					height="315" 
					src={ link } 
					title="YouTube video player" 
					frameBorder="0" 
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
					allowFullScreen>
				</iframe>
			</div>
			<div className="font-serif break-all px-8" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize ( body ) }}></div>
		</>
	)
}

export default VideoBody;