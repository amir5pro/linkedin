import React from 'react'
import "./Footer.css"
import { BiCopyright } from "react-icons/bi";
import { BsLinkedin } from "react-icons/bs";

function Footer() {
  return (
    <div>
          <footer className="footer">
        <div className="f_logo">
          <h1>Linked</h1>
            <BsLinkedin size={15}  />
        </div>
        <div className="copyright">
          <BiCopyright />
          <p > 2023</p>
        </div>
        <div className='div_info'>
        <p className="f_info">About</p>
        <p className="f_info">Accessability</p>
        <p className="f_info">User agreement</p>
        </div>
        <div className='div_info'>
        <p className="f_info">privacy policy</p>
        <p className="f_info">Cookie policy</p>
        <p className="f_info">Copyright policy</p>
        </div>
      </footer>
    </div>
  )
}

export default Footer