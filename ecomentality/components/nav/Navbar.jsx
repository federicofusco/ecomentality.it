import Logo from "../Logo"
import Link from "next/link"

const Navbar = () => {
    return (
        <div className="font-comfortaa sticky bg-nav-color rounded-lg top-2 mx-4">
            <div className="flex justify-around items-center text-white h-28 text-2xl">
                <Logo height="80px" width="264px" />
                <Link href=""><a className="mt-8">Chi siamo</a></Link>
                <Link href="https://it.jugomobile.com/wp-content/uploads/2022/05/I-bambini-di-Mike-Myers-non-sono-impressionati-dal-fatto.jpg"><a className="mt-8" alt="Articoli">Articoli</a></Link>
                <Link href="https://www.theresilientactivist.org/wp-content/uploads/2018/08/EnviroTip-Logo-2-300x256-1-300x256.jpg"><a className="mt-8" alt="Envirotips">Envirotips</a></Link>
                <Link href=""><a className="mt-8">Interviste</a></Link>
                <Link href=""><a className="mt-8">Calini Green</a></Link>
                <input className="bg-white text-all-green rounded-md w-64 h-9 mt-8 text-center placeholder:text-light-green focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-4" type="text" placeholder="cerca..."></input>
            </div>
        </div>
    )
}

export default Navbar;