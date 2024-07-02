import React, { useEffect, useState } from 'react'
import "./commonStyle.css"
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FacebookLoginButton, GoogleLoginButton, TwitterLoginButton } from 'react-social-login-buttons';
import {LoginSocialFacebook, LoginSocialGoogle, LoginSocialTwitter} from "reactjs-social-login"
import { useDispatch, useSelector } from 'react-redux';
import { clear_sociallogin_slice, socialLoginActions } from '../Utils/Store/AuthSlice/SocialFacebookLogin';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const SocialLogin = () => {
  const[facebookLoginData,setFacebookLoginData]=useState()
  const[googleLoginData,setGooglLoginData]=useState()
  const[twitterLoginData,setTwitterLoginData]=useState()
  
  


  const navigate=useNavigate()
const dispatch=useDispatch()

const socialLoginStoreData=useSelector((store)=>{return(store.SOCIAL_LOGIN)})


useEffect(()=>{
if(socialLoginStoreData.isSuccess===true){
  toast.success(socialLoginStoreData.data.message
  )
  localStorage.setItem("token",socialLoginStoreData.data.token)
  navigate("/dashboard")
  dispatch(clear_sociallogin_slice())

}
 else if (socialLoginStoreData.isError ){
   toast.success(socialLoginStoreData.error)
   dispatch(clear_sociallogin_slice())
 }
},[socialLoginStoreData])

// google login

const handleGoogleLoginSuccess = (response) => {
  setGooglLoginData(response)
  if(response){
    dispatch(socialLoginActions({providerName:response.provider,providerId:response.data.sub
      ,email:response.data.email}))

  }
 
};

const handleGoogleLoginFailure = (error) => {
toast.error(error)
 
};


  return (
    <div className='social_login_wrapper'>
        <div className='social_login_content'>
            
              <LoginSocialFacebook  
              appId={process.env.REACT_APP_FACEBOOK_APP_ID} 
              onResolve={((response)=>{
              setFacebookLoginData(response)
              if(response){
                dispatch(socialLoginActions({providerName:response.provider,providerId:response.data.userID,email:response.data.email}))
              }
            })}
              onReject={((error)=>{console.log(error,"error while login")})}
              scope="email"
           
              >
              <FacebookLoginButton className='facebook_login_button FaFacebookF social_media_outer' 
              style={{ margin:"0px"}} 
              text={()=>()=>null}
              icon={() => 
              <FaFacebookF size={20} />} 
              preventActiveStyles={true}>                       
              </FacebookLoginButton>

              </LoginSocialFacebook>
           
            {/* twitter login */}
            {/* <div className=''>
              <LoginSocialTwitter 
              

              client_id={process.env.REACT_APP_TWITTER_APP_ID}
              client_secret={process.env.REACT_APP_TWITTER_SECRET_KEY}
              onResolve={((response)=>{
                console.log(response,"twiiter response")
                setTwitterLoginData(response)
              })}
                onReject={((error)=>{console.log(error,"error while login with twitter")})}
                scope="email"
                state="756f9825-392c-4c71-b33a-b616a4333b5"
                redirect_uri={process.env.REACT_APP_VITE_APP_OAUTH2_REDIRECT_URL} 
              >

              <TwitterLoginButton className=' FaTwitter social_media_outer' 
              style={{ margin:"0px"}} 
              text={()=>()=>null}
              icon={() => 
              <FaTwitter size={20} />} 
              preventActiveStyles={true}
              >                       
              </TwitterLoginButton>
              </LoginSocialTwitter>
           
            </div> */}

            {/* google login  */}
        
          
            <LoginSocialGoogle 
            client_id={process.env.REACT_APP_GOOGLE_APP_ID}
            onResolve={handleGoogleLoginSuccess}
            onReject={handleGoogleLoginFailure}
             scope="email"
      >

            <GoogleLoginButton className="FaGoogle social_media_outer"
            text={null}
            style={{margin:"0px"}}
            icon={() => 
            <FaGoogle size={20} />} 
              preventActiveStyles={true}/>
            </LoginSocialGoogle>
           
       

         
        </div>
    </div>
  )
}

export default SocialLogin