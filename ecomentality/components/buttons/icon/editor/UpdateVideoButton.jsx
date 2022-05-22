import GenericIconButton from "./../GenericIconButton"

import { MdEdit } from "react-icons/md"

const UpdateVideoButton = ({ openModal }) => {
	return (
		<GenericIconButton
			onClick={ openModal }
			className="absolute top-2 left-2"
			title="Change video">
			<MdEdit className="m-auto" />
		</GenericIconButton>
	)
}

export default UpdateVideoButton;