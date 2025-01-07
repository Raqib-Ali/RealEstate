import { Link } from "react-router-dom";

function Header() {

    return (
        <header className="bg-slate-200 shadow-md p-2">
            <div className="flex justify-between items-center" >
                <h1 className="font-semibold text-sm sm:text-xl">
                    <Link to={'/'}>
                    <span className="text-slate-500">Real</span>
                    <span className="text-slate-700">Estate</span>
                    </Link>
                </h1>

                <form className="bg-slate-100 p-2 rounded-lg">
                    <input className="bg-transparent w-28 sm:w-64 focus:outline-none" type="text" placeholder="search"/>
                </form>

                <nav className="flex gap-3 justify-between align-middle">
                  <Link className="hidden sm:block hover:underline"  to={"/Profile"}>Home </Link>
                  <Link className="hidden sm:block hover:underline"  to={"/About"}>About</Link>
                  <Link className="hover:underline"  to={"/SignIn"}>SignIn</Link>
                </nav>
            </div>
        </header>
    )
}

export default Header;