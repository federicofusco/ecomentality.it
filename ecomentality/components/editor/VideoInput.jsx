import { MdPlayArrow } from "react-icons/md"
import { useState } from "react"
import VideoUploadModal from "./../forms/modal/VideoUploadModal"
import UpdateVideoButton from "../buttons/icon/editor/UpdateVideoButton"

const VideoInput = ({ onSubmit, videoLink }) => {

	const [modalVisible, setModalVisibility] = useState ( false );
	const toggleModal = () => setModalVisibility ( !modalVisible );

	return (
		<div className="w-full flex justify-center">
			
			{ !videoLink && <div onClick={ toggleModal } title="Upload video" style={{width: 560, height: 315 }} className="bg-white border border-gray-400 rounded-md flex">
				<div className="m-auto">
					<div className="mx-auto w-16 h-16 flex rounded-full border border-gray-500">
						<MdPlayArrow className="m-auto text-gray-500 text-4xl" />
					</div>
					<p className="text-sm text-gray-500 mt-4">Upload Interview</p>
				</div>
			</div> }
			
			{ videoLink && <div className="relative w-full flex justify-center">
				<iframe 
						width="560"  
						height="315" 
						src={ videoLink } 
						title="YouTube video player" 
						frameBorder="0" 
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
						allowFullScreen>
				</iframe>
				<UpdateVideoButton openModal={ toggleModal } />
			</div> }

			<VideoUploadModal title="Upload video" visible={ modalVisible } onClick={(x) => { onSubmit ( x ); toggleModal(); }} onHide={ toggleModal } />
		</div>
	)
}

export default VideoInput;