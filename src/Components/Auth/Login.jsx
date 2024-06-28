import React, { useEffect } from 'react'
import "./style.css"
import heart_logo from "../Images/vuexy-logo.svg"
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { loginSchema } from '../Utils/Validation/Validation'
import SocialLogin from '../CommonComponents/SocialLogin'
import CommonRectangleImg from '../CommonComponents/CommonRectangleImg'
import SquareImg from '../CommonComponents/SquareImg'
import Button from '../CommonComponents/Button'
import { UseLogin } from '../Utils/customHooks/AuthHooks/AuthHooks'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { clear_login_slice } from '../Utils/Store/AuthSlice/LoginSlice'
import TwitterLogin from "../CommonComponents/TwitterLogin"


const Login = () => {

const loginaction=UseLogin()

const loginData=useSelector((state)=>{return state.LOGIN_SLICE})

const navigate=useNavigate()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
     
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      loginaction(values.email,values.password)

      
    },
  });

  const dispatch=useDispatch()
  useEffect(()=>{
    if(loginData.isError===true){
      toast.error(loginData.error.message)
      dispatch(clear_login_slice())
    }
    else if(loginData.isSuccess===true){
      toast.success(loginData.data.message)
      localStorage.setItem("token",loginData?.data?.userObj?.token  )
      localStorage.setItem("username",loginData?.data?.userObj?.username)
      localStorage.setItem("email",loginData?.data?.userObj?.email)
      
      dispatch(clear_login_slice())
      navigate("/dashboard")
    }
  },[loginData])

  return (
    <section className='login_container'>
      <div className='position-relative'>
      <CommonRectangleImg/>
      
    <div className='login_wrapper'>
        <div className='d-flex login_header gap-2 align-items-center justify-content-center'>
    <img src={heart_logo} className='heart_logo' alt='heart_logo'/> 
    <h3 className='cmn_heading_style'> Plan AI Detector</h3>

        </div>

    <div className='login_content'>
   <h4 className='cmn_heading_style mt-4'>Welcome to Plan AI Detector! </h4>
   <h6 className='cmn_small_heading'>Please sign in to your account and start the adventure</h6>

   <form onSubmit={formik.handleSubmit}>
   <div className='form-group'>
    <label>Email or Username</label>
  <input name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type='email' className='form-control'/>
   {formik.touched.email && formik.errors.email ? <p className="error">{formik.errors.email}</p>:""}
   </div>

   <div className='form-group'>
    <div className='password_outer d-flex'>
    <label>Password</label>
     <h6 className='span_text'><Link to={"forgot-password"}>Forgot Password?</Link></h6>
    </div>
  <input type='password' name='password' className='form-control' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
  {formik.touched.password && formik.errors.password ? <p className="error">{formik.errors.password}</p>:""}
   </div>

   <div className='d-flex gap-2 align-items-center mt-3 mb-3'>
    <input type='checkbox'/>
    <h6 className='cmn_small_heading mb-0'>Remember Me</h6>
   </div>
   
   <Button isLoading={loginData?.loading}  type={'submit'} className={'cmn_btn signin_btn'} btntext={"Sign in"}/>

   
   </form>

   <h3 className='cmn_small_heading text-center mt-3'>New on our platform? <span className='span_text'><Link to="/signup">Create an account</Link></span></h3>
   <h5 className='or_text'>Or</h5>


{/* social login  */}
{/* <TwitterLogin/> */}
<SocialLogin/>
    </div>
    </div>
  <SquareImg/>

      </div>
    </section>
  )
}

export default Login