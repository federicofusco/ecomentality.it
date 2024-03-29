import Image from "next/image"
import Link from "next/link"

const VideoLink = ({ video, author }) => {

	const video_id = video.link.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/).pop();

	return (
		<Link href={`/view/interview/${ video.id }`}>
			<a>
				<div className="w-full relative mb-3 flex justify-start rounded-lg text-white bg-nav-color">
			
					{/* Video Thumbnail */}
					<div className="w-32 h-32 hidden sm:block">
						<Image 
							src={`http://img.youtube.com/vi/${ video_id }/0.jpg`}
							height="128"
							width="128"
							alt=""
							className="rounded-l-lg" />
					</div>

					{/* Video Content */}
					<div className="my-auto p-4 sm:py-4 sm:pl-8 truncate">
						<h2 className="text-ellipsis overflow-hidden text-2xl font-medium font-poppins">{ video.title }</h2>
						<p className="text-ellipsis overflow-hidden font-poppins text-sm">Published by { author }</p>
					</div>
				</div>
			</a>
		</Link>
	)
}

const VideoList = ({ data }) => {

	return (
		<div className="w-full text-white pt-12 px-8 mb-16">
			
			{/* Title */}
			<h1 className="text-3xl mb-8 text-center font-black font-poppins uppercase">Interviews</h1>

			{/* Video List */}
			{ data.map ( x => (
				<VideoLink key={ x.video.id } video={ x.video } author={ x.author.displayName } />
			)) }
		</div>
	)
}

export default VideoList;