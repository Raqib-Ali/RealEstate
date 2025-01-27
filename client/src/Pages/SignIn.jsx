import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate,  } from "react-router-dom";
import { signInFailure, signInStart, signInSuccess } from "../redux/user/userSlice";
import { OAuth } from "../Components/OAuth";

function SignIn() {
  const [formData, setSubmit] = useState({});
  const navigate = useNavigate();
  const  {error, loading}  = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSubmit({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    console.log(formData)
    const response = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    const data = await response.json();

    if(data.success == false){
      // setError(data.message)
      // setLoading(false);
      dispatch(signInFailure(data.message))
      return;
    } 
    // setLoading(false);
    dispatch(signInSuccess(data))
    navigate('/')
  }

  return <>
    <div className="mx-auto max-w-lg p-2">
      <h1 className="text-3xl font-semibold text-center my-7">SignIn</h1>
      <form className="flex flex-col gap-4 " onSubmit={(e)=>{handleSubmit(e)}}>
        <input required className="p-3 rounded-lg" type="email" placeholder="email" id="email" onChange={(e) => {handleChange(e)}} />
        <input required className="p-3 rounded-lg" type="password" placeholder="password" id="password" onChange={(e) => {handleChange(e)}} />
        <button disabled={loading} className="bg-slate-600 p-3 rounded-lg text-white">
          {loading?"Loading...":"Login"}
        </button>
        <OAuth/>
      </form>
      <div className="mt-2">
        <p>Don't have an account?  <Link className="text-blue-600" to={'/signup'}>SignUp</Link></p>
        <p className="text-red-600 mt-2">{error}</p>
      </div>
    </div>
  </>
}


export default SignIn;