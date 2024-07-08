import React, { useEffect } from "react";
import CommonRectangleImg from "../CommonComponents/CommonRectangleImg";
import Button from "../CommonComponents/Button";
import SquareImg from "../CommonComponents/SquareImg";
import { useFormik } from "formik";
import {
  clear_verifyotp_slice,
  verifyOtpAction,
} from "../Utils/Store/AuthSlice/VerifyOtpSlice";
import { useDispatch, useSelector } from "react-redux";
import ai_logo from "../Images/logo.png";
import { toast } from "react-toastify";
import "./style.css";
import { useNavigate, useLocation } from "react-router";
import * as Yup from "yup";
import NotFound from "../Error/NotFound";

const VerifyOtp = () => {
  const location = useLocation();
  let { email } = location.state ? location.state : location;
  const dispatch = useDispatch();
  const verifyOtpData = useSelector((store) => {
    return store.VERIFY_OTP_SLICE;
  });


  useEffect(() => {
    return () => {
      dispatch(clear_verifyotp_slice());
      email = ""
    };
  }, []);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      otp: Array(4).fill(""),
    },

    validationSchema: Yup.object({
      otp: Yup.array().of(
        Yup.string().required("Required").matches(/^\d$/, "Must be a digit")
      ),
    }),
    onSubmit: (values) => {
      const otpvalue = values.otp.join("");
      dispatch(verifyOtpAction({ email: email, otp: Number(otpvalue) }));
    },
  });

  useEffect(() => {
    if (verifyOtpData.isError) {
      toast.error(verifyOtpData.error.message);
      dispatch(clear_verifyotp_slice());
    } else if (verifyOtpData.isSuccess) {
      toast.success(verifyOtpData.data.message);
      dispatch(clear_verifyotp_slice());
      navigate("/reset-password",{state : {email : email}});
    }
  }, [verifyOtpData,email]);

  const handleChange = (e, index) => {
    const { value, name } = e.target;
    const otp = [...formik.values.otp];

    // Check for backspace
    if (e.nativeEvent.inputType === "deleteContentBackward") {
      otp[index] = "";
      formik.setFieldValue("otp", otp);

      // Focus previous input
      if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    } else if (!isNaN(value) && value !== "") {
      otp[index] = value.slice(-1);
      formik.setFieldValue("otp", otp);

      // Focus next input
      if (index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  return (
    <section className="verify_otp_container login_container vh-100">
      {!email ? <NotFound /> : <div className="position-relative">
        <CommonRectangleImg />

        <div className="login_wrapper">
          <div className="d-flex login_header gap-2 align-items-center justify-content-center">
            <img src={ai_logo} className="ai_logo" alt="ai_logo" />
            <h3 className="cmn_heading_style plan_ai_detector_heading"> Plan AI Detector</h3>
          </div>

          <div className="login_content">
            <h3 className="cmn_heading_style mt-4">OTP Verification</h3>
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group mb-3">
                <div className="otp-inputs">
                  {formik.values.otp.map((data, index) => (
                    <input
                      key={index}
                      id={`otp-input-${index}`}
                      name={`otp[${index}]`}
                      type="text"
                      className="form-control otp-input"
                      value={data}
                      onChange={(e) => handleChange(e, index)}
                      onBlur={formik.handleBlur}
                      maxLength="1"
                    />
                  ))}
                </div>
                {formik.touched.otp && formik.errors.otp && (
                  <p className="error">
                    {formik.errors.otp.find((error) => error !== undefined) ||
                      ""}
                  </p>
                )}
              </div>
              <Button
                isLoading={verifyOtpData?.isLoading}
                type={"submit"}
                className={"cmn_btn signin_btn mt-3"}
                btntext={"Verify"}
              />
            </form>
          </div>
        </div>
        <SquareImg />
      </div>}
    </section>
  );
};

export default VerifyOtp;
