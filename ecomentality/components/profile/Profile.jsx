import ProfileImage from "./ProfileImage"
import Button from "../buttons/Button"

const Profile = ({ user }) => {

	const date = new Date ( user.created );
	const joined = `${date.getDate ()}/${date.getMonth () + 1}/${date.getFullYear ()}`;

	return (
		<div className="mx-6 p-4 border border-gray-300 rounded-lg flex justify-between">
			<div className="flex">
				<ProfileImage src={ user.profile } />
				<div className="my-auto ml-6">
					<h2 className="text-lg">{ user.name }</h2>
					<h3 className="text-sm">Joined { joined }</h3>
				</div>
			</div>
			<div className="max-h-20 my-auto">
				<Button rounded={ false }>Random article</Button>
			</div>
		</div>
	)
}

export default Profile;