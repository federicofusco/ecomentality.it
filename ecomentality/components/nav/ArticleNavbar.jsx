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
	const { isFallback } = router;

	const redirectToAuthor = () => {
		router.push ( `/view/author/${ authorId }` );
	}

	if ( isFallback ) {

		// Displays a fallback navbar
		return <GenericNavbar actions={ <div className="flex"><Button disabled={ true } onClick={ redirectToAuthor }>Follow</Button></div> } />
	}

	return <GenericNavbar actions={ <div className="flex"><Button onClick={ redirectToAuthor }>Follow</Button></div> } />
}

export default ArticleNavbar;