import HeroTitle from "./../components/home/HeroTitle"
import Navbar from "./../components/nav/navbars/Navbar"
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

			<Navbar />

			<div className="mt-16">
				<HeroTitle title="Calini Green" subtitle="Calini Green è nata nel 2019 su iniziativa di un gruppo di docenti del Liceo A. Calini, i professori Maurizio Bresciani, Veronica Cavicchi, Ornella Ferrandi e Sandra Pirone, con l’obiettivo di proporre una serie di attività che sensibilizzassero gli studenti sull’urgenza di affrontare alcune tematiche ambientali e li guidasse a un atteggiamento attivo e concreto nei confronti del territorio e della propria comunità in un’ottica di ecosostenibilità. <br />
A tale scopo i primi incontri programmati per definire meglio il progetto sono stati aperti anche agli studenti, ai genitori  e ad alcuni esperti e rappresentanti degli enti locali con i quali si sono individuate le iniziative da mettere in pratica.
A2A per esempio ha fornito i contenitori per la raccolta differenziata da collocare in punti strategici all’interno dell’istituto; alcuni studenti hanno ideato il  logo Calini Green  che è stato utilizzato per le 600 borracce in materiale riciclabile in vendita come gadget della scuola. Altre attività sono state istituite in questo senso, come ad esempio la pagina instagram.
" redirect={"https://www.instagram.com/calini.green/"} />
			</div>

			<Footer />
		</div>
	)
}

export default CaliniGreen;