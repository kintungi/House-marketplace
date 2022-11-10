import React, {useState, useEffect} from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

function useAuthStatus() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [checkingStatus, setCheckingStatus] = useState(true)

    useEffect(() => {
        const auth = getAuth()
        onAuthStateChanged(auth, user => {
            if(user) {
                setLoggedIn(true)
            }

            setCheckingStatus(false)
        })
    })

  return {loggedIn, checkingStatus}
}

export default useAuthStatus

// Protected routes in v6
// https://stackoverflow.com/questions/65505665/protected-route-with-firebase

// Fix memory leak warning
// https://stackoverflow.com/questions/59780268/cleanup-memory-leaks-on-an-unmounted-component-in-react-hooks
