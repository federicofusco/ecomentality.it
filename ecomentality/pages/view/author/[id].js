import { fetchUser, fetchUserIds } from "./../../../lib/auth.admin"
import { fetchArticles } from "./../../../lib/article"
import ArticleList from "./../../../components/lists/ArticleList"
import Navbar from "./../../../components/nav/navbars/Navbar"
import Profile from "./../../../components/profile/Profile"
import ProfileFallback from "./../../../components/profile/ProfileFallback"
import Footer from "./../../../components/nav/Footer"
import Head from "next/head"
import { useRouter } from "next/router"

const ViewAuthor = ({ articles, author }) => {

	const router = useRouter ();
	const { isFallback } = router;

	// The fallback page needs to be seperate and can't drill components due to object destructuring
	if ( isFallback ) return <ProfileFallback />

	return (
		<>
			<Head>
				<title>{ author.displayName } - GEM</title>
				<meta name="language" content="EN" />
				<meta name="robots" content="all" />
				<meta name="author" content={ author.displayName } />
				<meta name="description" content={`Articles written by ${ author.displayName }`} />
			</Head>
			
			<Navbar />

			<div className="pt-24 bg-all-green">
				
				<Profile displayName={ author.displayName } created={ author.created } profileURL={ author.profileURL } />
	
				<ArticleList data={ articles } />

				<Footer />

			</div>
		</>
	)
}

export const getStaticPaths = async () => {

	let response = {
		paths: [],
		fallback: true
	};

	// Fetches all the article ids
	await fetchUserIds ()
		.then (( ids ) => {

			// Forms the paths
			var paths = [];
			ids.data.ids.forEach ( id => paths.push ({
				params: {
					id: id 
				}
			}) );

			response = {
				paths,
				fallback: true
			};

		})
		.catch (( error ) => {
			throw Error ( "Failed to form paths!" ) // CHANGE THIS!!!
		});

	return response;
}

export const getStaticProps = async ({ params }) => {

	let response = {
		props: {},
		notFound: false,
		revalidate: 900
	}

	// Fetches all of the authors articles
	await fetchArticles ( "author", "==", params.id )
		.then (( result ) => response.props.articles = result.data.articles )
		.catch (( error ) => response.notFound = true ); // CHANGE THIS!!!

	// Fetches the authors data
	await fetchUser ( params.id )
		.then (( user ) => response.props.author = user.data.user )
		.catch (( error ) => response.notFound = true ); // CHANGE THIS!!!

	if ( !response.notFound ) {
		for ( var x = 0; x < response.props.articles.length; x++ ) {
			response.props.articles[x] = {
				article: response.props.articles[x],
				author: response.props.author
			}
		}
	}

	return response;
}

export default ViewAuthor;