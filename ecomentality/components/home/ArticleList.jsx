import Image from "next/image"
import Link from "next/link"

const ArticleLink = ({ article }) => {
	return (
		<Link href={`/view/article/${ article.id }`}>
			<a>
				<div className="w-full relative mb-3 flex justify-start rounded-lg text-white bg-nav-color">
			
					{/* Article Image */}
					<div className="w-32 h-32 hidden sm:block">
						<Image 
							src="https://via.placeholder.com/128.png?text=GEM"
							height="128"
							width="128"
							className="rounded-l-lg" />
					</div>

					{/* Article Content */}
					<div className="my-auto p-4 sm:py-4 sm:pl-8 truncate">
						<h2 className="text-ellipsis overflow-hidden text-2xl font-medium font-poppins">{ article.title }</h2>
						<p className="text-ellipsis overflow-hidden font-poppins text-sm">Written by { article.author }</p>
					</div>
				</div>
			</a>
		</Link>
	)
}

const ArticleList = ({ articles }) => {

	return (
		<div className="w-full text-white pt-12 px-8 mb-16">
			
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