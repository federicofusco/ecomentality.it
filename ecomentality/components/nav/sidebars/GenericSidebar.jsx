/**
 * Displays a sidebar
 * 
 * @returns A sidebar
 */
const GenericSidebar = ({ children }) => {
	return (
		<div className="hidden pt-20 sm:block flex-1 bg-white border-r absolute left-0 top-0 h-screen w-16">
			<div className="my-auto">
				{ children }
			</div>
		</div>
	)
}

export default GenericSidebar;