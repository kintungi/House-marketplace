import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from "react-toastify"
import {ReactComponent as ArrowRightIcon} from "../assets/svg/keyboardArrowRightIcon.svg"
import {
    getAuth, 
    createUserWithEmailAndPassword, 
    updateProfile,
} from "firebase/auth"
import {
    setDoc,
    doc,
    serverTimestamp,
} from "firebase/firestore"
import { db } from '../lib/firebase.config'
import visibilityIcon from "../assets/svg/visibilityIcon.svg"
import OAuth from '../components/OAuth'

function SignUp() {
    const [showPassword, setShowPassword] = useState(false)

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    })

    const {name, email, password} = formData

    const navigate = useNavigate()

    const onChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            const auth = getAuth() //Initialising authentication service

            const userCredential = await createUserWithEmailAndPassword(auth, email, password)//This function returns a user credentials object

            const user = userCredential.user //You 

            console.log(auth.currentUser)

            //Updating the profile of the user.
            //You can always get the current user via auth.currentUser
            updateProfile(auth.currentUser, {
                displayName: name
            })

            /*Due to immutability principle of functional programing,
            Here we make a copy of formData and delete the password(already used in authentication and we
            don't want it displayed in firestore) 
            *then we add the timestamp to the data.
            */
            const formDataCopy = {
                ...formData
            }
            delete formDataCopy.password
            formDataCopy.timestamp = serverTimestamp()

            await setDoc(doc(db, "users", user.uid), formDataCopy)

            navigate("/")


        } catch (error) {
            toast.error("Something went wrong with registration")
        }
    }

  return (
    <>
      <div className="pageContainer">
        <header>
            <p className="pageHeader">
                Welcome Back!
            </p>
        </header>
        <form onSubmit={onSubmit}>
            <input onChange={onChange} value={name} type="text" className='nameInput'  placeholder={"Name"} name="name" id="name" />
            <input onChange={onChange} value={email} type="email" className='emailInput'  placeholder={"Email"} name="email" id="email" />

            <div className="passwordInputDiv">
                <input onChange={onChange} value={password} type={showPassword ? "text" : "password"} className="passwordInput" placeholder='Password' id="password"/>
                <img src={visibilityIcon} alt="" className='showPassword' onClick={() => setShowPassword(!showPassword)} />
            </div>

            <Link to="/forgot-password" className='forgotPasswordLink'>Forgot Password</Link>

            <div className="signUpBar">
                <p className="signUpText">
                    Sign Up
                </p>
                <button className="signUpButton">
                    <ArrowRightIcon fill="#fff" width="34px" height="34px" />
                </button>
            </div>
        </form>
        {/* Google OAuth */}
        <OAuth />

        <Link to="/sign-in" className='registerLink'>Sign In Instead</Link>
      </div>
    </>
  )
}

export default SignUp
