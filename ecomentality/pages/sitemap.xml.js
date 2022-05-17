import { fetchArticleIds } from "./../lib/article"
import { fetchUserIds } from "../lib/auth.admin"

const SiteMap = () => {}

export const getServerSideProps = async ({ res }) => {

	const generateSiteMap = async () => {

		let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
			<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

				<!-- Static Links -->
				<url>
					<loc>${ process.env.NEXT_PUBLIC_URL }/</loc>
				</url>
				<url>
					<loc>${ process.env.NEXT_PUBLIC_URL }/auth/login</loc>
				</url>
				
				<!-- Articles -->`;

		await fetchArticleIds ()
			.then (( ids ) => sitemap += ids.data.ids.map( id => `
				<url>
					<loc>${ process.env.NEXT_PUBLIC_URL }/view/article/${ id }</loc>
				</url>` ).join ( "" ) );

		await fetchUserIds ()
			.then (( ids ) => sitemap += ids.data.ids.map ( id => `
				<url>
					<loc>${ process.env.NEXT_PUBLIC_URL }/view/author/${ id }</loc>
				</url>` ).join ( "" ) );

		sitemap += "</urlset>";

		return sitemap;
	}

	// Generates the sitemap
	const sitemap = await generateSiteMap ();

	res.setHeader ( "Content-Type", "text/xml" );
	res.write ( sitemap );
	res.end ();

	return {
		props: {}
	}
}

export default SiteMap;