import Logo from "../Logo"
import { useRouter } from "next/router"
import Button from "../buttons/Button"

/**
 * Displays a navbar for the article
 * 
 * @param {?String} authorId - The author's UUID
 * @returns A navbar
 */
const ArticleNavbar = ({ authorId }) => {

	const router = useRouter ();

	const redirectToAuthor = () => {
		if ( authorId ) router.push ( `/view/profile/${ authorId }` );
	}

	return (
		<div className="w-screen border-b top-0 fixed z-50 h-16 bg-white px-4 sm:px-16 md:px-48">
			<div className="h-full flex items-center">
				<div className="flex-1 flex">
					<Logo iconOnly={ true } />
				</div>

				<div className="flex">
					<Button onClick={ redirectToAuthor }>Follow</Button>
				</div>
			</div>
		</div>
	)
}

export default ArticleNavbar;
