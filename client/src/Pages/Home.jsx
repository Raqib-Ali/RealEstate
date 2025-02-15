import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListingItem } from "../Components/ListingItem";
import { Autoplay, Navigation, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


function Home() {

    const [offerListings, setListingOffer] = useState([]);
    const [recentListings, setListingRecents] = useState([]);
    const [rentListings, setRentListings] = useState([]);


    useEffect(() => {

        const getOfferListings = async () => {
            const response = await fetch('/api/listing/get?offer=true&limit=4');
            const data = await response.json();

            setListingOffer(data);
            getRecentsListings();
        }
        getOfferListings();

        const getRecentsListings = async () => {
            const response = await fetch('/api/listing/get?sort=createdAt&order=desc&limit=4');
            const data = await response.json();

            setListingRecents(data);
            getRentListings();
        }

        const getRentListings = async () => {
            const response = await fetch('/api/listing/get?type=rent&sort=createdAt&order=desc&limit=4');
            const data = await response.json();

            setRentListings(data);
        }
    }, [])



    return (
        <div>
            {/* Top */}

            <div className="flex flex-col gap-3 p-11 md:p-28 max-w-8xl mx-auto">
                <h1 className="text-slate-800 text-2xl md:text-5xl  font-bold">Find your next <span className="text-slate-600">perfect</span> <br /> place with ease</h1>
                <p className="text-slate-500">The best place to find your next perfect place to live</p>
                <Link to={'/search'} className="text-blue-800">Let's get started...</Link>
            </div>

            {/* Swiper */}

            <Swiper
                modules={[Navigation, A11y, Autoplay]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
            >
                
                    
                    {
                        offerListings.map(listing => <SwiperSlide key={listing._id} style={{background: `url(${listing.imgUrls[0]}) center no-repeat`, width: '100%', backgroundSize: "cover", aspectRatio:" 11/4"}} className="swiper-slide"></SwiperSlide>)
                    }

                

            </Swiper>

            {/* Recents listings */}

            {
                recentListings && recentListings.length > 0 && <div className="flex flex-col gap-4 p-6">

                    <div className=" flex flex-col gap-1">
                        <h1 className="text-slate-700 text-4xl font-bold">Recent offers</h1>
                        <Link to={'/search?sort=createdAt&order=desc'} className="text-blue-700 font-semibold text-lg">Show more...</Link>
                    </div>

                    <div className=" flex flex-wrap gap-6">
                        {
                            recentListings && recentListings.length > 0 && recentListings.map(listing => <ListingItem listing={listing} key={listing._id} />)
                        }
                    </div>
                </div>
            }

            {/* Rects places on Offer */}

            {
                offerListings && offerListings.length > 0 && <div className="flex flex-col gap-4 p-6">

                    <div className="flex flex-col gap-1">
                        <h1 className="text-slate-700 text-4xl font-bold">Places on offer</h1>
                        <Link to={'/search?offer=true'} className="text-blue-700 font-semibold text-lg">Show more...</Link>
                    </div>

                    <div className="flex flex-wrap gap-6">
                        {
                            offerListings && offerListings.length > 0 && offerListings.map(listing => <ListingItem listing={listing} key={listing._id} />)
                        }
                    </div>
                </div>
            }


            {/* Recent places for rent */}

            {
                rentListings && rentListings.length > 0 && <div className="flex flex-col gap-4 p-6">

                    <div className="flex flex-col gap-1">
                        <h1 className="text-slate-700 text-4xl font-bold">Recent places for rent</h1>
                        <Link to={'/search?type=rent&sort=createdAt&order=desc'} className="text-blue-700 font-semibold text-lg">Show more...</Link>
                    </div>

                    <div className="flex flex-wrap gap-6">
                        {
                            rentListings && rentListings.length > 0 && rentListings.map(listing => <ListingItem listing={listing} key={listing._id} />)
                        }
                    </div>
                </div>
            }


        </div>
    )
}

export default Home;