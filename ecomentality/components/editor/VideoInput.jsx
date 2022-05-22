import { MdPlayArrow } from "react-icons/md"

const VideoInput = () => {
	return (
		<div className="w-full flex justify-center">
			<div title="Upload video" style={{width: 560, height: 315 }} className="bg-white border border-gray-400 rounded-md flex">
				<div className="m-auto">
					<div className="mx-auto w-16 h-16 flex rounded-full border border-gray-500">
						<MdPlayArrow className="m-auto text-gray-500 text-4xl" />
					</div>
					<p className="text-sm text-gray-500 mt-4">Upload Interview</p>
				</div>
			</div>
		</div>
	)
}

export default VideoInput;