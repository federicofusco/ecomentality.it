import '../styles/globals.css'
import { SnackbarProvider } from "notistack"

const MyApp = ({ Component, pageProps }) => {
	
	return (
		<div className="w-full h-full min-h-screen overflow-x-hidden">
			<SnackbarProvider maxSnack={ 3 } preventDuplicate>
				<Component {...pageProps} />
			</SnackbarProvider>
		</div>
	)
}

export default MyApp;