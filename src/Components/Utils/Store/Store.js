import { configureStore } from '@reduxjs/toolkit'
import signUp_slice from './AuthSlice/AuthSlice'
import login_slice  from './AuthSlice/LoginSlice'
import forgot_password_slice from './AuthSlice/ForgotPasswordSlice'
import verify_otp_slice from './AuthSlice/VerifyOtpSlice'
import clear_reset_password_slice  from './AuthSlice/ResetPasswordSlice'
import socialLogin_slice  from './AuthSlice/SocialFacebookLogin'
import AddPlanSlice from './PlanSlice/AddPlanSlice'
import getAllPlanActions  from './PlanSlice/GetAllPlanSlice'
import DeletePlanSlice from './PlanSlice/DeletePlanSlice'


const store = configureStore({
  reducer: {
    SIGNUP_SLICE : signUp_slice,
    LOGIN_SLICE:login_slice,
    FORGOT_PASSWORD_SLICE:forgot_password_slice,
    VERIFY_OTP_SLICE:verify_otp_slice,
    RESET_PASSWORD:clear_reset_password_slice,
    SOCIAL_LOGIN:socialLogin_slice,
    ADD_PLAN_SLICE:AddPlanSlice,
    GET_ALL_PLAN_SLLICE:getAllPlanActions,
    DELETE_PLAN_SLICE:DeletePlanSlice,
    
  },
})

export default store