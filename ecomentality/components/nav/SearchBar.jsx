import { useRef } from "react"
import { MdSearch } from "react-icons/md"

const SearchBar = () => {

	const searchRef = useRef ( null );

	return (
		<form role="search" className="flex justify-start">
			<div className="h-8 w-8 hidden md:block bg-white rounded-l-md">
				<label aria-label="search" htmlFor="search" className="flex w-full h-full"> 
					<MdSearch className="text-gray-500 m-auto" />
				</label>
			</div>
			<input tabIndex="0" id="search" className="bg-white outline-none h-8 pr-4 py-1 hidden md:block text-black rounded-r-md my-auto" ref={ searchRef } placeholder="Search..." type="text" />
		</form>
	)
}

export default SearchBar;