import { Transforms } from "slate"
import { useSelected, useFocused, useSlateStatic, ReactEditor } from "slate-react"
import { MdDelete } from "react-icons/md"

const DeleteImageButton = ({ element }) => {

	const editor = useSlateStatic ();
	const path = ReactEditor.findPath ( editor, element );
	const selected = useSelected ();
	const focused = useFocused ();

	return <button
		onClick={() => Transforms.removeNodes ( editor, { at: path })}
		title="Delete image"
		className={`${ selected && focused ? "inline" : "none" } h-7 w-7 absolute top-2 left-2 bg-white border-black border rounded-full`}>
		<MdDelete className="m-auto" />
	</button>
}

export default DeleteImageButton;