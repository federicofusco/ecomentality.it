import ActionButton from "./../buttons/ActionButton"
import { MdQuestionAnswer, MdShare } from "react-icons/md"
import LikeButton from "./../buttons/LikeButton"

const ArticleSidebar = ({ article }) => {
	return (
		<div className="hidden pt-20 sm:block flex-1 bg-white border-r absolute left-0 top-0 h-screen w-16">
			<LikeButton article={ article }  />
			<ActionButton onClick={()=>{}} icon={ <MdQuestionAnswer /> } />
			<ActionButton onClick={()=>{}} icon={ <MdShare /> } />
		</div>
	)
}

export default ArticleSidebar;