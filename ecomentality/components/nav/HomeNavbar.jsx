import Logo from "../Logo"
import MenuButton from "./../buttons/MenuButton"

/**
 * Displays a navbar dedicated to the homepage
 * 
 * @returns A navbar
 */
const HomeNavbar = () => {
	return (
		<nav className="w-screen bg-dark-green top-0 fixed z-50 h-16 px-4">
			<div className="h-full flex items-center">
				<div className="flex flex-1">
					<Logo iconOnly={ true } />
				</div>

				{/* <div className="flex flex-auto">
					<NavLink title="About Us" href="/about" />
					<NavLink title="Articles" />
					<NavLink title="Envirotips" />
					<NavLink title="Interviews" />
					<NavLink title="Calini Green" />
				</div> */}

				<MenuButton />

			</div>
		</nav>
	)
}

export default HomeNavbar;