import React, { use, useEffect, useState } from 'react'
import { AuthContext } from './Authcontext'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../Firebase/firebase.config'

const AuthProvider = ({children}) => {
    const [info,setInfo]=useState(null)
    const [loading,setLoading]=useState(true)
    const authinfo={
        info,
        setInfo,
        loading,
        setLoading
    }
  useEffect(()=>{
    const unsubscribe=  onAuthStateChanged(auth, (currentuser) => {
      setInfo(currentuser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  return (
    <AuthContext value={authinfo}>
        {children}
    </AuthContext>
  )
}

export default AuthProvider