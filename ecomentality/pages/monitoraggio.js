import HeroTitle from "./../components/home/HeroTitle"
import Navbar from "./../components/nav/navbars/Navbar"
import Footer from "./../components/nav/Footer"
import Head from "next/head"

const Monitoraggio = () => {
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
				<HeroTitle title="Monitoraggio ambientale" subtitle="Sensibilizzare la nostra comunità è il nostro obiettivo primario. I dati ambientali del nostro territorio permetterebbero una visione generale della situazione attuale, per questo lo staff di GEM si impegnerà a realizzare questo progetto, i cui risultati saranno disponibili su questa pagina da settembre 2022." />
			</div>
			<Footer />
		</div>
	)
}

export default Monitoraggio;