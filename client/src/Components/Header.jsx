import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

function Header() {

    const { currentUser } = useSelector(state => state.user)
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const url = new URLSearchParams(location.search)

        url.set('searchTerm', search);

        const queryString = url.toString()

        navigate(`/search?${queryString}`)

    }

    useEffect(()=>{
        const url = new URLSearchParams(location.search)
        const searchTerm = url.get('searchTerm') || search;

        setSearch(searchTerm);
    },[location.search]);


    return (
        <header className="bg-slate-200 shadow-md p-2 px-12">
            <div className="flex justify-between items-center" >
                <h1 className="font-semibold text-sm sm:text-xl">
                    <Link to={'/'}>
                        <span className="text-slate-500">Real</span>
                        <span className="text-slate-700">Estate</span>
                    </Link>
                </h1>

                <form onSubmit={(e) => { handleSubmit(e) }} className="bg-slate-100 p-2 rounded-lg">
                    <input onChange={(e) => { handleChange(e) }} value={search} className="bg-transparent w-28 sm:w-64 focus:outline-none" type="text" placeholder="search" />
                    <button><FaSearch /></button>
                </form>

                <nav className="flex gap-3 justify-between items-center align-middle">
                    <Link className="hidden sm:block hover:underline" to={"/"}>Home </Link>
                    <Link className="hidden sm:block hover:underline" to={"/About"}>About</Link>
                    <Link className="hover:underline" to={"/Profile"}>
                        {currentUser ?
                            <img className="rounded-full h-8 w-8 object-cover" src={currentUser.photo} alt={"profile"} /> :
                            <span>SignIn</span>
                        }
                    </Link>
                </nav>
            </div>
        </header>
    )
}

export default Header;