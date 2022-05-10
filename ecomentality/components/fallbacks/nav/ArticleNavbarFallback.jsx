import GenericNavbar from "./../../nav/GenericNavbar"
import Button from "./../../buttons/Button"

const ArticleNavbarFallback = () => {
	return <GenericNavbar actions={ <div className="flex"><Button disabled={ true }>Follow</Button></div> } />
}

export default ArticleNavbarFallback;