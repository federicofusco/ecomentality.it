import Link from "next/link"

/**
 * Displays a link in the navbar
 * 
 * @param {String} href - The URL the link should point to (default: /)
 * @param {String} title - The text the link should display
 * @returns A link wihch should only be used in the bavbar
 */
const NavLink = ({ href = "/", title }) => {
	return <Link href={ href }>
		<a className="my-auto ml-3">
			{ title }
		</a>
	</Link>
}

export default NavLink;