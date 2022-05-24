import GenericNavbar from "./../../nav/navbars/GenericNavbar"
import Button from "./../../buttons/Button"

const ArticleNavbarFallback = () => {
	return (
		<GenericNavbar>
			<div className="flex">
				<Button disabled={ true }>
					Follow
				</Button>
			</div>
		</GenericNavbar>
	);
}

export default ArticleNavbarFallback;