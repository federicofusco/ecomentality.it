import { MdShare } from "react-icons/md"
import { useSnackbar } from "notistack"

const ShareButton = ({ article }) => {

	const { enqueueSnackbar } = useSnackbar ();

	const onClick = () => {

		// Copies the article URL to the clipboard
		navigator.clipboard.writeText ( `${ process.env.NEXT_PUBLIC_URL }/view/article/${ article.id }` );

		// Displays notification
		enqueueSnackbar ( "Copied link to clipboard!", {
			variant: "default",
			autoHideDuration: 3000
		});
	}

	return (
		<button onClick={ onClick } className={`w-16 h-16 bg-transparent mt-4 flex justify-center text-gray-600 hover:text-green-600 transition-all duration-300`}>
			<div className="my-auto text-2xl">
				{ <MdShare /> }
			</div>
		</button>
	)
}

export default ShareButton;