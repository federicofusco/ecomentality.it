import Logo from "../Logo"

const Navbar = () => {
    return (
        <div className="font-comfortaa sticky bg-nav-color rounded-lg top-2 mx-4">
            <div className="flex justify-around items-center text-white h-28 text-2xl">
                <Logo height="80px" width="264px" />
                <span className="mt-8"><a href="">sezione</a></span>
                <span className="mt-8"><a href="">sezione</a></span>
                <span className="mt-8"><a href="">sezione</a></span>
                <span className="mt-8"><a href="">sezione</a></span>
                <span className="mt-8"><a href="">sezione</a></span>
                <input className="bg-white text-all-green rounded-md w-64 h-9 mt-9 text-center placeholder:text-all-green focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-4" type="text" placeholder="cerca..."></input>
            </div>
        </div>
    )
}

export default Navbar;