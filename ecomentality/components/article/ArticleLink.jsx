import Link from "next/link"

const ArticleLink = ({ article, author }) => {

	const date = new Date ( article.timestamp );

	return <Link href={`/view/article/${ article.id }`}>
		<a>
			<h2>{ article.title }</h2>
			<p>Published by { author.name }  · {date.getDate ()}/{date.getMonth () + 1}/{date.getFullYear ()}</p>
		</a>
	</Link>
}

export default ArticleLink;