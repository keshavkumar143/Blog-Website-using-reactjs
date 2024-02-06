import React from 'react'
import { auth, provider } from '../FirebaseAuthentication'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
function Login({ setIsAuth }) {
    let navigate = useNavigate();
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((res) => {
            localStorage.setItem("isAuth", true)
            setIsAuth(true);
            navigate("/")
        })
    }
    return (
        <div className='loginPage'>
            <h1>Sign With Google</h1>
            <button className='google' onClick={signInWithGoogle}>Sign In with Google</button>
        </div>
    )
}

export default Login