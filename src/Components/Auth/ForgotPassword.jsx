import React, { useEffect } from 'react'
import CommonRectangleImg from '../CommonComponents/CommonRectangleImg'
import SquareImg from '../CommonComponents/SquareImg'
import "./style.css"
import { useFormik } from 'formik'
import { forgotPasswordSchema } from '../Utils/Validation/Validation'
import heart_logo from "../Images/vuexy-logo.svg"
import Button from '../CommonComponents/Button'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPasswordAction } from '../Utils/Store/AuthSlice/ForgotPasswordSlice'
import { toast } from 'react-toastify'
 import {clear_forgotpassword_slice} from "../Utils/Store/AuthSlice/ForgotPasswordSlice"
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
const ForgotPassword = () => {

const dispatch=useDispatch()

const forgotPasswordData=useSelector(store=>{return store.FORGOT_PASSWORD_SLICE})


const formik=useFormik({
  initialValues:{
    email:""
  },
  validationSchema: forgotPasswordSchema,
  onSubmit: (values) => {

    dispatch(forgotPasswordAction(values.email))
    
  },
})

const navigate =useNavigate()

useEffect(()=>{
if(forgotPasswordData.isError){
  toast.error(forgotPasswordData.error.message)
  dispatch(clear_forgotpassword_slice)
}
else if(forgotPasswordData.isSuccess){

  toast.success(forgotPasswordData.data.message)
  navigate("/verify-otp")
  dispatch(clear_forgotpassword_slice)
}
},[forgotPasswordData])
  return (
    <section className='forgotpassword_container login_container vh-100'>
      <div className='position-relative'>
      <CommonRectangleImg/>
      
    <div className='login_wrapper'>
        <div className='d-flex login_header gap-2 align-items-center justify-content-center'>
    <img src={heart_logo} className='heart_logo' alt='heart_logo'/> 
    <h3 className='cmn_heading_style'> Plan AI Detector</h3>

        </div>

    <div className='login_content'>
   <h4 className='cmn_heading_style mt-4'>Forgot Password </h4>
   

   <form onSubmit={formik.handleSubmit}>
   <div className='form-group mb-3'>
    <label>Email</label>
  <input name='email' onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} type='email' className='form-control'/>
   {formik.touched.email && formik.errors.email ? <p className="error">{formik.errors.email}</p>:""}
   <h6 className="span_text"><Link to={"/"}>Login instead?</Link></h6>
   </div>

   <Button isLoading={forgotPasswordData?.isLoading} type={'submit'} className={'cmn_btn signin_btn'} btntext={"Forgot Password"}/>

   </form>

 
    </div>
    </div>
  <SquareImg/>

      </div>
    </section>
  )
}

export default ForgotPassword