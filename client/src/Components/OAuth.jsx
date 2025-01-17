import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';

export function OAuth() {

    const dispatch = useDispatch();

    async function handleGoogle() {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app)

            const result = await signInWithPopup(auth, provider);

            console.log(result.user.displayName);

            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: result.user.displayName.split(" ").join("").toLowerCase() + Math.random().toString(32).slice(-4), email: result.user.email, photo: result.user.photoURL })
            })

            const data = await res.json();
            dispatch(signInSuccess(data));

        } catch (error) {
            console.log('cannot signin with google', error);
        }
    }

    return <button onClick={handleGoogle} type={"button"} className="p-3 rounded-lg text-white bg-red-600 uppercase hover:opacity-85">Continue with google</button>
}