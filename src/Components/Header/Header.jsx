import React, { useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ai_logo from "../Images/logo.png"
import flag_img from "../Images/flag_img.svg"
import user_img from "../Images/userAvatar.svg"
import { IoIosNotificationsOutline } from "react-icons/io";
import Dropdown from 'react-bootstrap/Dropdown';

import "./Header.css"
import { useNavigate } from 'react-router';
import { MdLogout } from 'react-icons/md';
import ChangePassword from '../Modal/Changepassword';
import { RiLockPasswordLine } from 'react-icons/ri';
const Header = () => {
const navigate=useNavigate()
const [showChangePasswordModal,setShowChangePasswordModal]=useState(false)

const logoutHandler=()=>{
localStorage.removeItem("token")
navigate("/")
}

      return (
        <header className='navbar_outer'>
        <Navbar expand="lg" className="bg-body-tertiary ">
          <div className='header_outer container-fluid'>
   
          <div className='header_outer_wrapper d-flex login_header gap-2 align-items-center justify-content-center' onClick={()=>{navigate("/dashboard")}}>
    <img src={ai_logo} className='quanti_logo' alt='ai_logo'/> 

       
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


    <Dropdown className='profile_dropdown_wrapper'>
      <Dropdown.Toggle id="dropdown-basic" className='profile_dropdown_outer'>
      <img src={user_img} alt='user_img' />

      </Dropdown.Toggle>

      <Dropdown.Menu>
        <ul className=' profile_item_wrapper'>
          <li onClick={logoutHandler} className='cmn_small_heading'>
          <MdLogout /> Logout
          </li>
          <li className='cmn_small_heading' onClick={()=>{setShowChangePasswordModal(true)}}>
          <RiLockPasswordLine />  Change Password
          </li>
  
        </ul>
    
      </Dropdown.Menu>
    </Dropdown>
  
    </Nav>
    </Navbar.Collapse>
          </div>
        </Navbar>
        {showChangePasswordModal && <ChangePassword show={showChangePasswordModal} setShow={setShowChangePasswordModal}/>}
        </header>
      );
  
}

export default Header