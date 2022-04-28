const ArticleTitle = ({ title, author }) => {
	return (
		<div>
			<h1>{ title }</h1>
			<p>Written by { author }</p>
		</div>
	)
}

export default ArticleTitle;