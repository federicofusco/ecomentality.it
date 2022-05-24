import HeroTitle from "./../components/home/HeroTitle"
import Navbar from "./../components/nav/navbars/Navbar"
import Footer from "./../components/nav/Footer"
import Head from "next/head"

const Envirotips = () => {
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
				<HeroTitle title="Consigli sull'ambiente" subtitle="Abbiamo esaurito le energie e le nostre menti si devono ricaricare! Per assistere ad una pagina creativa e comunicativa, torna a settembre 2022." />
			</div>

			<Footer />
		</div>
	)
}

export default Envirotips;