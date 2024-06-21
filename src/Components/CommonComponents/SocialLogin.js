import React from 'react'
import "./commonStyle.css"
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";

const SocialLogin = () => {
  return (
    <div className='social_login_wrapper'>
        <div className='social_login_content'>
            <div className='social_media_outer FaFacebookF'>
            <FaFacebookF />
            </div>
            <div className='social_media_outer FaTwitter'>
            <FaTwitter />
            </div>
            <div className='social_media_outer FaGoogle'>
            <FaGoogle />
            </div>
         
        </div>
    </div>
  )
}

export default SocialLogin