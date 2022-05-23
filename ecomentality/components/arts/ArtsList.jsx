import Image from "next/image"
import Link from "next/link"

const Art = ({ title, link, author  }) => {
	return (
		<Link href={author} passHref> 
			<a target="_blank" rel="noopener noreferrer">

                <div style={{width: 300, height: 340, backgroundColor: '#32a820', borderRadius: 10}}>

                    <Image 
                    style={{backgroundColor: '#fff', borderTopLeftRadius: 10, borderTopRightRadius: 10,}}
                    width={300}
                    height={300}
                    alt={title}
                    src={link}/>
                    <h1 style={{textAlign: 'center', color: '#fff', fontSize: 17, fontWeight: 500}}>{title}</h1>
                </div>
			</a>
		</Link>
	)
}

const ArtsList = ({ arts }) => {

	return (
		<div className="w-full text-white px-8 mb-16 mt-16 pt-4">
            <h1 className="text-white text-5xl p-5 text-center">
						Art
					</h1>
					<p className="pl-10 pr-10 m-auto text-white text-center text-xl  max-w-screen-lg justify-self-center">
						Help the planet through art
					</p>
			{/* Event List */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20 pt-10 pb-10">
				{ arts.map ( art => (
					<Art key={art.id} title={art.title} link={art.link} author={art.author} />
				))}
			</div>
		</div>
	)
}

export default ArtsList;