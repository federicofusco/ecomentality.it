// TODO (IMPORTANT): FIX XSS VULNERABILITY

const ArticleBody = ({ body }) => {
	return (
		<div>
			{ body }
		</div>
	);
}

export default ArticleBody;