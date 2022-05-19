import Logo from "../Logo"
import MenuButton from "./../buttons/MenuButton"
import NavLink from "./NavLink"
import SearchBar from "./SearchBar"
import MobileMenu from "./MobileMenu"
import Link from "next/link"
import { useState } from "react"

/**
 * Displays a navbar dedicated to the homepage
 * 
 * @returns A navbar
 */
const HomeNavbar = () => {

	const links = [
		{
			section: "About Us",
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
	];

	const [menuVisible, setMenuVisiblity] = useState ( false );

	const toggleMenuVisiblity = () => setMenuVisiblity ( !menuVisible );

	return (
		<nav className="w-screen bg-dark-green top-0 fixed z-50 h-16 px-4">
			<div className="h-full flex items-center">
				<div className="flex flex-1">
					<Logo iconOnly={ true } />
				</div>


				<div className="hidden sm:flex flex-auto">
					{
						links.map (({ section, link }) => <NavLink key={ section } title={ section } href={ link } /> )
					}
				</div>
				
				<SearchBar />

				<MenuButton onOpen={ toggleMenuVisiblity } />

				<MobileMenu visible={ menuVisible } onClose={ toggleMenuVisiblity }>
					{
						links.map (({ section, link }) => (
							<Link key={ link } href={ link }>
								<a className="mt-3 w-full block text-white font-medium">
									{ section }
								</a>
							</Link>
						))
					}
				</MobileMenu>

			</div>
		</nav>
	)
}

export default HomeNavbar;