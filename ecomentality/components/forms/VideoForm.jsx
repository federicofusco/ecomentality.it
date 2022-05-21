import { useRef, useState } from "react"
import useVideo from "../../lib/video"
import ErrorMessage from "../state/ErrorMessage";

const VideoForm = ({ id }) => {

	const { publishVideo } = useVideo ();
	const titleRef = useRef ();
	const bodyRef = useRef ();
    const linkRef = useRef ();
	const [error, setError] = useState ( "" );

	const publish = async () => {
		await publishVideo ( id, titleRef.current.value, bodyRef.current.value, linkRef.current.value )
			.catch ( ( error ) => {
				setError ( error.data.error );
			});
	}

	return (
		<div>
			<ErrorMessage message={ error } /><br />
			<input type="text" placeholder="Title" ref={ titleRef } /><br />
			<textarea placeholder="Body" ref={ bodyRef }></textarea><br />
            <input type="url" placeholder="Link" ref={ linkRef} /><br />
			<button onClick={ publish }>Publish</button>
		</div>
	)
}

export default VideoForm;