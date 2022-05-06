const Home = () => {
	return (
		<div>
			<div className="w-full h-400 flex items-center justify-center pt-24">
                <span className="font-comfortaa text-white text-8xl text-center leading-tight">We work for The<br></br>
    			Planet.</span>
            </div>
			
			<div className="flex items-center justify-around items-around h-screen font-comfortaa text-white pt-6">
				<div className="flex flex-col justify-center w-1/3">
					<h1 className="text-6xl">Chi siamo?</h1> <br></br>
					<span>(provvisorio) Siamo studenti del Liceo Scientifico Calini (Brescia) partecipanti al progetto #HUBSTEAM. <br></br>
					Abbiamo deciso che, in qualche modo, avremmo dovuto cambiare il modo di vedere l'ambiente che ci circonda, sensibilizzando coloro che hanno veramente la potenzialità di fare ciò: i giovani come noi! Abbiamo dunque creato questo sito web, all'interno del quale puoi trovare articoli, video e testi interessanti riguardo all'ambiente e al cambiamento climatico!</span>
					{/*will be edited*/}
				</div>
				
				<img src="https://preview.redd.it/2tnomtldxk281.jpg?width=608&format=pjpg&auto=webp&s=f07ab76a9bd4f2a8161c76dc68c3cfbf691e32b6" className="h-96"></img>
			</div>
			
			<div className="flex flex-col items-center justify-center items-around h-screen font-comfortaa text-white pt-6">
				<h1 className="text-dark-green text-8xl pb-20">Envirotips.</h1>
				<span className="pb-20 text-3xl">(provvisorio) Scopri i consigli per vivere con l'ambiente e le persone che ti stanno intorno!</span> {/*will be edited*/}
				<a alt="Envirotips!" href=""><button className="bg-black h-28 w-64 text-2xl rounded-2xl leading-8">Salta agli <br></br> Envirotips!</button></a>
			</div>
		</div>
	)
}

export default Home