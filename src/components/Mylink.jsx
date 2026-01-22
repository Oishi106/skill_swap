import React from 'react'
import { NavLink } from 'react-router'

const Mylink = ({to,children,className}) => {
  return (
    <NavLink to={to} className={({isActive})=>isActive?"bg-[#234C6A] text-white p-5 rounded-xl font-semibold":`${className} font-semibold`} >{children}</NavLink>
  )
}

export default Mylink