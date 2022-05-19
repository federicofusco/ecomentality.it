import ProfileImage from "./ProfileImage"
import Button from "../buttons/Button"

/**
 * Displays a given user's profile
 * 
 * @param {Object} created - The user's join timestamp
 * @param {String} profileURL - The user's pfp URL
 * @param {String} displayName - The user's display name
 * @returns A profile
 */
const Profile = ({ created, profileURL, displayName }) => {

	const date = new Date ( created );
	const joined = `${date.getDate ()}/${date.getMonth () + 1}/${date.getFullYear ()}`;

	return (
		<div className="mx-6 p-4 border border-gray-300 rounded-lg flex justify-between">
			<div className="flex">
				<ProfileImage src={ profileURL } />
				<div className="my-auto ml-6">
					<h2 className="text-lg">{ displayName }</h2>
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