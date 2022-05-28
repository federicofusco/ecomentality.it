import Image from "next/image"
import Link from "next/link"
import green from '../../public/events/green.png'
import dies from '../../public/events/dies.jpg'
import bike from '../../public/events/bike.jpg'
import naturaoma from '../../public/events/naturaoma.png'
import duecinque from '../../public/events/duecinque.png'


const Event = ({ titolo, id, image, link }) => {
	return (
		<Link href={link} passHref> 
			<a target="_blank" rel="noopener noreferrer">

                <div className="m-3 w-[300px] h-[340px] rounded-lg bg-nav-color">
                    <Image 
						className="bg-white rounded-t-lg"
						width={300}
						height={300}
						alt={titolo}
						src={image} />
                    <h1 className="text-center text-white font-medium text-md">{titolo}</h1>
                </div>
			</a>
		</Link>
	)
}

const EventList = () => {
	const events = [
		{
			titolo: "Calini Green - Passeggiata Ecologica",
			link: "https://qrco.de/bcz6C6",
			image: green,

		},
		{
			titolo: "Dies Fasti",
			link: "https://www.liceocalini.edu.it/pagine/dies-fasti-2022",
			image: dies,

		},
		{
			titolo: "Omaggio alla natura",
			link: "https://www.cremaonline.it/articoli/images/42936-0-ev_Locbuk.pdf",
			image: naturaoma,

		},
		{
			titolo: "2050: come ci arriviamo?",
			link: "https://www.muse.it/it/Esplora/mostre-temporanee/Archivio/Pagine/2050-come-ci-arriviamo-Mobilit%C3%A0-sostenibile-2021-22.aspx",
			image: duecinque,

		},
		{
			titolo: "Bike Day",
			link: "https://www.instagram.com/p/Cd6HxhGs_L-/?igshid=YmMyMTA2M2Y",
			image: bike,

		},

	]
	return (
		<div className="w-full text-white px-8 mb-16">
			
			{/* Title */}
			<h1 className="text-3xl mb-8 text-center font-black font-poppins uppercase">Events</h1>

			{/* Event List */}
			<div className="flex justify-center flex-wrap">
				{ events.map ( event => (
					<Event key={ event } id={ event } titolo={event.titolo} link={event.link} image={event.image} />
				))}
			</div>
		</div>
	)
}

export default EventList;