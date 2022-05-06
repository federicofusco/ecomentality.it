import { fetchUser } from "./../../../lib/auth.admin"
import { fetchArticles } from "./../../../lib/article"
import ArticleList from "../../../components/article/ArticleList"
import GenericNavbar from "../../../components/nav/GenericNavbar"
import Profile from "../../../components/profile/Profile"

const ViewAuthor = ({ articles, author }) => {
	return (
		<>
			<GenericNavbar />
			<div className="mt-24">
				<Profile displayName={ author.displayName } created={ author.created } profileURL={ author.profileURL } />
				<ArticleList articles={ articles } author={ author } />
			</div>
		</>
	)
}

export const getServerSideProps = async ({ params }) => {

	let notFound = false;

	// Fetches all of the authors articles
	let articles = [];
	await fetchArticles ( "author", "==", params.id )
		.then (( result ) => articles = result.data.articles )
		.catch (( error ) => notFound = true ); // CHANGE THIS!!!

	// Fetches the authors data
	let author = null;
	await fetchUser ( params.id )
		.then (( user ) => author = user.data.user )
		.catch (( error ) => notFound = true ); // CHANGE THIS!!!

	return {
		props: !notFound ? {
			articles: articles,
			author: author
		} : null,
		notFound
	}
}

export default ViewAuthor;