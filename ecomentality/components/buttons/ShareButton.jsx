import { MdShare } from "react-icons/md"
import { useSnackbar } from "notistack"

/**
 * A button which shared the article
 * 
 * @param {String} id - The article's ID
 * @param {?Boolean} isFallback - Whether or not to display a fallback button (default: false)
 * @note If isFallback is true, the only difference is the logic, grafically it remains the same
 * @returns A button for sharing the article
 */
const ShareButton = ({ id, isFallback = false }) => {

	const { enqueueSnackbar } = useSnackbar ();

	const onClick = () => {

		if ( isFallback ) {
			enqueueSnackbar ( "Something went wrong", {
				variant: "error",
				autoHideDuration: 1000
			});

			return;
		}

		// Copies the article URL to the clipboard
		navigator.clipboard.writeText ( `${ process.env.NEXT_PUBLIC_URL }/view/article/${ id }` );

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