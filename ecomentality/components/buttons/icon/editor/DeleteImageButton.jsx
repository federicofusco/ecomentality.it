import GenericIconButton from "./../GenericIconButton"

import { Transforms } from "slate"
import { useSelected, useFocused, useSlateStatic, ReactEditor } from "slate-react"
import { MdDelete } from "react-icons/md"

/**
 * A button for deleting images
 * 
 * @param {Object} element - The image element
 * @returns A button for deleting images in the editor
 */
const DeleteImageButton = ({ element }) => {

	const editor = useSlateStatic ();
	const path = ReactEditor.findPath ( editor, element );
	const selected = useSelected ();
	const focused = useFocused ();

	return (
		<GenericIconButton
			onClick={() => Transforms.removeNodes ( editor, { at: path })}
			className={`${ selected && focused ? "inline" : "none" } absolute top-2 left-2`}
			title="Delete image">
			<MdDelete className="m-auto" />
		</GenericIconButton>
	)
}

export default DeleteImageButton;