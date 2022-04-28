import { useRef, useState } from "react"
import useArticle from "../../lib/article.lib"
import ErrorMessage from "../state/ErrorMessage";

const ArticleForm = ({ id }) => {

	const { publishArticle } = useArticle ();
	const titleRef = useRef ();
	const bodyRef = useRef ();
	const [error, setError] = useState ( "" );

	const publish = async () => {
		await publishArticle ( id, titleRef.current.value, bodyRef.current.value )
			.catch ( ( error ) => {
				setError ( error.data.error );
			});
	}

	return (
		<div>
			<ErrorMessage message={ error } /><br />
			<input type="text" placeholder="Title" ref={ titleRef } /><br />
			<textarea placeholder="Body" ref={ bodyRef }></textarea><br />
			<button onClick={ publish }>Publish</button>
		</div>
	)
}

export default ArticleForm;