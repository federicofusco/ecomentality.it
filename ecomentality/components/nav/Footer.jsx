import Link from "next/link"
import { FaInstagram, FaTwitter } from "react-icons/fa"

const LinkList = () => {
	return (
		<div className="w-1/2 flex justify-center sm:justify-end border-r border-white max-w-xs sm:pr-8">
			<div>
				<h3 className="text-white font-black font-poppins uppercase text-sm">Links</h3>
				<div className="mt-2">

					{ ["1", "2", "3", "4"].map ( link => (
						<Link key={ link } href={`/${ link }`}>
							<a className="block text-white w-14 mt-1">Link { link }</a>
						</Link>
					))}

				</div>
			</div>
		</div>
	)
}

const MemberList = () => {
	return (
		<div className="w-1/2 sm:w-full flex justify-center sm:justify-start sm:pl-8">
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
		<div className="w-full flex sm:block sm:my-auto justify-center mt-4 sm:mt-0">
				<h3 className="uppercase my-auto font-poppins font-black text-white text-center">Find Us</h3>
				<div className="flex justify-center text-white sm:mt-3 text-xl">
					<FaInstagram className="ml-3 sm:ml-0 my-auto" />
					<FaTwitter className="ml-3 my-auto" />
				</div>
		</div>
	)
}

const Footer = () => {
	return (
		<footer className="bg-dark-green w-screen p-8 h-auto sm:flex sm:justify-center">
			<div className="flex justify-between w-full">
				<LinkList />
				<MemberList />
			</div>
			<SocialList />
		</footer>
	)
}

export default Footer; 