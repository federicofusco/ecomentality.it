import Logo from "./../../Logo"
/**
 * Displays a generic navbar
 * 
 * @param {?Boolean} displayLogo - Whether or not to display the logo
 * @param actions - The content which should be displayed in the navbar
 * @returns A navbar
 */
const GenericNavbar = ({ displayLogo = true, children }) => {
	return (
		<nav className="w-screen border-b top-0 fixed z-50 h-16 bg-white px-4 sm:px-16 md:px-48">
			<div className="h-full flex items-center">
				{ displayLogo && <div className="flex flex-1">
					<Logo iconOnly={ true } />
				</div> }

				{ children }
			</div>
		</nav>
	)
}

export default GenericNavbar;