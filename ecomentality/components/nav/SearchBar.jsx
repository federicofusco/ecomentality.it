import { useRef } from "react"

const SearchBar = () => {

	const searchRef = useRef ( null );

	return (
		<input className="bg-white px-4 py-1 hidden md:block text-black rounded-md my-auto" ref={ searchRef } placeholder="Search..." type="text" />
	)
}

export default SearchBar;