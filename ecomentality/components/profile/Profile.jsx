import ProfileImage from "./ProfileImage"
import Button from "./../buttons/Button"

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
		<div className="mx-6 p-4 flex justify-center">
			<div className="">
				<ProfileImage src={ profileURL } />
				<div className="mx-auto mt-3">
					<h2 className="text-lg text-white text-center">{ displayName }</h2>
					<h3 className="text-sm text-white text-center">Joined { joined }</h3>
				</div>
			</div>
		</div>
	)
}

export default Profile;