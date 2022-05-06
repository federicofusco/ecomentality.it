import { fetchUser } from "./../../../lib/auth.admin"
import { isUUID } from "./../../../lib/auth"
import { fetchArticles } from "./../../../lib/article"

const ViewAuthor = ({ articles, author }) => {
	return (
		<>
			<p>{ author.name }</p>
			{ articles?.map ( article => <p key={ article.id }>{ article.title }</p> )}
		</>
	)
}

export const getServerSideProps = async ({ params }) => {

	let notFound = false;

	// Fetches all of the author's articles
	let articles = [];
	await fetchArticles ( "author", "==", params.id )
		.then (( result ) => articles = result.data.articles )
		.catch (( error ) => notFound = true ); // CHANGE THIS

	console.log(articles);

	// Fetches the author's data
	let author = null;
	await fetchUser ( params.id )
		.then (( user ) => author = user.data.user )
		.catch (( error ) => notFound = true ); // CHANGE THIS

	return {
		props: !notFound ? {
			articles: articles,
			author: author
		} : null,
		notFound
	}
}

export default ViewAuthor;