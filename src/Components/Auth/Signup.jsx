import React from "react";
import "./style.css";
import logo from "../Images/signup_logo.svg";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { signupSchema } from "../Utils/Validation/Validation";
import SocialLogin from "../CommonComponents/SocialLogin";
import CommonRectangleImg from "../CommonComponents/CommonRectangleImg";
import SquareImg from "../CommonComponents/SquareImg";
import Button from "../CommonComponents/Button";

const Signup = () => {
  const formik = useFormik({
    initialValues: {
     userName: "",
      email: "",
      password: "",
     
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      console.log(values,"values");
      
    },
  });

  return (
    <section className="login_container">
      <div className="position-relative">
        <CommonRectangleImg/>
      <div className="login_wrapper">
        <div className="d-flex login_header gap-2 align-items-center justify-content-center">
          <img src={logo} className="heart_logo" alt="heart_logo"/>
          <h3 className="cmn_heading_style"> Plan AI Detector</h3>
        </div>

        <div className="login_content">
          <h4 className="cmn_heading_style mt-2">Create your account </h4>
          <h6 className="cmn_small_heading">
            Please Create your account and start the adventure!
          </h6>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label> Username</label>
              <input value={formik.values.userName} type="text" className="form-control" name="userName" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
              {formik.touched.userName && formik.errors.userName ? (
                                                    <p className="error">{formik.errors.userName}</p>
               ) : null}
            </div>

            <div className="form-group">
              <label> Email</label>
              <input value={formik.values.email}  type="email" className="form-control" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
              {formik.touched.email && formik.errors.email ? (
                                                    <p className="error">{formik.errors.email}</p>
               ) : null}
            </div>
            <div className="form-group">
              <div className="password_outer d-flex">
                <label>Password</label>
                <h6 className="span_text">Forgot Password?</h6>
              </div>
              <input value={formik.values.password}  type="password" className="form-control" name="password" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
              {formik.touched.password && formik.errors.password ? (
                <p className="error">{formik.errors.password}</p>
               ) : null}
            </div>

            <div className="d-flex gap-2 align-items-center mt-3 mb-3">
              <input type="checkbox" />
              <h6 className="cmn_small_heading mb-0">
                I agree to{" "}
                <span className="span_text">privacy policy & terms</span>
              </h6>
            </div>
            
            <Button btntext={"Sign up"} className={"cmn_btn signin_btn"} type={"submit"}/>
          
          </form>
          <h3 className="cmn_small_heading text-center mt-3">
            Already have an account?{" "}
            <span className="span_text">
              <Link to="/">sign in instaed</Link>
            </span>
          </h3>
          <h5 className="or_text">Or</h5>

          {/* social login */}
          <SocialLogin/>
        </div>
      </div>
      <SquareImg/>

      </div>
    </section>
  );
};

export default Signup;
