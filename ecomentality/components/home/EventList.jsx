import Image from "next/image"
import Link from "next/link"

const Event = ({ title, id }) => {
	return (
		<Link href={`/view/event/${ id }`}> 
			<a>
				<div className="w-full bg-transparent p-0 h-96 bg-white relative">
					
					{/* Temp URL until infrastructure is set up */}

					<div className="w-full h-full z-30 absolute bg-white top-0 left-0" style={{background: "linear-gradient(0deg,#00000088 30%, #ffffff44 100%)"}}>
						<h1 className="absolute z-50 bottom-5 left-5 font-poppins font-black text-white text-xl">
							{ title }
						</h1>	
					</div>

					<Image
						src="https://via.placeholder.com/320x384.png?text=GEM"
						layout="fill"
						alt="Event Image"
						className="w-full h-full z-10" />
				</div>
			</a>
		</Link>
	)
}

const EventList = () => {

	return (
		<div className="w-full text-white px-8 mb-16">
			
			{/* Title */}
			<h1 className="text-3xl mb-8 text-center font-black font-poppins uppercase">Events</h1>

			{/* Event List */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				{ ["0", "1", "2", "3", "4", "5", "6", "7"].map ( event => (
					<Event key={ event } id={ event } title={`Event #${ event }`} />
				))}
			</div>
		</div>
	)
}

export default EventList;