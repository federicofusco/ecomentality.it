import Link from "next/link"

const Home = () => {
	return (
		<div>
			<div className="w-full h-470 flex items-center justify-center pt-24">
                <span className="font-comfortaa text-white text-8xl text-center leading-tight">We work for the<br></br>
    			Planet.</span>
            </div>
			
			<div className="flex items-center justify-around items-around h-screen font-comfortaa text-white pt-32">
				<div className="flex flex-col justify-center w-1/3">
					<h1 className="text-6xl">Chi siamo?</h1> <br></br>
					<span>(provvisorio) Siamo studenti del Liceo Scientifico Calini (Brescia) partecipanti al progetto #HUBSTEAM. <br></br>
					Abbiamo deciso che, in qualche modo, avremmo dovuto cambiare il modo di vedere l'ambiente che ci circonda, sensibilizzando coloro che hanno veramente la potenzialità di fare ciò: i giovani come noi! Abbiamo dunque creato questo sito web, all'interno del quale puoi trovare articoli, video e testi interessanti riguardo all'ambiente e al cambiamento climatico!</span>
					{/*will be edited*/}
				</div>
				
				<img src="https://preview.redd.it/2tnomtldxk281.jpg?width=608&format=pjpg&auto=webp&s=f07ab76a9bd4f2a8161c76dc68c3cfbf691e32b6" className="h-96"></img>
			</div>

			<div className="flex items-center justify-around items-around h-screen font-comfortaa text-white pb-20">
				<img src="https://www.savoiabenincasa.edu.it/wp-content/uploads/2022/02/hubsteam_01.png" className="h-96"></img>
				
				<div className="flex flex-col justify-center w-1/3">
					<h1 className="text-6xl pb-8">Cosa è il progetto #HUBSTEAM?</h1>
					<span>(provvisorio) #HUBSTEAM è un progetto finalizzato a promuovere l’adozione delle metodologie didattiche innovative da parte delle scuole secondarie di secondo grado, con particolare riferimento alla didattica digitale e alle discipline STEAM (Scienze, Tecnologia, Ingegneria, Arti e Matematica), ispirate all’apprendimento attivo e cooperativo e al benessere relazionale.</span>
					{/* will be edited */}
				</div>
			</div>

			<div className="flex items-center justify-center justify-around h-470 font-comfortaa text-white mt-,8">
			<div className="flex flex-col justify-center items-center mt-24">
					<span className="pb-20 text-3xl">Novità, consigli, curiosità, eventi sostenibili e molto altro!</span> {/*will be edited*/}
					<Link href=""><a><button className="bg-black h-24 w-52 text-2xl rounded-2xl leading-8">Salta agli <br></br> Articoli!</button></a></Link>
				</div>
				<h1 className="text-dark-green text-8xl pb-20">Articoli.</h1>
			</div>
			
			<div className="flex items-center justify-around items-center h-550 font-comfortaa text-white mt-28 mb-36 pr-12">
				<h1 className="text-dark-green text-8xl pb-20">Envirotips.</h1>
				<div className="flex flex-col justify-center items-center mt-24 w-1/2">
					<span className="pb-10 text-3xl text-center">Scopri i consigli per vivere con l'ambiente e le persone che ti stanno intorno!</span> {/*will be edited*/}
					<Link href="https://www.theresilientactivist.org/wp-content/uploads/2018/08/EnviroTip-Logo-2-300x256-1-300x256.jpg"><a><button className="bg-black h-28 w-64 text-2xl rounded-2xl leading-8">Dai un'occhiata agli <br></br> Envirotips!</button></a></Link>
				</div>
			</div>

			<footer className="h-520 mt-28 bg-dark-green text-white">
				<div className="mr-68 flex items-center h-full">
					<div className="px-36 text-3xl text-left">
						<span>Links:</span><br></br>
							<ul>
								<li><Link href="https://www.liceocalini.edu.it/"><a className="text-xl ml-8 hover:underline-offset-2"><u>Liceo Scientifico Annibale Calini</u></a></Link></li>
								<li><Link href="https://unric.org/it/agenda-2030/"><a className="text-xl ml-8 hover:underline-offset-2"><u>Agenda 2030</u></a></Link></li>
								<li><Link href="https://www.indire.it/2022/02/09/hubsteam-il-progetto-di-formazione-per-studenti-sulle-steam/"><a className="text-xl ml-8 hover:underline-offset-2"><u>#HUBSTEAM</u></a></Link></li>
							</ul>
					</div>
					<div className="bg-white w-0.5 h-90 rounded-md"></div>
					<div className="px-52 text-base">
						<ul>
						<li>Federico Fusco</li>
						<li>Davide Raschitelli</li>
						<li>Alessandro Curseri</li>
						<li>Chiara Volpi</li>
						<li>Anna Graziani</li>
						<li>Sabrina Arbore</li>
						<li>Leonardo Marpicati</li>
						<li>Davide Mezzaroma</li>
						<li>Tommaso Palla</li>
						<li>Riccardo Brognoli</li>
						<li>Riccardo Di Palma</li>
						<li>Tommaso Giuseppe Di Terlizzi</li>
						<li>Jacopo Zani</li>
						<li>Sofia Palazzani</li>
						<li>Giulia Gozzini</li>
				        <li>Veronica Cavicchi</li>
						<li>Leonardo Barbarini</li>
						<li>Fabrizio Filisina</li>
						</ul>
					</div>
				</div>
			</footer>
		</div>
	)
}

export default Home