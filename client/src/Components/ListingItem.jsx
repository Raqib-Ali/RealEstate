import { FaLocationArrow } from "react-icons/fa"
import { Link } from "react-router-dom"


export const ListingItem = ({ listing }) => {

    return <div className="border shadow-md rounded-lg overflow-hidden w-[320px]">
        <Link to={`/listing/${listing._id}`}>
            <img className="hover:scale-105 h-40 w-full transition-all duration-500" src={listing.imgUrls[0]} alt="" />
            <div className="p-4 flex flex-col gap-1">
                <h2 className="font-semibold text-xl truncate text-slate-800">{listing.name}</h2>
                <p className="text-sm flex gap-2 items-center text-slate-700"><FaLocationArrow className="text-green-600"/> {listing.address}</p>
                <p className="line-clamp-3 text-slate-700 leading-5">{listing.description}</p>
            </div>
        </Link>
    </div>
}