import React, {useEffect, useState} from 'react'
import {getAuth, updateProfile} from "firebase/auth"
import {updateDoc, doc, collection, getDocs, query, where, orderBy, deleteDoc} from "firebase/firestore"
import { db } from '../lib/firebase.config'
import { useNavigate, Link } from 'react-router-dom'
import {toast} from "react-toastify"
import arrowRight from "../assets/svg/keyboardArrowRightIcon.svg"
import homeIcon from "../assets/svg/homeIcon.svg"
// import { Link } from 'react-router-dom'

function Profile() {

  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState([])
  const auth = getAuth()

  const [changeDetails, setChangeDetails] = useState(false)

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })

  const {name, email} = formData

 const navigate = useNavigate()

  useEffect(() => {
    const fetchUserListing = async () => {
      const listingRef = collection(db, "listing")

      const q = query(listingRef, where("userRef", "==", auth.currentUser.uid), orderBy("timestamp", "desc"))

      const querySnap = await getDocs(q)
      console.log(querySnap)

      let listing = []

      querySnap.forEach((doc) => {
        return listing.push({
          id: doc.id,
          data: doc.data()
        })
      })
      console.log(listing)
      setListings(listing)
      setLoading(false)
    }

    console.log(listings)

    fetchUserListing()
  }, [auth.currentUser.uid])

  const onLogout = () => {
    auth.signOut()
    navigate("/")
  }

  const onSubmit = async () => {
    try {
      if(auth.currentUser.displayName !== name) {
        //Update display name in firebase
        await updateProfile(auth.currentUser, {
          displayName: name
        })

        //update in firestore
        const userRef = doc(db, "users", auth.currentUser.uid)
        await updateDoc(userRef, {
          name
        })
      }
    } catch (error) {
      toast.error("Could not update profile details")
    }

    // try {
    //   if(auth.currentUser.email !== email) {
    //     auth.currentUser.updateEmail(email)
    //   }
    // } catch (error) {
    //   toast.error("failed to update email")
    // }
  
  }


  const onChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }

  return <div className='profile'>
    <header className='profileHeader'>
      <p className="pageHeader">My Profile</p>
      <button onClick={onLogout} type={"button"} className="logOut">Logout</button>
    </header>
    <main>
      <div className="profileDetailsHeader">
        <p className="profileDetailsText">Personal Details</p>
        <p className="changePersonalDetails" onClick={() => { 
          changeDetails && onSubmit()
          setChangeDetails(prev => !prev)
        }}>
          {changeDetails ? "done" : "change"}
        </p>
      </div>

      <div className="profileCard">
        <form>
          <input 
          type="text" 
          name="name" 
          id="name" 
          className={!changeDetails ? "profileName" : "profileNameActive"}
          disabled={!changeDetails}
          value={name}
          onChange={onChange}
          />

          <input 
          type="email" 
          name="email" 
          id="email" 
          className={!changeDetails ? "profileEmail" : "profileEmailActive"}
          disabled={!changeDetails}//this disables the typing on input
          value={email}
          onChange={onChange}
          />
        </form>
      </div>

      <Link to="/create-listing" className='createListing'>
        <img src={homeIcon} alt="home" />
        <p>Sell or rent your home</p>
        <img src={arrowRight} alt="arrow right" />
      </Link>
    </main>
  </div>
}

export default Profile
