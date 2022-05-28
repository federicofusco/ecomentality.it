import Link from "next/link"

/**
 * Displays a link to an article
 * 
 * @param {String} timestamp - The article's publish timestamp
 * @param {String} title - The article's title
 * @param {String} id - The article's ID
 * @param {String} author - The author's display name
 * @returns A link to an article
 */
const ArticleLink = ({ timestamp, title, id, author }) => {

	const date = new Date ( timestamp );

	return <Link href={`/view/article/${ id }`} passHref>
		<a>
			<h2>{ title }</h2>
			<p>Published by { author }  · {date.getDate ()}/{date.getMonth () + 1}/{date.getFullYear ()}</p>
		</a>
	</Link>
}

export default ArticleLink;