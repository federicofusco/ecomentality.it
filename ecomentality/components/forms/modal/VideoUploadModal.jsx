import { useRef } from "react"
import Button from "./../../buttons/Button"
import { MdClose } from "react-icons/md"
import { useSnackbar } from "notistack"

const VideoUploadModal = ({ visible, onClick, title, onHide }) => {

	const linkRef = useRef ( null );
	const { enqueueSnackbar } = useSnackbar ();
	const YT_URL_REGEX = /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/; // Thanks xeon927 for this awesome regex!

	if ( !visible ) return null;

	const click = () => {
		if ( linkRef.current.value.length > 0 && linkRef.current.value.match ( YT_URL_REGEX ) ) {
			onClick ( linkRef.current.value );
		} else {

			// The input is empty
			enqueueSnackbar ( "Please enter a valid YouTube link", {
				variant: "error",
				autoHideDuration: 1500
			});
		}
	}

	return (
		<div className="w-screen h-screen top-0 left-0 absolute">
			<div className="absolute p-4 h-full sm:h-auto w-full sm:w-3/4 max-w-md border border-gray-300 rounded-none sm:rounded-md bg-white text-black transform left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
				
				<div className="w-full flex justify-between">
					<h1>{ title }</h1>
					<MdClose onClick={ onHide } className="my-auto text-xl text-gray-500" />
				</div>

				<div className="w-full flex justify-start">
					<input className="w-full border h-8 outline-none border-gray-300 rounded-l-md px-2 py-1 mt-3 " type="url" placeholder="https://www.example.com/image.png" ref={ linkRef } />
					<Button className="rounded-l-none h-8 mt-3 rounded-r-md py-1 px-2" onClick={ click }>Insert</Button>
				</div>
			</div>
		</div>
	)
}

export default VideoUploadModal;