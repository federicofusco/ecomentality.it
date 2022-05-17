import HeroTitle from "../components/home/HeroTitle"
import HomeNavbar from "../components/nav/HomeNavbar"
import Footer from "./../components/nav/Footer"
import Head from "next/head"

const AboutUs = () => {
	return (
		<div className="bg-all-green">
			<Head>
				<title>About Us - GEM</title>
				<meta name="language" content="EN" />
				<meta name="robots" content="index, follow" />
				<meta name="description" content="A page dedicated GEM group" />
			</Head>

			<HomeNavbar />

			<div className="mt-16">
				<HeroTitle title="About Us" subtitle="Im using lorem ipsum because I cant be bothered to write an actual subtitle" />
			</div>

			<Footer />
		</div>
	)
}

export default AboutUs;