import Head from "next/head"
import ArticleNavbarFallback from "./../nav/ArticleNavbarFallback"
import ArticleSidebar from "./../../nav/ArticleSidebar"
import ArticleTitleFallback from "./ArticleTitleFallback"
import ArticleBodyFallback from "./ArticleBodyFallback"


/**
 * Displays an article fallback page
 * 
 * @returns An article fallback page
 */
const ArticleFallback = () => {
	return (
		<>
			<Head>
				<title>Loading - GEM</title>
				<meta name="language" content="EN" />
				<meta name="robots" content="all" />
			</Head>
			<div className="w-screen h-screen overflow-x-hidden">
				
				<ArticleNavbarFallback />
				
				<div className="flex">
					<ArticleSidebar />
					<div className="sm:ml-20 w-full md:mx-auto max-w-2xl">
						<ArticleTitleFallback />
						<ArticleBodyFallback />
					</div>
				</div>
			</div>
		</>
	)
}

export default ArticleFallback;