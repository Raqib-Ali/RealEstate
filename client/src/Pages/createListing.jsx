// import { createClient } from '@supabase/supabase-js'
import { useState } from 'react';
import { supabase } from '../suprabase';
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';

// const projectURL = 'https://rmwsqsqemjcuftsqrwxb.supabase.co';
// const anonkey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtd3Nxc3FlbWpjdWZ0c3Fyd3hiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczODE1OTE0OSwiZXhwIjoyMDUzNzM1MTQ5fQ.FAcpgnv1lv6uGXqwtOX5Ky4g7rU6T2Zf7Y-e5vL_yEI'

// Create a single supabase client for interacting with your database
// const supabase = createClient(projectURL, anonkey)


const CreateListing = () => {
    const {currentUser} = useSelector(state=>state.user)
    const [image, setImage] = useState();
    const [formData, setFormData] = useState({
        imgUrls: [],
        name: '',
        description: '',
        address: '',
        type: "rent",
        parking: false,
        furnished: true,
        offer: false,
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 50,
        offerPrice: 0
    });
    const [imgError, setImgError] = useState();
    const [error, setError] = useState();
    const [loading, setLoding] = useState(false)
    const [imgLoading, setImgLoding] = useState(false)
    const navigate = useNavigate();

    async function handleUpload() {
        if(!image) return setImgError('You must choose an image.');
        setImgError(null)
        if (formData.imgUrls.length < 6) {
            setImgLoding(true)
            try {
                const response = await supabase
                    .storage
                    .from('Images_assets')
                    .upload(`listing_images/${image.name + new Date().toUTCString()}`, image, {
                        cacheControl: '3600',
                        upsert: false
                    })

                if (response.error) {
                    setImgError(response.error.message)

                    setImgLoding(false)
                } else {
                    const { data } = supabase
                        .storage
                        .from('Images_assets')
                        .getPublicUrl(response.data.path)
                    //setImages([...images, data.publicUrl]);
                    setFormData({ ...formData, imgUrls: formData.imgUrls.concat(data.publicUrl) })
                    setImgLoding(false)
                }
            } catch (error) {
                setImgError(error.message)
                console.log(error)
                setImgLoding(false)
            }
        } else {
            setImgError('Cannot upload more than 6')
        }
    }

    const handleChange = (e) => {
        if (e.target.type == 'text' || e.target.type == 'number' || e.target.type == 'textarea') {
            setFormData({
                ...formData,
                [e.target.id]: e.target.value
            })
        }

        if (e.target.type == 'checkbox') {
            if (e.target.id == 'type') {
                setFormData({
                    ...formData,
                    [e.target.id]: (formData.type == "rent") ? 'sell' : "rent"
                })
            } else {
                setFormData({
                    ...formData,
                    [e.target.id]: !(formData[e.target.id])

                })
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoding(true);
        setError(null);

        if(+formData.offerPrice > +formData.regularPrice){
          setError("Discounted price must be less than Regular Price");
          setLoding(false);
          return
        }
        if(+formData.imgUrls < 1) {
            setError("You must upload at least one image")
            setLoding(false)
            return
        }

        try {
            const res = await fetch('/api/listing/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    userRef: currentUser._id
                
                })
            })

            const data = await res.json();

            if (data.success == false) {
                setError(data.message);
                setLoding(false);
                return;
            }

            console.log(data)
            setLoding(false);
            navigate(`/listing/${data._id}`)
           
        } catch (error) {
            setError(error.message);
            setLoding(false)
        }
    }

    return (
        <div>
            <h1 className="text-center text-3xl font-bold my-6">Create Listing</h1>
            <form onSubmit={(e) => { handleSubmit(e) }} className="flex flex-col sm:flex-row max-w-4xl mx-auto gap-4 p-2">
                <div className="flex flex-col gap-3 flex-1">
                    <input required className="p-3 rounded-lg w-full" type="text" placeholder="Name" id="name" value={formData.name} onChange={(e) => { handleChange(e) }} />
                    <textarea required placeholder="Description" className="p-3 rounded-lg" id="description" value={formData.description} onChange={(e) => { handleChange(e) }}></textarea>
                    <input required className="p-3 rounded-lg " type="text" placeholder="Address" id="address" value={formData.address} onChange={(e) => { handleChange(e) }} />
                    <div className="flex flex-wrap gap-5">
                        <div className="flex gap-2 ">
                            <input className="w-5" type="checkbox" id="type" onChange={(e) => { handleChange(e) }} checked={formData.type == 'sell'} />
                            <span>Sell</span>
                        </div>
                        <div className="flex gap-2 ">
                            <input className="w-5" type="checkbox" id="type" onChange={(e) => { handleChange(e) }} checked={formData.type == 'rent'} />
                            <span>Rent</span>
                        </div>
                        <div className="flex gap-2 ">
                            <input className="w-5" type="checkbox" id="parking" onChange={(e) => { handleChange(e) }} checked={formData.parking} />
                            <span>Parking spot</span>
                        </div>
                        <div className="flex gap-2 ">
                            <input className="w-5" type="checkbox" id="furnished" onChange={(e) => { handleChange(e) }} checked={formData.furnished} />
                            <span>Furnished</span>
                        </div>
                        <div className="flex gap-2 ">
                            <input className="w-5" type="checkbox" id="offer" onChange={(e) => { handleChange(e) }} checked={formData.offer} />
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <div className="flex gap-2 items-center">
                            <input className="border border-gray-600 rounded-lg p-2" type="number" min='1' max='10' id="bedrooms" value={formData.bedrooms} onChange={(e) => { handleChange(e) }} />
                            <span>Beds</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <input className="border border-gray-600 rounded-lg p-2" type="number" min='1' max='10' id="bathrooms" value={formData.bathrooms} onChange={(e) => { handleChange(e) }} />
                            <span>Baths</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <input className="border border-gray-600 rounded-lg p-2" type="number" min='50' max='1000000' id="regularPrice" value={formData.regularPrice} onChange={(e) => { handleChange(e) }} />
                            <div className="flex flex-col items-center">
                                <span>Regular Price</span>
                                <span className="text-xs text-gray-600">($ / Month)</span>
                            </div>
                        </div>
                        {
                            formData.offer && <div className="flex gap-2 items-center">
                            <input className="border border-gray-600 rounded-lg p-2" type="number" min='0' max='1000000' id="offerPrice" value={formData.offerPrice} onChange={(e) => { handleChange(e) }} />
                            <div className="flex flex-col items-center">
                                <span>Discounted Price</span>
                                <span className="text-xs text-gray-600">($ / Month)</span>
                            </div>
                        </div>
                        }
                    </div>

                    <div className="flex flex-wrap gap-3">

                    </div>
                </div>

                <div className="flex flex-col flex-1 gap-2">
                    <p className="font-bold">Images: <span className="text-gray-500 font-normal">The first image will be cover (max 6)</span></p>
                    <div className="flex gap-2">
                        <input  onChange={(e) => { setImage(e.target.files[0]) }} className="p-3 border rounded w-full" accept='Image/*' type="file" />
                        <button disabled={loading} onClick={handleUpload} type="button" className="p-3 border text-green-600 rounded-lg border-green-600 hover:opacity-90 disabled:opacity-90">
                            {
                                imgLoading ? 'Updating...' : 'Upload'
                            }
                        </button>
                    </div>
                    <p className='text-red-600 text-sm'>{imgError}</p>
                    <div className='flex flex-col gap-2 max-h-60 overflow-auto'>
                        {formData.imgUrls && formData.imgUrls.map((image, index) => {
                            return <div key={index} className='flex justify-between p-2 border'>
                                <img className='w-20 h-14 object-contain' src={image} alt="" />
                                <button
                                    type='button'
                                    onClick={() => {
                                        setFormData({ ...formData, imgUrls: formData.imgUrls.filter(imageDelete => imageDelete != image) })
                                    }} className='text-red-600 uppercase'>Delete</button>
                            </div>
                        })}
                    </div>
                    <button disabled={loading} className="bg-slate-600 p-3 uppercase hover:opacity-90 rounded-lg text-white disabled:opacity-85">
                        {
                            loading ? "Loading..." : "Create Listing"
                        }
                    </button>
                    <p className='text-sm text-red-600 mt-2'>{error}</p>
                </div>
            </form>
            
        </div>
    )
}

export default CreateListing;