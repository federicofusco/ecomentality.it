const ActionButton = ({ onClick, icon }) => {
	return (
		<button onClick={ onClick } className="w-16 h-16 bg-transparent mt-4 flex justify-center text-gray-600 hover:text-green-600 transition-all duration-300">
			<div className="my-auto text-2xl">{ icon }</div>
		</button>
	)
}

export default ActionButton;