import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ListingItem } from "../Components/ListingItem";

export const Search = () => {

    const [sidebarFrom, setsidebar] = useState({
        searchTerm: '',
        type: 'all',
        offer: false,
        parking: true,
        furnished: false,
        sort: 'createdAt',
        order: 'asc',
        startIndex: 0
    })
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [listing, setListing] = useState([]);
    const [showMore, setShowMore] = useState(false);


    const handlechange = (e) => {
        if (e.target.id === 'searchTerm') {
            setsidebar({
                ...sidebarFrom,
                [e.target.id]: e.target.value
            })
        }

        if (e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale') {
            setsidebar({
                ...sidebarFrom,
                type: e.target.id
            })
        }

        if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setsidebar({
                ...sidebarFrom,
                [e.target.id]: !(sidebarFrom[e.target.id])
            })
        }

        if (e.target.id === 'sort_order') {
            const sort = e.target.value.split('_')[0]
            const order = e.target.value.split('_')[1]

            setsidebar({
                ...sidebarFrom,
                sort,
                order
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const url = new URLSearchParams();
        url.set('type', sidebarFrom.type);
        url.set('offer', sidebarFrom.offer);
        url.set('parking', sidebarFrom.parking);
        url.set('furnished', sidebarFrom.furnished);
        url.set('searchTerm', sidebarFrom.searchTerm);
        url.set('sort', sidebarFrom.sort);
        url.set('order', sidebarFrom.order);

        const queryString = url.toString()

        navigate(`/search?${queryString}`)

    }

    useEffect(() => {
        const url = new URLSearchParams(location.search);
        const searchTerm = url.get('searchTerm') || sidebarFrom.searchTerm;
        const offer = url.get('offer') || sidebarFrom.offer;
        const parking = url.get('parking') || sidebarFrom.parking;
        const furnished = url.get('furnished') || sidebarFrom.furnished;
        const sort = url.get('sort') || sidebarFrom.sort;
        const order = url.get('order') || sidebarFrom.order;
        const type = url.get('type') || sidebarFrom.type;
        const startIndex = url.get('startIndex') || sidebarFrom.startIndex;

        const queryString = url.toString()


        setsidebar({
            searchTerm,
            type,
            parking: (parking === "true") ? true : false,
            furnished: (furnished === "true") ? true : false,
            offer: (offer === "true") ? true : false,
            order,
            sort,
            startIndex
        })

        const getListing = async () => {
            try {
                setShowMore(false);
                setError(null);
                setLoading(true);
                const response = await fetch(`/api/listing/get?${queryString}`);
                const data = await response.json();

                if (data.success === false) {
                    setError(data.message);
                    setLoading(false)
                    return;
                }

                if (data.length > 8) {
                    setShowMore(true);
                }
                setListing(data);
                setLoading(false)
            } catch (error) {
                setError(error.message)
                setLoading(false);
            }
        }
        getListing();
    }, [location.search])

    const handleShowMore = async () => {

        const index = listing.length;
        const url = new URLSearchParams(location.search);
        url.set('startIndex', index);

        const queryString = url.toString();

       
        try {
            setShowMore(false);
            setError(null);
            const response = await fetch(`/api/listing/get?${queryString}`);
            const data = await response.json();

            if (data.success === false) {
                setError(data.message);
                setLoading(false);
                return;
            }

            setListing([
                ...listing,
                ...data
            ]);

            if (data.length > 8) {
                setShowMore(true);
            }
 
        } catch (error) {
            setError(error.message);
        }
    }

    return <div className="">
        <div className="flex flex-col md:flex-row">
            <div className="p-6 border-r-2">
                <form onSubmit={(e) => { handleSubmit(e) }} className="flex flex-col gap-6">
                    <div className="flex flex-wrap gap-3 items-center">
                        <span className="font-semibold">Search:</span>
                        <input onChange={(e) => handlechange(e)} className="p-2 rounded-lg" type="text" placeholder="search" value={sidebarFrom.searchTerm} id="searchTerm" />
                    </div>
                    <div className="flex flex-wrap gap-3 items-center">
                        <label className="font-semibold" >Type:</label>
                        <div className="flex gap-1">
                            <input onChange={(e) => handlechange(e)} checked={sidebarFrom.type == 'all'} type="checkbox" id="all" />
                            <span>Rent & Sale</span>
                        </div>
                        <div className="flex gap-1">
                            <input onChange={(e) => handlechange(e)} checked={sidebarFrom.type === 'rent'} type="checkbox" id="rent" />
                            <span>Rent</span>
                        </div>
                        <div className="flex gap-1">
                            <input onChange={(e) => handlechange(e)} checked={sidebarFrom.type === 'sale'} type="checkbox" id="sale" />
                            <span>Sale</span>
                        </div>
                        <div className="flex gap-1">
                            <input onChange={(e) => handlechange(e)} checked={sidebarFrom.offer === true} type="checkbox" id="offer" />
                            <span>Offer</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3 items-center">
                        <label className="font-semibold" >Amenisties:</label>
                        <div className="flex gap-1">
                            <input onChange={(e) => handlechange(e)} checked={sidebarFrom.parking} type="checkbox" id="parking" />
                            <span>Parking</span>
                        </div>
                        <div className="flex gap-1">
                            <input onChange={(e) => handlechange(e)} checked={sidebarFrom.furnished} type="checkbox" id="furnished" />
                            <span>Furnished</span>
                        </div>
                    </div>

                    <div className="flex gap-3 items-center">
                        <label className="font-semibold">Sort:</label>
                        <select onChange={(e) => handlechange(e)} className="border-2 p-1 rounded-lg" id="sort_order">
                            <option value="regularPrice_asc">Price low to high</option>
                            <option value="regularPrice_desc">Price high to low</option>
                            <option value="createdAt_desc">Recents</option>
                            <option value="createdAt_asc">Oldest</option>
                        </select>
                    </div>
                    <button className="bg-slate-600 p-2 text-white hover:opacity-85 rounded-lg uppercase">Search</button>
                </form>
            </div>

            <div className="flex-1">
                <div className="border-b-2 p-3">
                    <h1 className="text-3xl font-semibold">Listings:</h1>
                </div>

                <div className="p-7 flex flex-wrap gap-6">
                    {!loading && listing.length === 0 && 'No listing found!'}
                    {loading && 'Loading...'}
                    {!loading && listing && listing.map(item => <ListingItem key={item._id} listing={item} />)}
                </div>
                {
                    showMore && <p onClick={handleShowMore} className="text-green-600 text-center cursor-pointer hover:underline p-2">Show more</p>
                }
            </div>
        </div>

    </div>
}