import { useSnackbar } from "notistack"

import { MdShare } from "react-icons/md"
import GenericActionButton from "./../GenericActionButton"

/**
 * A button which shared the video
 * 
 * @param {String} id - The video's ID
 * @param {?Boolean} isFallback - Whether or not to display a fallback button (default: false)
 * @note If isFallback is true, the only difference is the logic, grafically it remains the same
 * @returns A button for sharing the video
 */
const VideoShareButton = ({ id, isFallback = false }) => {

	const { enqueueSnackbar } = useSnackbar ();

	const onClick = () => {

		if ( isFallback ) {
			enqueueSnackbar ( "Something went wrong", {
				variant: "error",
				autoHideDuration: 1000
			});

			return;
		}

		// Copies the video URL to the clipboard
		navigator.clipboard.writeText ( `${ process.env.NEXT_PUBLIC_URL }/view/interview/${ id }` );

		// Displays notification
		enqueueSnackbar ( "Copied link to clipboard!", {
			variant: "default",
			autoHideDuration: 3000
		});
	}

	return (
		<GenericActionButton
			onClick={ onClick }
			className="text-gray-600">
			{ <MdShare /> }
		</GenericActionButton>
	)
}

export default VideoShareButton;