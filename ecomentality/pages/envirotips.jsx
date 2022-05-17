import HeroTitle from "../components/home/HeroTitle"
import HomeNavbar from "../components/nav/HomeNavbar"
import Footer from "./../components/nav/Footer"
import Head from "next/head"

const CaliniGreen = () => {
	return (
		<div className="bg-all-green">
			<Head>
				<title>Envirotips - GEM</title>
				<meta name="language" content="EN" />
				<meta name="robots" content="index, follow" />
				<meta name="description" content="A helpful page containing a list of tips and tricks to help the environment" />

				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
				<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700;800;900&display=swap" rel="stylesheet" /> 
			</Head>

			<HomeNavbar />

			<div className="mt-16">
				<HeroTitle title="Envirotips" subtitle="Im using lorem ipsum because I cant be bothered to write an actual subtitle" />
			</div>

			<Footer />
		</div>
	)
}

export default CaliniGreen;