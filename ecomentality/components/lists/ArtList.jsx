import Image from "next/image"
import Link from "next/link"

const Art = ({ title, link, author  }) => {
	return (
		<Link href={author} passHref> 
			<a target="_blank" rel="noopener noreferrer">

			<div className="m-3 w-[300px] h-[340px] rounded-lg bg-nav-color">
                    <Image 
						className="bg-white rounded-t-lg"
						width={300}
						height={300}
						alt={title}
						src={link} />
                    <h1 className="text-center text-white font-medium text-md">{title}</h1>
                </div>
			</a>
		</Link>
	)
}

const ArtList = ({ arts }) => {

	return (
		<div className="w-full flex justify-center">
			<div className="w-full text-white px-8 mb-16 mt-16 pt-4">
				<h1 className="text-white text-5xl p-5 text-center">
							Art
						</h1>
						<p className="pl-10 pr-10 m-auto text-white text-center text-xl  max-w-screen-lg justify-self-center">
							Help the planet through art
						</p>
				
				{/* Art List */}
				<div className="flex justify-center flex-wrap">
					{ arts.map ( art => (
						<Art key={art.id} title={art.title} link={art.link} author={art.author} />
					))}
				</div>
			</div>
		</div>
	)
}

export default ArtList;