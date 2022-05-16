import { MdReorder } from "react-icons/md"

const MenuButton = () => {
	return <button className={`w-16 h-16 my-auto bg-transparent flex justify-end ml-auto text-white`}>
		<div className="my-auto text-2xl">
			{ <MdReorder /> }
		</div>
	</button>
}

export default MenuButton;