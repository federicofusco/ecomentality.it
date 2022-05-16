import Logo from "../Logo"
import MenuButton from "./../buttons/MenuButton"
import NavLink from "./NavLink"
import SearchBar from "./SearchBar"

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


				<div className="hidden sm:flex flex-auto">
					{
						[
							{
								section: "Abous Us",
								link: "/about"
							},
							{
								section: "Articles",
								link: "/view/articles"
							},
							{
								section: "Envirotips",
								link: "/envirotips"
							},
							{
								section: "Interviews",
								link: "/view/interviews"
							},
							{
								section: "Calini Green",
								link: "/calini"
							}
						].map (({ section, link }) => <NavLink key={ section } title={ section } href={ link } /> )
					}
				</div>
				
				<SearchBar />

				<MenuButton />

			</div>
		</nav>
	)
}

export default HomeNavbar;