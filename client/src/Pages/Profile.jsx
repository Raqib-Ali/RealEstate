import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStart, updateSuccess, updateFailure, deleteStart, deleteFailure, deletesuccess, signOutStart, signOutFailure, signOutSuccess } from "../redux/user/userSlice";
import { Link, Links } from "react-router-dom";
import { supabase } from '../suprabase';

function Profile() {
    const dispatch = useDispatch();
    const { currentUser, error, loading } = useSelector(state => state.user);
    const [imgError, setImgError] = useState(null);
    const [formData, setForm] = useState();
    const [file, setFile] = useState();
    const ref = useRef();
    const [showListingError, setListingError] = useState(null);
    const [listings, setListings] = useState([]);

    const handleChange = (e) => {
        setForm({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleImageChange = (e) => {
        setFile(e.target.files[0])
    }

    const uploadImage = async () => {
        if(!file) return setImgError('You must choose an image.');
        try {
            setImgError(null);
            const response = await supabase
                .storage
                .from('Images_assets')
                .upload(`profile_images/${file.name + new Date().toUTCString()}`, file, {
                    cacheControl: '3600',
                    upsert: false
                })
            console.log('response', response);
            if (response.error) {
                setImgError(response.error.message);
            } else {
                const { data } = supabase
                    .storage
                    .from('Images_assets')
                    .getPublicUrl(response.data.path)
                //setImages([...images, data.publicUrl]);
                setForm({ ...formData, photo: data.publicUrl });

            }
        } catch (error) {
            setImgError(error.message);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(updateStart());
        const result = await fetch(`/api/user/update/${currentUser._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        const data = await result.json()

        if (data.success == false) {
            dispatch(updateFailure(data.message));
            return;
        }

        dispatch(updateSuccess(data));
        console.log('updated', data)
    }

    const handleDeleteUser = async () => {
        try {
            dispatch(deleteStart());
            const response = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: 'DELETE',
            })
            const data = await response.json();
            if (data.success == false) {
                dispatch(deleteFailure(data.message));
                return;
            }
            console.log(data)
            dispatch(deletesuccess());
        } catch (error) {
            dispatch(deleteFailure(error.message))
        }
    }

    const handleSignOut = async () => {
        try {
            dispatch(signOutStart())
            const response = await fetch('/api/user/signout')
            const data = await response.json();
            console.log(data)
            if (data.success == false) {
                dispatch(signOutFailure(data.message));
                return;
            }
            dispatch(signOutSuccess())
        } catch (error) {
            dispatch(signOutFailure(error.message))
        }
    }

    const showListing = async () => {
        try{
            setListingError(null);
            const res = await fetch(`/api/user/listings/${currentUser._id}`);
            const data = await res.json();

            if(data.success == false){
                setListingError(data.message);
                return;
            }

            setListings(data);
        }catch(error){
            setListingError(error.message)
        }
    }

    const handleDeleteListing = async (event, id) => {
        event.stopPropagation();
       try{
          const res = await fetch(`/api/listing/delete/${id}`, {
            method: 'DELETE'
          })
          const data = await res.json()

          if(data.success == false){
           console.log(data.message)
           return;
        }

         console.log(data);
         showListing();
       }catch(error){
         console.log(error.message);
       }
    }

    useEffect(()=>{
       setForm({
        ...formData,
        photo: currentUser?.photo
       })
    },[])

   
    return (
        <div className="mx-auto max-w-lg p-2">
            <h1 className="text-center text-3xl font-bold m-4">Profile</h1>
            <form onSubmit={(e) => { handleSubmit(e) }} className="flex flex-col gap-3 mt-5">
                <input onChange={(e) => {
                    handleImageChange(e);

                }}
                    onClick={(e) => { e.stopPropagation() }}
                    id="photo"
                    className="hidden"
                    accept="image/*"
                    ref={ref}
                    type="file" />
                <img onClick={() => { ref.current.click() }} src={formData ? formData.photo : (currentUser?.photo)} className="h-28 w-28 rounded-full border self-center cursor-pointer hover:scale-105 transition-all delay-200" alt="" />
                <p className="text-red-600">{imgError}</p>
                <button type='button' className="bg-slate-300 p-2 rounded-lg uppercase text-slate-700 hover:shadow-md" onClick={uploadImage}>upload image</button>
                <input className="p-3 rounded-lg border" id="username" placeholder="Username" type="text" onChange={(e) => { handleChange(e) }} defaultValue={currentUser?.username} />
                <input className="p-3 rounded-lg border" id="email" placeholder="Email" type="email" onChange={(e) => { handleChange(e) }} defaultValue={currentUser?.email} />
                <input className="p-3 rounded-lg border" id="password" onChange={(e) => { handleChange(e) }} placeholder="Password" type="password" />
                <button disabled={loading} className="p-3 rounded-lg bg-slate-600 text-white uppercase hover:opacity-90 disabled:opacity-90 ">
                    {
                        (loading) ? "Loading ..." : "Update"
                    }
                </button>
                <Link to={'/createListing'} className="uppercase bg-green-600 p-3 rounded-lg text-center text-white">Create listing</Link>
            </form>
            <div className="flex justify-between mt-2">
                <span onClick={handleDeleteUser} className="text-red-600">Delete Account</span>
                <span onClick={handleSignOut} className="text-red-600 cursor-pointer">Sign out</span>
            </div>
            <p className="text-red-600 mt-2">{error}</p>
            <p onClick={showListing} className='text-green-600 text-center mt-4 font-semibold cursor-pointer'>Show Listing</p>
             
            {
                
                (listings.length > 0) && <div>
                    <h1 className="text-2xl font-semibold text-center m-10">Your Listings</h1>

                    <div className="flex flex-col gap-2">
                        {
                            listings.map(listing => <div key={listing._id} className="flex justify-between items-center border p-2" >
                                <Link to={`/listings/${listing._id}`}><img className="h-10 object-contain" src={listing.imgUrls[0]} alt="" /></Link>
                                <Link to={`/listings/${listing._id}`}><p className="hover:underline">{listing.name}</p></Link>
                                <div className="flex flex-col">
                                    <button onClick={(e)=>{handleDeleteListing(e, listing._id)}} className="uppercase text-red-600">Delete</button>
                                   <Link to={`/update/${listing._id}`}>
                                      <button className="uppercase text-green-600">Edit</button>
                                   </Link>
                                </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            }
        </div>

    )
}

export default Profile;