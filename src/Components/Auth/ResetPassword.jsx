import React, { useEffect } from "react";
import CommonRectangleImg from "../CommonComponents/CommonRectangleImg";

import SquareImg from "../CommonComponents/SquareImg";
import { useFormik } from "formik";
import { resetPasswordSchema } from "../Utils/Validation/Validation";
import { useDispatch, useSelector } from "react-redux";
import {
  clear_reset_password_slice,
  resetPasswordAction,
} from "../Utils/Store/AuthSlice/ResetPasswordSlice";
import { useNavigate, useLocation } from "react-router";
import ai_logo from "../Images/logo.png";
import { toast } from "react-toastify";
import Button from "../CommonComponents/Button";
import "./style.css";
import NotFound from "../Error/NotFound";
const ResetPassword = () => {
  const location = useLocation();
  let { email } = location?.state ? location?.state : location;
  const dispatch = useDispatch();
  const resetPasswordData = useSelector((store) => {
    return store.RESET_PASSWORD;
  });

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: email,
      password: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: (values) => {
      dispatch(
        resetPasswordAction({
          email: email,
          password: values.password,
          confirmPassword: values.confirmPassword,
        })
      );
    },
  });

  useEffect(() => {
    if (resetPasswordData.isError === true) {
      toast.error(resetPasswordData.error.message);
      dispatch(clear_reset_password_slice());
      email = "";
    } else if (resetPasswordData.isSuccess === true) {
      email = "";
      toast.success(resetPasswordData.data.message);
      navigate("/");
      dispatch(clear_reset_password_slice());
    }
  }, [resetPasswordData]);

  return (
    <section className="login_container ResetPassword_container">
      {!email ? (
        <NotFound />
      ) : (
        <div className="position-relative">
          <CommonRectangleImg />

          <div className="login_wrapper">
            <div className="d-flex login_header gap-2 align-items-center justify-content-center">
              <img src={ai_logo} className="ai_logo" alt="ai_logo" />
              <h3 className="cmn_heading_style plan_ai_detector_heading"> Plan AI Detector</h3>
            </div>

            <div className="login_content">
              <h4 className="cmn_heading_style mt-4">Reset Password </h4>

              <form onSubmit={formik.handleSubmit}>
                <div className="form-group mb-3">
                  <label>Email</label>
                  <input
                    name="email"
                    disabled={true}
                    value={email}
                    onBlur={formik.handleBlur}
                    type="email"
                    className="form-control"
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <p className="error">{formik.errors.email}</p>
                  ) : (
                    ""
                  )}
                </div>

                <div className="form-group mb-3">
                  <label>Password</label>
                  <input
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    type="password"
                    className="form-control"
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <p className="error">{formik.errors.password}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group mb-3">
                  <label>Confirm Password</label>
                  <input
                    name="confirmPassword"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    onBlur={formik.handleBlur}
                    type="password"
                    className="form-control"
                  />
                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword ? (
                    <p className="error">{formik.errors.confirmPassword}</p>
                  ) : (
                    ""
                  )}
                </div>

                <Button
                  type={"submit"}
                  isLoading={resetPasswordData?.isLoading}
                  className={"cmn_btn signin_btn"}
                  btntext={"Reset Password"}
                />
              </form>
            </div>
          </div>
          <SquareImg />
        </div>
      )}
    </section>
  );
};

export default ResetPassword;
