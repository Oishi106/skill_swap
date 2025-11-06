import React, { useContext } from 'react'
import { AuthContext } from '../Context/Authcontext'
import { Navigate, useLocation } from 'react-router'
import { ClimbingBoxLoader } from 'react-spinners'

const Privateroute = ({ children }) => {
  const { info,loading } = useContext(AuthContext)
  const location=useLocation()
  if (loading) {    
    return <div className='h-[97vh] flex items-center justify-center'>
        <ClimbingBoxLoader />
    </div>
  }
  if (!info) {
    return <Navigate to="/signin" state={location.pathname} />
  }
  return children
}

export default Privateroute