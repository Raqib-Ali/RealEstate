import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateState } from "../redux/user/userSlice";

function Profile() {
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.user)
    const [formData, setForm] = useState();
    const [file, setFile] = useState(undefined);
    const ref = useRef();

    console.log(currentUser)

    const handleUpdate = (e) => {
        const data = {
            ...currentUser,
            [e.target.id]: e.target.value
        }
        setForm(data);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateState(formData));
    }

    useEffect(() => {
        setForm(currentUser);
    }, [])

    return (
        <div className="mx-auto max-w-lg p-2">
            <h1 className="text-center text-3xl font-bold m-4">Profile</h1>
            <form onClick={(e) => { handleSubmit(e) }} className="flex flex-col gap-4 mt-5">
                <input onChange={(e) => { setFile(e.target.files[0]) }} onClick={(e) => { e.stopPropagation() }} className="hidden" accept="image/*" ref={ref} type="file" />
                <img onClick={() => { ref.current.click() }} src={formData?.photo} className="h-24 w-24 mb-5 rounded-full border self-center cursor-pointer hover:scale-105 transition-all delay-200" alt="" />
                <input className="p-3 rounded-lg border" id="username" placeholder="Username" type="text" onChange={(e) => { handleUpdate(e) }} value={formData?.username} />
                <input className="p-3 rounded-lg border" id="email" placeholder="Email" type="email" onChange={(e) => { handleUpdate(e) }} value={formData?.email} />
                <input className="p-3 rounded-lg border" id="password" placeholder="Password" type="password" />
                <button className="p-3 rounded-lg bg-slate-600 text-white uppercase">Update</button>
            </form>
            <div className="flex justify-between mt-2">
                <span className="text-red-600">Delete Account</span>
                <span className="text-red-600">Sign out</span>
            </div>
        </div>

    )
}

export default Profile;