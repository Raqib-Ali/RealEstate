import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStart, updateSuccess, updateFailure, deleteStart, deleteFailure, deletesuccess, signOutStart, signOutFailure, signOutSuccess } from "../redux/user/userSlice";
import { Link } from "react-router-dom";
import { supabase } from '../suprabase';

function Profile() {
    const dispatch = useDispatch();
    const { currentUser, error, loading } = useSelector(state => state.user);
    const [imgError, setImgError] = useState(null);
    const [formData, setForm] = useState();
    const [file, setFile] = useState();
    const ref = useRef();

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
        console.log(formData);

        const data = await result.json()

        if (data.success == false) {
            dispatch(updateFailure(data.message));
            return;
        }

        dispatch(updateSuccess(data));
        console.log(data)
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


    return (
        <div className="mx-auto max-w-lg p-2">
            <h1 className="text-center text-3xl font-bold m-4">Profile</h1>
            <form onSubmit={(e) => { handleSubmit(e) }} className="flex flex-col gap-4 mt-5">
                <input onChange={(e) => {
                    handleImageChange(e);

                }}
                    onClick={(e) => { e.stopPropagation() }}
                    id="photo"
                    className="hidden"
                    accept="image/*"
                    ref={ref}
                    type="file" />
                <img onClick={() => { ref.current.click() }} src={formData ? formData.photo : (currentUser?.photo)} className="h-24 w-24 mb-3 rounded-full border self-center cursor-pointer hover:scale-105 transition-all delay-200" alt="" />
                <p className="text-red-600">{imgError}</p>
                <button className="bg-slate-400 p-2 rounded-lg uppercase text-white" type="button" onClick={uploadImage}>upload image</button>
                <input className="p-3 rounded-lg border" id="username" placeholder="Username" type="text" onChange={(e) => { handleChange(e) }} defaultValue={currentUser?.username} />
                <input className="p-3 rounded-lg border" id="email" placeholder="Email" type="email" onChange={(e) => { handleChange(e) }} defaultValue={currentUser?.email} />
                <input className="p-3 rounded-lg border" id="password" onChange={(e) => { handleChange(e) }} placeholder="Password" type="password" />
                <button disabled={loading} className="p-3 rounded-lg bg-slate-600 text-white uppercase">
                    {
                        (loading) ? "Loading..." : "Update"
                    }
                </button>
                <Link to={'/createListing'} className="uppercase bg-green-600 p-3 rounded-lg text-center text-white">Create listing</Link>
            </form>
            <div className="flex justify-between mt-2">
                <span onClick={handleDeleteUser} className="text-red-600">Delete Account</span>
                <span onClick={handleSignOut} className="text-red-600 cursor-pointer">Sign out</span>
            </div>
            <p className="text-red-600 mt-2">{error}</p>
        </div>

    )
}

export default Profile;