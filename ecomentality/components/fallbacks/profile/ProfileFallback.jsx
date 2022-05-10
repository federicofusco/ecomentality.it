import Button from "./../../buttons/Button"
import ProfileImageFallback from "./ProfileImageFallback";

const ProfileFallback = () => {
	return (
		<div className="mx-6 p-4 border border-gray-300 rounded-lg flex justify-between">
			<div className="flex w-full">
				<div className="w-16">
					<ProfileImageFallback />
				</div>
				<div className="my-auto w-full ml-6 max-w-xs">
					<div className="animate-pulse bg-gray-300 rounded-lg w-full text-transparent h-3">a</div>
					<div className="animate-pulse mt-1 bg-gray-300 rounded-lg w-3/4 text-transparent h-3">a</div>
				</div>
			</div>
			<div className="hidden sm:block max-h-20 my-auto">
				<Button disabled={ true } rounded={ false }>Random article</Button>
			</div> 
		</div>
	)
}

export default ProfileFallback;