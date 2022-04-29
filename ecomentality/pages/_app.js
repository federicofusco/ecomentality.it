import '../styles/globals.css'
import Navbar from "../components/nav/Navbar"

function MyApp({ Component, pageProps }) {
	return (
		<div className="w-screen h-screen bg-light-lime-green">
			<Navbar />
			<Component {...pageProps} />
		</div>
	) 
}

export default MyApp;