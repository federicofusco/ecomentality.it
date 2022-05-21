import { MdReorder } from "react-icons/md"

/**
 * A button to open the menu (on mobile)
 * 
 * @param {Function} onOpen - The callback which should be called when the button is pressed (when the menu is opened)
 * @returns A button
 */
const MenuButton = ({ onOpen }) => {
	return <button aria-label="close" onClick={ onOpen } className={`w-16 h-16 my-auto bg-transparent flex sm:hidden justify-end ml-auto text-white`}>
		<div className="my-auto text-2xl">
			{ <MdReorder /> }
		</div>
	</button>
}

export default MenuButton;