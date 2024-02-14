import React from 'react'
import "./HeaderOptions.css"
import { Avatar } from '@mui/material'
import { NavLink } from "react-router-dom";
function HeaderOptions({avatar,Icon,title,onClick,shouldNavigate}) {
  const content=(
    <>
       
        {Icon && <Icon className="headerOption_icon"/>}
        {avatar && <Avatar className="headerOption_avatar" src={avatar}/>}
        <h6 className='headerOption_title'>{title}</h6>
        <div className='nav_border'></div>
   
    </>
  )
  return (

    <div className='HeaderOptions' onClick={onClick} >
      {
        shouldNavigate ? (
          <NavLink to={"main"} className="nav_link">
            {content}
          </NavLink>
        ):(
         <> {content}</>
        )
      }
    </div>
  )
}

export default HeaderOptions