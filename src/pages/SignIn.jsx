import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
    getAuth,
    signInWithEmailAndPassword
} from "firebase/auth"
import {ReactComponent as ArrowRightIcon} from "../assets/svg/keyboardArrowRightIcon.svg"
import visibilityIcon from "../assets/svg/visibilityIcon.svg"
import OAuth from '../components/OAuth'

function SignIn() {
    const [showPassword, setShowPassword] = useState(false)



    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const {email, password} = formData

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
            const auth = getAuth()

            const userCredential = await signInWithEmailAndPassword(auth, email, password)
    
            if(userCredential.user) {
                navigate("/")
            }
        } catch(error) {
            toast.error("Bad User Credentials")
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
            <input onChange={onChange} value={email} type="email" className='emailInput'  placeholder={"Email"} name="email" id="email" />

            <div className="passwordInputDiv">
                <input onChange={onChange} value={password} type={showPassword ? "text" : "password"} className="passwordInput" placeholder='Password' id="password"/>
                <img src={visibilityIcon} alt="" className='showPassword' onClick={() => setShowPassword(!showPassword)} />
            </div>

            <Link to="/forgot-password" className='forgotPasswordLink'>Forgot Password</Link>

            <div className="signInBar">
                <p className="signInText">
                    Sign In
                </p>
                <button className="signInButton">
                    <ArrowRightIcon fill="#fff" width="34px" height="34px" />
                </button>
            </div>
        </form>
        {/* Google OAuth */}
        <OAuth />

        <Link to="/sign-up" className='registerLink'>Sign Up Instead</Link>
      </div>
    </>
  )
}

export default SignIn

