import { MdReorder } from "react-icons/md"

const MenuButton = ({ onOpen }) => {
	return <button onClick={ onOpen } className={`w-16 h-16 my-auto bg-transparent flex sm:hidden justify-end ml-auto text-white`}>
		<div className="my-auto text-2xl">
			{ <MdReorder /> }
		</div>
	</button>
}

export default MenuButton;