import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { OAuth } from "../Components/OAuth";

function SignUp() {

  const [formData, setData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    setData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    setError(null);

    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json()

    if (data.success == false) {
      setError(data.message);
      setLoading(false);
      return;
    } else {
      alert(data);
    }
    setLoading(false);
    navigate("/signIn");

  }

  return <>
    <div className="mx-auto max-w-lg p-2">
      <h1 className="my-7 text-center text-3xl font-semibold">Sign Up</h1>
      <form onSubmit={(e) => { handleSubmit(e) }} className="flex flex-col gap-4">
        <input required type="text" onChange={(e) => { handleInput(e) }} className="p-3 rounded-lg" placeholder="username" id="username" />
        <input required type="email" onChange={(e) => { handleInput(e) }} className="p-3 rounded-lg" placeholder="email" id="email" />
        <input required type="password" onChange={(e) => { handleInput(e) }} className="p-3 rounded-lg" placeholder="password" id="password" />
        <button disabled={loading} className="bg-slate-600 text-white rounded-md p-3 hover:opacity-90 disabled:opacity-70">
          {loading ? "Loading..." : "Submit"}
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-2 mt-3">
        <p>Having an account?</p>
        <Link to={"/signin"} className="text-blue-700">
          SignIn
        </Link>
      </div>
      <p className="text-red-600 mt-3">{error}</p>
    </div>
  </>
}

export default SignUp;