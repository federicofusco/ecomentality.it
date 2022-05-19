import HeroTitle from "../components/home/HeroTitle"
import HomeNavbar from "../components/nav/HomeNavbar"
import Footer from "./../components/nav/Footer"
import Head from "next/head"

const CaliniGreen = () => {
	return (
		<div className="bg-all-green">
			<Head>
				<title>Calini Green - GEM</title>
				<meta name="language" content="EN" />
				<meta name="robots" content="all" />
				<meta name="description" content="A page dedicated to the Calini Green group" />
			</Head>

			<HomeNavbar />

			<div className="mt-16">
				<HeroTitle title="Calini Green" subtitle="Im using lorem ipsum because I cant be bothered to write an actual subtitle" />
			</div>

			<Footer />
		</div>
	)
}

export default CaliniGreen;