import { useRef, useState } from "react"
import useArticle from "../../lib/article"
import ArticleEditor from "../editor/ArticleEditor";
import ErrorMessage from "../state/ErrorMessage";

const ArticleForm = ({ id }) => {

	// const { publishArticle } = useArticle ();
	const titleRef = useRef ();
	const bodyRef = useRef ();
	const [error, setError] = useState ( "" );

	const publish = async () => {
	// 	await publishArticle ( id, titleRef.current.value, bodyRef.current.value )
	// 		.catch ( ( error ) => {
	// 			setError ( error.data.error );
	// 		});
	}

	return (
		<div>
			<ErrorMessage message={ error } /><br />
			<input type="text" placeholder="Title" ref={ titleRef } /><br />
			<ArticleEditor id={ id } /><br />
			<button onClick={ publish }>Publish</button>
		</div>
	)
}

export default ArticleForm;