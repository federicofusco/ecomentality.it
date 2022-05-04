import Logo from "../Logo"

const Navbar = () => {
    return (
        <div className="sticky bg-nav-color rounded-lg top-2 mx-4">
            <div className="flex justify-around items-center text-white h-28 text-2xl">
                <Logo height="80px" width="264px" />
                <span className="mt-8">sezione</span>
                <span className="mt-8">sezione</span>
                <span className="mt-8">sezione</span>
                <span className="mt-8">sezione</span>
                <span className="mt-8">sezione</span>
                <div className="bg-white text-all-green rounded-md w-64 flex justify-center h-9 mt-9 "><span>cerca...</span></div>
            </div>
        </div>
    )
}

export default Navbar;