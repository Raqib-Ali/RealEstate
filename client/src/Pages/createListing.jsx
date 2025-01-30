// import { createClient } from '@supabase/supabase-js'
import { useState } from 'react';
import { supabase } from '../suprabase';

// const projectURL = 'https://rmwsqsqemjcuftsqrwxb.supabase.co';
// const anonkey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtd3Nxc3FlbWpjdWZ0c3Fyd3hiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczODE1OTE0OSwiZXhwIjoyMDUzNzM1MTQ5fQ.FAcpgnv1lv6uGXqwtOX5Ky4g7rU6T2Zf7Y-e5vL_yEI'

// Create a single supabase client for interacting with your database
// const supabase = createClient(projectURL, anonkey)


const CreateListing = () => {

    const [image, setImage] = useState();
    const [formData, setFormData] = useState({
        imgUrls: [],
    });
    const [error, setError] = useState();
    const [loading, setLoding] = useState(false)

    async function handleUpload() {
        setError(null)
        if (formData.imgUrls.length < 6) {
            setLoding(true)
            try {
                const response = await supabase
                    .storage
                    .from('Images_assets')
                    .upload(`listing_images/${image.name + new Date().toUTCString()}`, image, {
                        cacheControl: '3600',
                        upsert: false
                    })

                if (response.error) {
                    setError(response.error.message)
                    setLoding(false)
                } else {
                    const { data } = supabase
                        .storage
                        .from('Images_assets')
                        .getPublicUrl(response.data.path)
                    //setImages([...images, data.publicUrl]);
                    setFormData({ ...formData, imgUrls: formData.imgUrls.concat(data.publicUrl) })
                    setLoding(false)
                }
            } catch (error) {
                setError(error.message)
                console.log(error)
                setLoding(false)
            }
        } else {
            setError('Cannot upload more than 6')
        }
    }

    return (
        <div>
            <h1 className="text-center text-3xl font-bold my-6">Create Listing</h1>
            <form className="flex flex-col sm:flex-row max-w-3xl mx-auto gap-4">
                <div className="flex flex-col gap-3 flex-1">
                    <input className="p-3 rounded-lg w-full" type="text" placeholder="Name" id="name" />
                    <textarea placeholder="Description" className="p-3 rounded-lg" id="description"></textarea>
                    <input className="p-3 rounded-lg " type="text" placeholder="Address" id="address" />
                    <div className="flex flex-wrap gap-5">
                        <div className="flex gap-2 ">
                            <input className="w-5" type="checkbox" id="sell" />
                            <span>Sell</span>
                        </div>
                        <div className="flex gap-2 ">
                            <input className="w-5" type="checkbox" id="rent" />
                            <span>Rent</span>
                        </div>
                        <div className="flex gap-2 ">
                            <input className="w-5" type="checkbox" id="parking" />
                            <span>Parking spot</span>
                        </div>
                        <div className="flex gap-2 ">
                            <input className="w-5" type="checkbox" id="furnished" />
                            <span>Furnished</span>
                        </div>
                        <div className="flex gap-2 ">
                            <input className="w-5" type="checkbox" id="offer" />
                            <span>Other</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <div className="flex gap-2 items-center">
                            <input className="border border-gray-600 rounded-lg p-2" type="number" min='1' max='10' id="beds" />
                            <span>Beds</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <input className="border border-gray-600 rounded-lg p-2" type="number" min='1' max='10' id="baths" />
                            <span>Baths</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <input className="border border-gray-600 rounded-lg p-2" type="number" min='1' max='10' id="regularPrice" />
                            <div className="flex flex-col items-center">
                                <span>Regular Price</span>
                                <span className="text-xs text-gray-600">($ / Month)</span>
                            </div>
                        </div>
                        <div className="flex gap-2 items-center">
                            <input className="border border-gray-600 rounded-lg p-2" type="number" min='1' max='10' id="discountedPrice" />
                            <div className="flex flex-col items-center">
                                <span>Discounted Price</span>
                                <span className="text-xs text-gray-600">($ / Month)</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3">

                    </div>
                </div>

                <div className="flex flex-col flex-1 gap-2">
                    <p className="font-bold">Images: <span className="text-gray-500 font-normal">The first image will be cover (max 6)</span></p>
                    <div className="flex gap-2">
                        <input onChange={(e) => { setImage(e.target.files[0]) }} className="p-3 border rounded w-full" accept='Image/*' required type="file" />
                        <button onClick={handleUpload} type="button" className="p-3 border text-green-600 rounded-lg border-green-600">
                            {
                                loading ? 'Updating...' : 'Upload'
                            }
                        </button>
                    </div>
                    <p className='text-red-600 text-sm'>{error}</p>
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
                    <button className="bg-slate-600 p-3 uppercase hover:opacity-90 rounded-lg text-white">Create Listing</button>
                </div>
            </form>
        </div>
    )
}

export default CreateListing;