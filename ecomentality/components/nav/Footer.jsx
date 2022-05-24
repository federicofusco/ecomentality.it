import Link from "next/link"
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa"

const LinkList = () => {
	return (
		<div className="mt-4">
			<div>
				<h3 className="text-white font-black font-poppins uppercase text-sm">Link e contatti</h3>
				<div className="mt-2">
					<Link  href={'mailto:gem@ecomentality.life'}>
						<a className="block  text-white w-14 mt-1">gem@ecomentality.life</a>
					</Link>
					<Link  href={'www.liceocalini.edu.it'}>
						<a className="block  text-white w-36 mt-1">Liceo A. Calini</a>
					</Link>
					<span className="block text-white w-45 mt-1">Via Monte Suello 2 - Brescia</span>
					<Link  href={'tel:gem@ecomentality.life'}>
						<a className="block  text-white w-36 mt-1">+39 030 390249</a>
					</Link>
					
					{/* { ["1", "2", "3", "4"].map ( link => (
						<Link key={ link } href={`/${ link }`}>
							<a className="block text-white w-14 mt-1">Link { link }</a>
						</Link>
					))} */}

				</div>
			</div>
		</div>
	)
}

const Copyright = () => {
	return (
		<div className="mt-4">
			<div>
				<h3 className="text-white font-black font-poppins uppercase text-sm ">Extra</h3>
				<div className="mt-2">
					<Link  href={'www.ecomentality.life'}>
						<a className="block  text-white w-14 mt-1">www.ecomentality.life</a>
					</Link>
					<span className="block text-white w-45 mt-1">&copy; Great Eco Mentality 2022</span>
				</div>
			</div>
		</div>
	)
}
const MemberList = () => {
	return (
		<div className="w-1/2 sm:w-full flex justify-center sm:justify-start sm:pl-8 mt-4">
			<div>
				<h3 className="text-white font-black font-poppins uppercase text-sm">Our team</h3>
				<div className="mt-2">

					{ ["1", "2", "3", "4"].map ( link => (
						<Link key={ link } href={`/${ link }`}>
							<a className="block text-white w-auto mt-1">Member { link }</a>
						</Link>
					))}

				</div>
			</div>
		</div>
	)
}

const SocialList = () => {
	return (
		<div >
				<h3 className="uppercase my-auto font-poppins font-black text-white mt-4">Find Us</h3>
				<div className="text-white w-20 flex  mt-1">
					<Link  href={'https://www.instagram.com/gemliceocalini/'}>
						<FaInstagram className="ml-0 text-xl my-auto" />	
					</Link>
					<Link  href={'https://www.facebook.com/profile.php?id=100081198311689/'}>
						<FaFacebook className="ml-3 text-xl my-auto" />
						
					</Link>
					
				</div>
		</div>
	)
}

const Footer = () => {
	return (
		<footer className="bg-dark-green w-screen p-8 h-auto sm:flex sm:justify-center " style={{justifyContent: 'space-evenly'}}>
			<LinkList />
			<Copyright />
			<SocialList />
			
		</footer>
	)
}

export default Footer;