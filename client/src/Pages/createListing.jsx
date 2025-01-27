
const CreateListing = () => {

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
                        <input className="p-3 border rounded w-full" type="file" />
                        <button type="button" className="p-3 border text-green-600 rounded-lg border-green-600">Upload</button>
                    </div>
                    <button className="bg-slate-600 p-3 uppercase hover:opacity-90 rounded-lg text-white">Create Listing</button>
                </div>
            </form>
        </div>
    )
}

export default CreateListing;