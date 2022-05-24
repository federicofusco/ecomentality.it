import HeroTitle from "./../components/home/HeroTitle"
import Navbar from "./../components/nav/navbars/Navbar"
import Footer from "./../components/nav/Footer"
import Head from "next/head"

const Agricoltura = () => {
	return (
		<div className="bg-all-green">
			<Head>
				<title>Envirotips - GEM</title>
				<meta name="language" content="EN" />
				<meta name="robots" content="all" />
				<meta name="description" content="" />
			</Head>

			<Navbar />

			<div className="mt-16">
				<HeroTitle title="Agricoltura 3.0" subtitle="La sensibilizzazione è essenziale, ma da sola non basta. Vogliamo impegnarci agendo direttamente sull'impatto ambientale, rivoluzionandolo. Ma abbiamo bisogno di tempo: ti aspettiamo a settembre 2022!" />
			</div>

			<Footer />
		</div>
	)
}

export default Agricoltura;