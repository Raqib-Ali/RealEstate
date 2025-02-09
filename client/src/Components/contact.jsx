import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export const Contact = ({listing, change}) => {

    const [message, setMessage] = useState();
    const [user, setUser] = useState({});

    const handleChange = (e) => {
        setMessage(e.target.value)
    }

    useEffect(()=>{
        const getUser = async () => {
           try{
            const response = await fetch(`/api/user/${listing.userRef}`)

            const data = await response.json();

            if(data.success == false){
                console.log(user.message);
                return;
            }

            setUser(data);
           }catch(error){
             console.log(error.message);
           }
        }
        getUser();
    },[])

    return (

        <div className="flex flex-col gap-3">

            <p></p>
            <textarea onChange={(e) => { handleChange(e) }} className="p-2 rounded-lg outline" placeholder="Enter your message..." id=""></textarea>
            <Link to={`mailto:${user.email}?subject=Regarding your listing ${listing.name}&body=${message}`} className="bg-slate-700 p-3 text-white text-center rounded-lg uppercase hover:opacity-85">Send Message</Link>

        </div>

    )
}