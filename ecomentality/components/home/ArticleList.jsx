import Image from "next/image"
import Link from "next/link"

const ArticleLink = ({ article }) => {
	return (
		<Link href={`/view/article/${ article.id }`}>
			<a>
				<div className="w-full relative mb-3 flex justify-start rounded-lg text-white bg-nav-color">
			
					{/* Article Image */}
					<div className="w-32 h-32">
						<Image 
							src="https://via.placeholder.com/128.png?text=GEM"
							height="128"
							width="128"
							className="rounded-l-lg" />
					</div>

					{/* Article Content */}
					<div className="my-auto py-4 pl-8">
						<h2 className="text-2xl font-medium font-poppins">{ article.title }</h2>
						<p className="font-poppins text-sm">Written by { article.author }</p>
					</div>
				</div>
			</a>
		</Link>
	)
}

const ArticleList = ({ articles }) => {

	return (
		<div className="w-full text-white px-8">
			
			{/* Title */}
			<h1 className="text-3xl mb-8 text-center font-black font-poppins uppercase">Articles</h1>

			{/* Article List */}
			{ articles.map ( article => (
				<ArticleLink key={ article.id } article={ article } />
			)) }
		</div>
	)
}

export default ArticleList;