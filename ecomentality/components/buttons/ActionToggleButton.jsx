import { useState } from "react"

const ActionToggleButton = ({ onToggle, icons, initialValue = false }) => {

	const [isActive, setActivity] = useState ( initialValue );

	const toggle = () => {
		onToggle ( isActive ? "toggleOff" : "toggleOn" );
		setActivity ( !isActive );
	}

	return (
		<button onClick={ toggle } className={`w-16 h-16 bg-transparent mt-4 flex justify-center ${ isActive ? "text-green-600" : "text-gray-600" } hover:text-green-600 transition-all duration-300`}>
			<div className="my-auto text-2xl">{ isActive ? icons[1] : icons[0] }</div>
		</button>
	)
}

export default ActionToggleButton;