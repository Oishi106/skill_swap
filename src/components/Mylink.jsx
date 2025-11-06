import React from 'react'
import { NavLink } from 'react-router'

const Mylink = ({to,children,className}) => {
  return (
    <NavLink to={to} className={({isActive})=>isActive?"bg-sky-500 p-2 rounded-xl":`${className} font-semibold`} >{children}</NavLink>
  )
}

export default Mylink