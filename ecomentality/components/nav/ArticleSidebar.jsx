import ActionButton from "../buttons/ActionButton"
import { MdThumbUpOffAlt, MdThumbUp, MdQuestionAnswer, MdShare } from "react-icons/md"
import useArticle from "../../lib/article"
import ActionToggleButton from "../buttons/ActionToggleButton"

const ArticleSidebar = ({ id }) => {

	const { likeArticle, dislikeArticle } = useArticle ();

	const likeToggle = ( action ) => action === "toggleOn" ? likeArticle ( id ) : dislikeArticle ( id );

	return (
		<div className="hidden pt-20 sm:block flex-1 bg-white border-r absolute left-0 top-0 h-screen w-16">
			<ActionToggleButton onToggle={ likeToggle } icons={[<MdThumbUpOffAlt />, <MdThumbUp />]} />
			<ActionButton onClick={()=>{}} icon={ <MdQuestionAnswer /> } />
			<ActionButton onClick={()=>{}} icon={ <MdShare /> } />
		</div>
	)
}

export default ArticleSidebar;