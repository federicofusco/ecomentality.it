/**
 * Displays an video's header
 * 
 * @param {String} title - The video's title
 * @param {String} timestamp - The video's publish datestring
 * @param {String} author - The author's displayName
 * @returns Displays a header for a given video
 */
 const VideoTitle = ({ title, timestamp, author }) => {

	const date = new Date ( timestamp );

	return (
		<div className="mt-24 px-8 py-4 w-full text-gray-dark font-serif">
			<h1 className="text-5xl">{ title }</h1>
			<p className="mt-2">Published by { author } · {date.getDate ()}/{date.getMonth () + 1}/{date.getFullYear ()}</p>
		</div>
	)
}

export default VideoTitle;