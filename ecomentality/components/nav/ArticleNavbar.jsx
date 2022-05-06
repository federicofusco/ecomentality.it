import Logo from "../Logo"
import { useRouter } from "next/router"
import Button from "../buttons/Button"
import GenericNavbar from "./GenericNavbar";

/**
 * Displays a navbar for the article
 * 
 * @param {String} authorId - The author's ID
 * @returns A navbar
 */
const ArticleNavbar = ({ authorId }) => {

	const router = useRouter ();

	const redirectToAuthor = () => {
		router.push ( `/view/author/${ authorId }` );
	}

	return <GenericNavbar actions={ <div className="flex"><Button onClick={ redirectToAuthor }>Follow</Button></div> } />
}

export default ArticleNavbar;
