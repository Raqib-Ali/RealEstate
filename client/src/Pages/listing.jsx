import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Navigation, A11y } from 'swiper/modules';
import { FaAddressBook, FaBath, FaBed, FaChair, FaLandmark, FaLocationArrow, FaMap, FaParking } from "react-icons/fa";


import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/navigation';
import { useSelector } from "react-redux";
import { Contact } from "../Components/contact";



export const Listing = () => {

    const params = useParams();
    const [listing, setListing] = useState({ imgUrls: [] });
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const { currentUser } = useSelector(state => state.user);
    const [contact, setContact] = useState(false);
    

    


    useEffect(() => {
        const getListing = async () => {
            try {
                setError(false)
                setLoading(true)
                const response = await fetch(`/api/listing/get/${params.id}`)
                const data = await response.json();

                if (data.success == false) {
                    console.log(data.message)
                    setError(true)
                    setLoading(false)
                    return;
                }

                setListing(data);
                setLoading(false);
            } catch (error) {
                console.log(error.messsage)
                setError(true);
                setLoading(false);
            }
        }
        getListing();
    }, [])

    return <div>
        {
            loading && <div className="text-center m-8 text-2xl">Loading...</div>
        }

        {
            error && <div className="text-center m-8 text-2xl">Something went wrong...</div>
        }

        {
            listing && !error && !loading && <div className="mt-2">
                <Swiper

                    modules={[Navigation, A11y]}
                    spaceBetween={50}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}
                >
                    {
                        listing?.imgUrls.map(images => <SwiperSlide key={images}><img className="w-full h-60 sm:h-96" src={images} alt="" /></SwiperSlide>)
                    }

                </Swiper>

                <div className="max-w-3xl mx-auto flex flex-col gap-4 mt-4 p-2">

                    {/* Title */}
                    {listing.name && <h1 className="text-2xl font-semibold">{listing.name} - {(listing.type == 'rent') ? <span>${listing.regularPrice}/month</span> : <span>${listing.regularPrice}</span>}</h1>
                    }
                    {/* Address */}
                    <p className="flex items-center gap-1"> <FaLocationArrow className=" text-green-700" /> {listing.address}</p>

                    {/* Type & Offer */}
                    <div className="flex gap-4">
                        {listing.type && <button className="bg-red-800 px-8 py-1 text-white rounded-lg">{listing.type == 'rent' ? 'For Rent' : 'For Sale'}</button>}
                        {listing.offer && <button className="bg-green-800 px-8 py-1 text-white rounded-lg">${+listing.regularPrice - +listing.offerPrice} discount</button>}
                    </div>

                    {/* description */}
                    <p><span className="font-semibold">Description - </span> {listing.description}</p>

                    {/* Perks */}
                    {
                        listing.bedrooms && <ul className="flex gap-3 sm:gap-8 flex-wrap text-green-800 font-semibold">
                        {(listing.bathrooms > 1) ? <li className="flex flex-nowrap items-center gap-1"> <FaBath /> {listing.bathrooms} Baths</li> : <li className="flex flex-nowrap items-center gap-1"><FaBath /> {listing.bathrooms} Bath</li>}
                        {(listing.bedrooms > 1) ? <li className="flex flex-nowrap items-center gap-1"> <FaBed /> {listing.bedrooms} Beds</li> : <li className="flex flex-nowrap items-center gap-1"><FaBed /> {listing.bedrooms} bed</li>}
                        {(listing.parking) ? <li className="flex flex-nowrap items-center gap-1"> <FaParking /> Parking allowed</li> : <li className="flex flex-nowrap items-center gap-1"><FaParking /> Parking not allowed</li>}
                        {(listing.furnished) ? <li className="flex flex-nowrap items-center gap-1"><FaChair /> Furnished</li> : <li className="flex flex-nowrap items-center gap-1"><FaChair /> Not furnished</li>}
                    </ul>
                    }

                    {/* Contact */}
                    {
                        currentUser && currentUser._id == listing.userRef && <button hidden={contact} onClick={() => { setContact(true) }} className="bg-slate-700 p-3 text-white rounded-lg uppercase hover:opacity-85">
                            Contact Landlord
                        </button>
                    }

                    {
                        contact && <Contact listing={listing} change={setContact}/>
                    }

                </div>
            </div>

        }
    </div>
}