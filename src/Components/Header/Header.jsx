import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import heart_logo from "../Images/vuexy-logo.svg"
import flag_img from "../Images/flag_img.svg"
import user_img from "../Images/userAvatar.svg"
import { IoIosNotificationsOutline } from "react-icons/io";

import "./Header.css"
import { useNavigate } from 'react-router';
const Header = () => {
const navigate=useNavigate()
  
const logoutHandler=()=>{
localStorage.clear("token")
navigate("/")
}
      return (
        <header className='navbar_outer'>
        <Navbar expand="lg" className="bg-body-tertiary cmn_width">
          <div className='header_outer container-fluid'>
   
          <div className='d-flex login_header gap-2 align-items-center justify-content-center'>
    <img src={heart_logo} className='heart_logo' alt='heart_logo'/> 
    <h3 className='cmn_heading_style'> Plan AI Detector</h3>

       
          </div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="">
                <div className='flag_outer'>
                <img src={flag_img} alt='flag_img' />
                </div>
                <div className='notification_outer'>
                <IoIosNotificationsOutline />
                <div className='notification_text'>4</div>
                </div>
                <img src={user_img} alt='user_img' />
                <button onClick={logoutHandler} className='cmn_btn  logout_btn'>Logout</button>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Navbar>
        </header>
      );
  
}

export default Header