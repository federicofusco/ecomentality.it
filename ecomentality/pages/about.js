import HeroTitle from "./../components/home/HeroTitle"
import ale  from '../public/avatar/ale.png'
import rascky  from '../public/avatar/rascky.png'
import riccardopalma  from '../public/avatar/riccardopalma.png'
import fede  from '../public/avatar/fede.png'
import tommypalla  from '../public/avatar/tommypalla.jpg'
import leo  from '../public/avatar/leo.png'
import chiara  from '../public/avatar/chiara.png'
import anna  from '../public/avatar/anna.png'
import sabrina  from '../public/avatar/sabrina.png'
import tommyter from '../public/avatar/tommyter.png'
import jacopo from '../public/avatar/jacopo.png'
import sofia from '../public/avatar/sofia.png'
import giulia from '../public/avatar/giulia.png'
import fabrizio from '../public/avatar/fabrizio.png'
import mezza from '../public/avatar/mezza.JPG'


import Navbar from "./../components/nav/navbars/Navbar"
import Footer from "./../components/nav/Footer"
import Head from "next/head"
import  Avatar from "../components/about/Avatar"
const AboutUs = () => {
	return (
		<div className="bg-all-green">
			<Head>
				<title>About Us - GEM</title>
				<meta name="language" content="EN" />
				<meta name="robots" content="all" />
				<meta name="description" content="A page dedicated GEM group" />
			</Head>

			<Navbar />

			<div className="mt-16">
				<div className="w-screen  flex-1 flex-col justify-items-center justify-center">

					<h1 className="text-white text-5xl p-5 text-center">
							About us
					</h1>
					<p className="pl-10 pr-10 m-auto text-white text-center text-xl  max-w-screen-lg justify-self-center">
					Il progetto ideato dalle giovani menti caliniane consiste nella creazione di un sito web aggiornabile, con la finalità di sensibilizzare e informare la popolazione mondiale a quella che è la situazione ambientale, sperando in quello che è il buon senso dei cittadini per trovare soluzioni pratiche al problema dell’inquinamento ambientale, dalla progettazione di opere pubbliche all’organizzazione di manifestazioni in favore dell’ambiente con la finalità di essere notati da organizzazioni con potere maggiore, in grado quindi di sviluppare progetti in larga scala. Il gruppo GEM nasce dal progetto HUBSTEAM, ovvero un percorso finalizzato alla promozione di nuove metodologie didattiche incentrata sulle discipline STEAM (Science, Technology, Engineering, Art, Mathematics), ideato da una rete di sei istituti esperti nell'utilizzo delle stesse, appartenenti alla rete di Avanguardie Educative di INDIRE, di cui anche il nostro istituto fa parte. <br /> <i>Riccardo Di Palma, Riccardo Brognoli</i>
					</p>
					<h1 className="text-3xl mb-8 text-center font-black font-poppins uppercase text-white mt-10">Tutors</h1>
					<div style={{flexDirection: 'row', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap'}}>
						<Avatar name={"Veronica Cavicchi"} img={chiara}/>
						<Avatar name={"Fabrizio Filisina"} img={fabrizio}/>
					</div>
					<h1 className="text-3xl mb-8 text-center font-black font-poppins uppercase text-white mt-10">Team Managers</h1>
					<div style={{flexDirection: 'row', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap'}}>
						<Avatar name={"Chiara Volpi"} img={chiara}/>
						<Avatar name={"Jacopo Zani"} img={jacopo}/>
						<Avatar name={"Davide Mezzaroma"} img={mezza}/>
					</div>
					<h1 className="text-3xl mb-8 text-center font-black font-poppins uppercase text-white mt-10">Developers</h1>
					<div style={{flexDirection: 'row', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap'}}>
						<Avatar name={"Federico Fusco"} img={fede}/>
						<Avatar name={"Alessandro Curseri"} img={ale}/>
						<Avatar name={"Davide Raschitelli"} img={rascky}/>
					</div>
					<h1 className="text-3xl mb-8 text-center font-black font-poppins uppercase text-white mt-10">Designers</h1>
					<div style={{flexDirection: 'row', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap'}}>
						<Avatar name={"Tommaso Palla"} img={tommypalla}/>
						<Avatar name={"Sabrina Arbore"} img={sabrina}/>
					</div>
					<h1 className="text-3xl mb-8 text-center font-black font-poppins uppercase text-white mt-10">Social Media Managers</h1>
					<div style={{flexDirection: 'row', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap'}}>
						<Avatar name={"Leonardo Marpicati"} img={leo}/>
						<Avatar name={"Riccardo Di Palma"} img={riccardopalma}/>
					</div>
					<h1 className="text-3xl mb-8 text-center font-black font-poppins uppercase text-white mt-10">Writers</h1>
					<div style={{flexDirection: 'row', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap'}}>
						<Avatar name={"Riccardo Di Palma"} img={riccardopalma}/>
						<Avatar name={"Sofia Palazzani"} img={sofia}/>
						<Avatar name={"Giulia Gozzini"} img={giulia}/>
					</div>
					<h1 className="text-3xl mb-8 text-center font-black font-poppins uppercase text-white mt-10">Interview makers</h1>
					<div style={{flexDirection: 'row', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap'}}>
						<Avatar name={"Chiara Volpi"} img={chiara}/>
						<Avatar name={"Davide Raschitelli"} img={rascky}/>
						<Avatar name={"Tommaso Di Terlizzi"} img={tommyter}/>
						
					</div>
					<h1 className="text-3xl mb-8 text-center font-black font-poppins uppercase text-white mt-10">Artists</h1>
					<div style={{flexDirection: 'row', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap'}}>
						<Avatar name={"Anna Graziani"} img={anna}/>
						<Avatar name={"Chiara Volpi"} img={chiara}/>
						
					</div>
					
				</div>

			</div>

			<Footer />
		</div>
	)
}

export default AboutUs;