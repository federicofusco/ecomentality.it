import HeroTitle from "./../components/home/HeroTitle"
import Navbar from "./../components/nav/navbars/Navbar"
import Footer from "./../components/nav/Footer"
import Head from "next/head"

const CaliniGreen = () => {
	return (
		<div className="bg-all-green">
			<Head>
				<title>Envirotips - GEM</title>
				<meta name="language" content="EN" />
				<meta name="robots" content="all" />
				<meta name="description" content="A helpful page containing a list of tips and tricks to help the environment" />
			</Head>

			<Navbar />

			<div className="mt-16">
				<HeroTitle title="Envirotips" subtitle="Im using lorem ipsum because I cant be bothered to write an actual subtitle" />
			</div>

			<Footer />
		</div>
	)
}

export default CaliniGreen;