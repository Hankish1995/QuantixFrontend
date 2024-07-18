import React, { useState, useEffect, useRef, useMemo } from "react";
import "./Report.css";
import animation_loader_img from "../Images/Animation - 1719829224012 (2).gif"
import { useDispatch, useSelector } from "react-redux";
import Loader from "../CommonComponents/Loader";
import { useLocation, useNavigate } from "react-router";
import NotFound from "../Error/NotFound";
import badrequest_img from "../Images/400_img.png";
import { toast } from "react-toastify";
import { clear_plan_estimates, getPlanDetailsEstimates } from "../Utils/Store/PlanSlice/get_plan_details_slice";
import { clear_add_plan_slice } from "../Utils/Store/PlanSlice/AddPlanSlice";
import { IoIosArrowBack } from "react-icons/io";

const Report = () => {
  const dispatch = useDispatch()
  const addPlanData = useSelector((store) => store.ADD_PLAN_SLICE);
  const plan_estimates = useSelector((store) => { return store.PLAN_ESTIMATES })
  const [apiResponse, setApiResponse] = useState("");
  const [image_data, setImage_data] = useState();
  const location = useLocation();
  const { data, planId, isNotFound } = location.state || {};
  const { planName, image } = data || {};
  const divRef = useRef(null);
  const [success, setSuccess] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const navigate = useNavigate()
  useEffect(() => {
    setSuccess(addPlanData.isSuccess);
    setError(addPlanData.isError);
    setLoading(addPlanData.loading);
  }, [addPlanData]);

  useEffect(() => {
    if (planId && !isNotFound) {
      dispatch(getPlanDetailsEstimates({ planId: planId }))
      dispatch(clear_plan_estimates())
    }

  }, [!isNotFound, planId])

  useEffect(() => {
    return () => {
      dispatch(clear_add_plan_slice())
    }
  }, [])
  console.log(addPlanData?.data, "addPlanData")

  useEffect(() => {
    if (plan_estimates?.isSuccess) {
      let processedContent;
      const tableRegex = /^\|.*\|$/m;
      const determineFormat = (data) => {
        if (tableRegex.test(data)) {
          return "table";
        }
        return "default";
      };
      let format = determineFormat(plan_estimates?.data?.data?.outputGenerated);

      if (format === "table") {
        processedContent = formatTableContent(plan_estimates?.data?.data?.outputGenerated);
      } else {
        processedContent = formatContent(plan_estimates?.data?.data?.outputGenerated);
      }

      setApiResponse(processedContent);
    }

    if (plan_estimates?.isError) {
      toast.error("Something went wrong")
    }

  }, [plan_estimates])

  let imageUrl;
  useEffect(() => {
    if (addPlanData.isError) {
      toast.error(addPlanData.error);
    }
    if (addPlanData?.isSuccess) {
      let processedContent;
      const tableRegex = /^\|.*\|$/m;
      const determineFormat = (data) => {
        if (tableRegex.test(data)) {
          return "table";
        }
        return "default";
      };
      let format = determineFormat(addPlanData.data);

      if (format === "table") {
        processedContent = formatTableContent(addPlanData.data);
      } else {
        processedContent = formatContent(addPlanData.data);
      }

      setApiResponse(processedContent);
    }
  }, [addPlanData]);

  const formatTableContent = (content) => {
    content = content.replace(/["`,./[\]#\\]/g, "");

    content = content.replace(/stream started/gi, "");
    content = content.replace(/stream ended/gi, "");
    let htmlContent = content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    const rows = htmlContent.split("\n");
    htmlContent = "<table>";
    rows.forEach((row) => {
      htmlContent += "<tr>";
      const cells = row.split("|").filter((cell) => cell.trim() !== "");
      cells.forEach((cell) => {
        htmlContent += `<td>${cell.trim()}</td>`;
      });
      htmlContent += "</tr>";
    });
    htmlContent += "</table>";

    return htmlContent;
  };

  const formatContent = (content) => {
    content = content.replace(/["`/[\]#\\]/g, "");
    content = content.replace(/stream started/gi, "");
    content = content.replace(/stream ended/gi, "");
    let htmlContent = content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    htmlContent = htmlContent.replace(/\|/g, "</td><td>");
    htmlContent = `<table>${htmlContent
      .split("\n")
      .map((row) => `<tr><td>${row}</td></tr>`)
      .join("")}</table>`;
    htmlContent = htmlContent.replace(
      /\*\*Grand Total\*\*: (.*?)$/m,
      "<p><strong>Grand Total:</strong> $1</p>"
    );
    return htmlContent;
  };

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [apiResponse]);

  useEffect(() => {
    if (image) {
      imageUrl = URL.createObjectURL(image[0]);
      setImage_data(imageUrl);
    }
  }, [])

  let extension
  if (plan_estimates?.data?.data?.imageUrl) {
    const url = plan_estimates?.data?.data?.imageUrl
    const parts = url?.split('.');
    extension = parts[parts?.length - 1].split('?')[0];

  }


  const imageUri = useMemo(() => {
    if (image && image[0]?.type === "application/pdf" || extension === "pdf") {

      return image_data && `${image_data}#toolbar=0`
    } else {
      return image_data && image_data;
    }
  }, [image_data]);

  return (
    <>
      {isNotFound && !success && !error && !loading ? (
        <NotFound />
      ) : (
        <section className="report_outer ">
          <div className="dashboard_container cmn_container pb-4">
            <div className="">

              <div className="d-flex justify-content-between">
                <div>
                  <h3 className="cmn_heading_style cursor-pointer dashboard_plan_heading d-flex align-items-center" >
                    <IoIosArrowBack className="cursor-pointer" onClick={() => { navigate("/dashboard") }} />
                    <span className="submit_plan_heading" onClick={() => { navigate("/dashboard") }}>Dashboard</span>
                  </h3>
                </div>
                <div>
                  <h3 className="submit_plan_heading adjust_text">{planName ? planName : plan_estimates?.data?.data?.planName}</h3>
                </div>
              </div>
              <div className="row cmn_padding">
                <div className="col-lg-6 col-sm-12 col-md-6 ">
                  <div className={`white_bg report_content_outer ${image && image[0]?.type === "application/pdf" || extension === "pdf" ? "" : "image_container"}`}>
                    <div className="zone_outer"></div>

                    <div className="report_diagram_wrapper">
                      {image && image[0]?.type === "application/pdf" || extension === "pdf" ?
                        <embed
                          src={imageUri ? imageUri : plan_estimates?.data?.data?.imageUrl}
                          type="application/pdf"
                          width="100%"
                          height="500px"
                          className="pdfFile_container"
                        />
                        :
                        <img
                          src={image_data ? image_data : plan_estimates?.data?.data?.imageUrl}
                          alt="report_diagram"
                          className="report_diagram"
                        />
                      }
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 col-sm-12 col-md-6 report_image_outer">
                  <div className="white_bg report_content_outer position-relative">
                    <div className="legend_outer">
                      <ul className="legend_list">
                        <li>
                          {addPlanData?.loading ? (


                            <Loader classname="loading_container" />

                          ) : (
                            <div
                              className="zone_content_wrapper report_response_outer"
                              ref={divRef}
                            >
                              {addPlanData?.isError ? (
                                <img
                                  className="badrequest_img"
                                  src={badrequest_img}
                                  height="100%"
                                  width="100%"
                                  alt="plan imag"
                                />
                              ) : (
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: apiResponse,
                                  }}
                                />
                              )}
                              {addPlanData?.responseLoader && (
                                <div className=" text-center">
                                  <img src={animation_loader_img} height="52px" width="52px" />

                                </div>
                              )}
                            </div>
                          )}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="confirm_submit_btn_outer text-end me-3">
                {/* <button className='cmn_btn confirm_submit_btn'>Confirm Submit</button> */}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Report;
