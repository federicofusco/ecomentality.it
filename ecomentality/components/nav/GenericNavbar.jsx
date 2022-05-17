import Logo from "../Logo"
/**
 * Displays a generic navbar
 * 
 * @param actions - The content which should be displayed in the navbar
 * @returns A navbar
 */
const GenericNavbar = ({ actions }) => {
	return (
		<nav className="w-screen border-b top-0 fixed z-50 h-16 bg-white px-4 sm:px-16 md:px-48">
			<div className="h-full flex items-center">
				<div className="flex flex-1">
					<Logo iconOnly={ true } />
				</div>

				{ actions }
			</div>
		</nav>
	)
}

export default GenericNavbar;