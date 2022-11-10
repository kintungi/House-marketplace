import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../lib/firebase.config'
import {toast} from "react-toastify"
import googleIcon from "../assets/svg/googleIcon.svg"


function OAuth() {
    const navigate = useNavigate()
    const location = useLocation()


  return (
    <div className='socicalLogin'>
      <p>Sign {location.pathname === "/sign-up" ? "up" : "in"}</p>
    </div>
  )
}

export default OAuth
