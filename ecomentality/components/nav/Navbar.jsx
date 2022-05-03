import Logo from "../Logo"

const Navbar = () => {
    return (
        <div className="mx-4 ">
            <div className="flex justify-around items-center text-white pt-4 h-28 text-2xl">
                <Logo height="80px" width="264px" />
                <span className="mt-8">sezione</span>
                <span className="mt-8">sezione</span>
                <span className="mt-8">sezione</span>
                <span className="mt-8">sezione</span>
                <span className="mt-8">sezione</span>
                <div className="bg-white text-light-lime-green rounded-md w-64 flex justify-center h-9 mt-9 "><span>cerca...</span></div>
            </div>
            <div className="w-full h-520 flex items-center justify-center">
                <span className="text-white text-7xl text-center leading-tight">We work for the <br></br>
                Planet.</span>
            </div>
        </div>
    )
}

export default Navbar;