import Head from "next/head"
import Article from "./Article"

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
				<meta name="robots" content="index, follow" />
			</Head>
			<Article isFallback={ true } />
		</>
	)
}

export default ArticleFallback;