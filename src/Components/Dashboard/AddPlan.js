import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { BsUpload } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { addPlanSchema } from "../Utils/Validation/Validation";
import {
  addPlanActions,
  clear_add_plan_slice,
} from "../Utils/Store/PlanSlice/AddPlanSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import SpinnerLoder from "../CommonComponents/SpinnerLoder";
import { MdOutlineCancel } from "react-icons/md";

const AddPlan = () => {
  const [files, setFiles] = useState([]);
  const [imageUrl, setImageUrl] = useState();
console.log(imageUrl,"imageurl")

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const droppedFiles = Array.from(e.dataTransfer.files);
    const imageUrl=URL.createObjectURL(droppedFiles[0])
    setImageUrl(imageUrl)
    setFiles(droppedFiles);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    const imageUrl=URL.createObjectURL(selectedFiles[0])
    setImageUrl(imageUrl)
  };

  const formik = useFormik({
    initialValues: {
      planName: "",
      planAddress: "",
    },
    validationSchema: addPlanSchema,
    onSubmit: (values) => {
      if(imageUrl){
      dispatch(
        addPlanActions({
          planName: values.planName,
          planAddress: values.planAddress,
          planImg: files,
        })
      );
    

        navigate('/report', { state: { data: {
          planName: formik.values.planName,
          image: files
        } } });
    
      }else{
        toast.error("Image Required")
      }

    },
  });

  const addPlanData = useSelector((store) => {
    return store.ADD_PLAN_SLICE;
  });
  console.log(addPlanData, "addPlanData");

  useEffect(() => {
    if (addPlanData.isSuccess) {
      // toast.success(addPlanData.data.message)
      // dispatch(clear_add_plan_slice())
    }
    if (addPlanData.isError === true) {
      toast.error(addPlanData.error.message);
      dispatch(clear_add_plan_slice());
    }
  }, [addPlanData]);

  return (
    <div className="dashboardmenu_container cmn_container ">
      <div className="">
      <h3 className="cmn_heading_style dashboard_plan_heading cursor-pointer" onClick={()=>{navigate("/dashboard")}}>
        <span className="submit_plan_heading">Dashboard</span>/Submit plan
      </h3>
      <form onSubmit={formik.handleSubmit}>
        <div className="plan_details_outer cmn_padding white_bg cmn_box-shadow">
          <h4 className="Plan_Details_heading">Plan Details</h4>
          <h5 className="cmn_small_heading">Enter Your Plans Details.</h5>

          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="form-group">
                <label>Plan Name</label>
                <input
                  type="text"
                  value={formik.values.planName}
                  className="form-control"
                  name="planName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.planName && formik.errors.planName ? (
                  <p className="error">{formik.errors.planName}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  value={formik.values.planAddress}
                  className="form-control"
                  name="planAddress"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.planAddress && formik.errors.planAddress ? (
                  <p className="error">{formik.errors.planAddress}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

          {/* selected file  */}
          <div className="">
            {files.length > 0 ? (
              <div className="drop_file_wrapper">
                {files.map((file, index) => (
                  <h3 className="cmn_heading_style" key={index}>
                    {file.name}
                    <MdOutlineCancel className="ms-3" onClick={()=>{setFiles([]);
                    setImageUrl("")
                
                    }}/>
                  </h3>

                ))}
                <img src={imageUrl} height={"200px"} width={"200px"}/>
              </div>
            ) : (
              <label
                id="drop_file"
                className="drop_file_wrapper"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
              >
                <div className="file_upload_outer d-flex justify-content-center">
                  <div className="file_upload">
                    <BsUpload />
                  </div>
                </div>
                <h3 className="text-center cmn_heading_style drop_file_text mt-3">
                  Drop files here or click to upload
                </h3>
                <h5 className="cmn_small_heading text-center">
                  (This is just a demo dropzone. Selected files are not actually
                  uploaded.)
                </h5>
                <input
                  onChange={handleFileSelect}
                  type="file"
                  htmlFor="drop_file"
                  name="drop_file"
                  className="drop_file_input"
                />
              </label>
            )}
          </div>
        </div>
        <div className="text-end review_btn_outer">
          {/* <button className="review_btn" type="button">Review</button> */}
          <button className="cmn_btn submit-Plan_btn ms-3" type="submit">
            {" "}
            {addPlanData?.loading ? <SpinnerLoder /> : "Submit Plans"}
          </button>
        </div>
      </form>

      </div>

    </div>
  );
};

export default AddPlan;
