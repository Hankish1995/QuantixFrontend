import React, { useEffect, useState } from "react";
import "./style.css";
import ai_logo from "../Images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema } from "../Utils/Validation/Validation";
import SocialLogin from "../CommonComponents/SocialLogin";
import CommonRectangleImg from "../CommonComponents/CommonRectangleImg";
import SquareImg from "../CommonComponents/SquareImg";
import Button from "../CommonComponents/Button";
import { UseLogin } from "../Utils/customHooks/AuthHooks/AuthHooks";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clear_login_slice } from "../Utils/Store/AuthSlice/LoginSlice";
import TwitterLogin from "../CommonComponents/TwitterLogin";

const Login = () => {
  const loginaction = UseLogin();
  const [checked, setChecked] = useState(false);

  const loginData = useSelector((state) => {
    return state.LOGIN_SLICE;
  });

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("email");
    const rememberedPassword = localStorage.getItem("password");
    if (rememberedEmail && rememberedPassword) {
      formik.setValues({
        email: rememberedEmail,
        password: rememberedPassword,
      });
      setChecked(true);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      if (checked) {
        localStorage.setItem("password", values.password);
        localStorage.setItem("email", values.email);
      } else {
        localStorage.removeItem("password");
        localStorage.removeItem("email");
      }
      loginaction(values.email, values.password);
    },
  });

  const dispatch = useDispatch();
  useEffect(() => {
    if (loginData.isError === true) {
      toast.error(loginData.error.message);
      dispatch(clear_login_slice());
    } else if (loginData.isSuccess === true) {
      toast.success(loginData.data.message);
      localStorage.setItem("token", loginData?.data?.userObj?.token);
      localStorage.setItem("username", loginData?.data?.userObj?.username);
      localStorage.setItem("email", loginData?.data?.userObj?.email);
      localStorage.setItem("user_id", loginData?.data?.userObj?._id);

      dispatch(clear_login_slice());
      navigate("/dashboard");
    }
  }, [loginData]);

  return (
    <section className="login_container">
      <div className="position-relative">
        <CommonRectangleImg />

        <div className="login_wrapper">
          <div className="d-flex login_header gap-2 align-items-center justify-content-center">
            <img src={ai_logo} className="ai_logo" alt="ai_logo" />
          </div>

          <div className="login_content">
            <h4 className="cmn_heading_style plan_ai_detector_heading  mt-4 text-center">
              Welcome to Quanti
            </h4>
            <h6 className="cmn_small_heading text-center">
              Please sign in to your account, or create an account and get
              started
            </h6>

            <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <label>Email or Username</label>
                <input
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  type="text"
                  className="form-control"
                />
                {formik.touched.email && formik.errors.email ? (
                  <p className="error">{formik.errors.email}</p>
                ) : (
                  ""
                )}
              </div>

              <div className="form-group">
                <div className="password_outer d-flex">
                  <label>Password</label>
                  <h6 className="span_text">
                    <Link to={"forgot-password"}>Forgot Password?</Link>
                  </h6>
                </div>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <p className="error">{formik.errors.password}</p>
                ) : (
                  ""
                )}
              </div>

              <div className="d-flex gap-2 align-items-center mt-3 mb-3">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                />
                <h6 className="cmn_small_heading mb-0">Remember Me</h6>
              </div>

              <Button
                isLoading={loginData?.loading}
                type={"submit"}
                className={"cmn_btn signin_btn"}
                btntext={"Sign in"}
              />
            </form>

            <h3 className="cmn_small_heading text-center mt-3">
              New on our platform?{" "}
              <span className="span_text">
                <Link to="/signup">Create an account</Link>
              </span>
            </h3>
            {/* <h5 className='or_text'>Or</h5> */}

            {/* social login  */}
            {/* <TwitterLogin/> */}
            {/* <SocialLogin/> */}
          </div>
        </div>
        <SquareImg />
      </div>
    </section>
  );
};

export default Login;
