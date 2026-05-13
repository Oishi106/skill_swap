import React from 'react'
import { NavLink } from 'react-router'

const Mylink = ({to,children,className}) => {
  return (
    <NavLink
      to={to}
      className={({isActive}) =>
        isActive
          ? `${className || ""} bg-[#234C6A] text-white font-semibold`.trim()
          : `${className || ""} font-semibold`.trim()
      }
    >
      {children}
    </NavLink>
  )
}

export default Mylink