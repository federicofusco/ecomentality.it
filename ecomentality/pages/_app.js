import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
	return <Component className="overflow-x-hidden" {...pageProps} />
}

export default MyApp;