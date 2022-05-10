import '../styles/globals.css'
import Navbar from "../components/nav/Navbar"

function MyApp({ Component, pageProps }) {
	return (
		<div className="w-full h-full bg-all-green select-none">
			<Navbar />
			<Component {...pageProps} />
		</div>
	) 
}

export default MyApp;