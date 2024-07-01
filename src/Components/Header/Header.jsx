import React, { useEffect } from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import heart_logo from "../Images/vuexy-logo.svg"
import flag_img from "../Images/flag_img.svg"
import user_img from "../Images/userAvatar.svg"
import { IoIosNotificationsOutline } from "react-icons/io";
import Dropdown from 'react-bootstrap/Dropdown';

import "./Header.css"
import { useNavigate } from 'react-router';
import { MdLogout } from 'react-icons/md';
const Header = () => {
const navigate=useNavigate()
  
const logoutHandler=()=>{
localStorage.removeItem("token")
navigate("/")
}

      return (
        <header className='navbar_outer'>
        <Navbar expand="lg" className="bg-body-tertiary ">
          <div className='header_outer container-fluid'>
   
          <div className='header_outer_wrapper d-flex login_header gap-2 align-items-center justify-content-center' onClick={()=>{navigate("/dashboard")}}>
    <img src={heart_logo} className='heart_logo' alt='heart_logo'/> 
    <h3 className='cmn_heading_style'> Plan AI Detector</h3>

       
          </div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="">
                {/* <div className='flag_outer'>
                <img src={flag_img} alt='flag_img' />
                </div> */}
                {/* <div className='notification_outer'>
                <IoIosNotificationsOutline />
                <div className='notification_text'>4</div>
                </div> */}
               {/* dropdown */}


    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic" className='profile_dropdown_outer'>
      <img src={user_img} alt='user_img' />

      </Dropdown.Toggle>

      <Dropdown.Menu>
        <div className='px-3  profile_item_wrapper'>
        <h3 onClick={logoutHandler} className='cmn_small_heading logout_text'><MdLogout /> Logout</h3>
        </div>
    
      </Dropdown.Menu>
    </Dropdown>
  
    </Nav>
    </Navbar.Collapse>
          </div>
        </Navbar>
        </header>
      );
  
}

export default Header