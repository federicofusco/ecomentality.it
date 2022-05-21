import { useRef } from "react"
import Button from "../../buttons/Button"

const EditorImageModal = ({ visible, onClick }) => {

	const linkRef = useRef ( null );

	if ( !visible ) return null;

	const click = () => {
		onClick ( linkRef.current.value );
	}

	return (
		<div className="w-screen h-screen top-0 left-0 absolute">
			<div className="absolute p-4 h-full sm:h-auto w-full sm:w-3/4 max-w-md border border-gray-300 rounded-none sm:rounded-md bg-white text-black transform left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
				<h1>Insert image</h1>

				<div className="w-full flex justify-start">
					<input className="w-full border h-8 border-gray-300 rounded-l-md px-2 py-1 mt-3 " type="url" placeholder="https://www.example.com/image.png" ref={ linkRef } />
					<Button className="rounded-l-none h-8 mt-3 rounded-r-md py-1 px-2" onClick={ click }>Insert</Button>
				</div>
			</div>
		</div>
	)
}

export default EditorImageModal;