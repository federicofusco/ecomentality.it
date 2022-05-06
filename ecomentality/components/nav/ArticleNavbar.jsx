import Logo from "../Logo"
import { useRouter } from "next/router"
import Button from "../buttons/Button"
import GenericNavbar from "./GenericNavbar";

/**
 * Displays a navbar for the article
 * 
 * @param {Object} article - The article
 * @returns A navbar
 */
const ArticleNavbar = ({ article }) => {

	const router = useRouter ();
	const { author } = article;

	const redirectToAuthor = () => {
		router.push ( `/view/author/${ author }` );
	}

	return <GenericNavbar actions={ <div className="flex"><Button onClick={ redirectToAuthor }>Follow</Button></div> } />
}

export default ArticleNavbar;
