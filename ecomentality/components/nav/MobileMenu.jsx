import { MdClose } from "react-icons/md"

/**
 * Displays a fullscreen menu for mobile users
 * 
 * @param {Boolean} param0 - Whether or not the menu should be visible
 * @param {Function} onClose - A callback which is called when the menu is closed
 * @returns A menu for mobile users
 */
const MobileMenu = ({ visible, onClose, children }) => {
	
	// Hides the menu
	if ( !visible ) return null;

	return (
		<div className="w-screen h-screen text-white bg-dark-green absolute top-0 left-0">
			<div className="w-full flex justify-between p-4 h-16">
				<h2 className="font-black font-poppins text-white uppercase text-2xl my-auto">Menu</h2>
				<MdClose onClick={ onClose } className="text-white text-2xl" />
			</div>
			<div className="w-full px-4">
				{ children }
			</div>
		</div>
	)
}

export default MobileMenu;