import '../styles/globals.css'
import { SnackbarProvider } from "notistack"

const MyApp = ({ Component, pageProps }) => {
	
	return (
		<SnackbarProvider maxSnack={ 3 }>
			<Component {...pageProps} />
		</SnackbarProvider>
	)
}

export default MyApp;