import React, { useState, useEffect, useRef } from "react";
import "./Report.css";
import animation_loader_img from "../Images/Animation - 1719829224012 (2).gif"
import {useDispatch, useSelector } from "react-redux";
import DOMPurify from "dompurify";
import Loader from "../CommonComponents/Loader";
import { useLocation, useNavigate } from "react-router";
import { capitalLiseString } from "../Utils/CommonUtils";
import NotFound from "../Error/NotFound";
import badrequest_img from "../Images/400_img.png";
import noplan_img from "../Images/noplan_img.svg";

import { toast } from "react-toastify";
import { getPlanDetailsEstimates } from "../Utils/Store/PlanSlice/get_plan_details_slice";
const Report = () => {
  const dispatch = useDispatch()
  const addPlanData = useSelector((store) => store.ADD_PLAN_SLICE);
  const plan_estimates = useSelector((store) => {return store.PLAN_ESTIMATES})

  const [apiResponse, setApiResponse] = useState("");
  const [image_data, setImage_data] = useState();
  const location = useLocation();
  const { data,planId,isNotFound } = location.state || {};



  const { planName, image } = data || {};
  const divRef = useRef(null);

  const [success, setSuccess] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
 const navigate=useNavigate()
  useEffect(() => {
    setSuccess(addPlanData.isSuccess);
    setError(addPlanData.isError);
    setLoading(addPlanData.loading);
  }, [addPlanData]);

  useEffect(() => {
    if(planId && !isNotFound){
      dispatch(getPlanDetailsEstimates({planId :planId }))
    }

  },[!isNotFound,planId])

  useEffect(() => {
    if(plan_estimates?.isSuccess){
      let processedContent;

      // Example pattern to detect a table format
      const tableRegex = /^\|.*\|$/m; // Example: matches lines starting and ending with "|"

      // Function to determine format based on regex patterns
      const determineFormat = (data) => {
        if (tableRegex.test(data)) {
          return "table"; // Example: data appears to be in a table format
        }
        return "default"; // Default handling
      };

      // Match based on determined format or default
      let format = determineFormat(plan_estimates?.data?.data?.outputGenerated);

      if (format === "table") {
        processedContent = formatTableContent(plan_estimates?.data?.data?.outputGenerated);
      } else {
        processedContent = formatContent(plan_estimates?.data?.data?.outputGenerated);
      }

      setApiResponse(processedContent);
    }

    if(plan_estimates?.isError){
      toast.error("Something went wrong")
    }

  },[plan_estimates])

  let imageUrl;
  useEffect(() => {
    if (addPlanData.isError) {
      toast.error(addPlanData.error);
    }
    if (image) {
      imageUrl = URL.createObjectURL(image[0]);
      setImage_data(imageUrl);
    }
    if (addPlanData?.isSuccess) {
      let processedContent;

      // Example pattern to detect a table format
      const tableRegex = /^\|.*\|$/m; // Example: matches lines starting and ending with "|"

      // Function to determine format based on regex patterns
      const determineFormat = (data) => {
        if (tableRegex.test(data)) {
          return "table"; // Example: data appears to be in a table format
        }
        return "default"; // Default handling
      };

      // Match based on determined format or default
      let format = determineFormat(addPlanData.data);

      if (format === "table") {
        processedContent = formatTableContent(addPlanData.data);
      } else {
        processedContent = formatContent(addPlanData.data);
      }

      setApiResponse(processedContent);
    }
  }, [addPlanData, image]);

  // Function to format table-like content
  const formatTableContent = (content) => {
    // Clean up unwanted characters
    content = content.replace(/["`,./[\]#\\]/g, "");

    content = content.replace(/stream started/gi, "");
    content = content.replace(/stream ended/gi, "");
    // Replace markdown symbols with HTML equivalents
    let htmlContent = content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"); // Convert text to <strong>text</strong>

    // Split lines by newline and process each row
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
    // Clean up unwanted characters
    content = content.replace(/["`,./[\]#\\]/g, "");

    content = content.replace(/stream started/gi, "");
    content = content.replace(/stream ended/gi, "");

    // Replace markdown symbols with HTML equivalents
    let htmlContent = content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"); // Convert text to <strong>text</strong>
    htmlContent = htmlContent.replace(/\|/g, "</td><td>"); // Convert | to </td><td>

    // Wrap table rows and cells in HTML table structure
    htmlContent = `<table>${htmlContent
      .split("\n")
      .map((row) => `<tr><td>${row}</td></tr>`)
      .join("")}</table>`;

    // Convert **Grand Total**: $6794.55 to <p><strong>Grand Total:</strong> $6794.55</p>
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
  
  return (
    <>
      {isNotFound && !success && !error && !loading ? (
        <NotFound />
      ) : (
        <section className="report_outer ">
          <div className="dashboard_container cmn_container pb-4">
            <div className="">
              <h3 className="cmn_heading_style dashboard_plan_heading cursor-pointer" onClick={()=>{navigate("/dashboard")}}>
                <span className="submit_plan_heading">Dashboard</span>/Report
              </h3>
              <h4 className="cmn_heading_style plan_name_heading">
                {" "}
                {(planName || plan_estimates?.data?.data?.planName) && capitalLiseString(planName ? planName : plan_estimates?.data?.data?.planName)}
              </h4>
              <div className="row cmn_padding">
                <div className="col-lg-6 col-sm-12 col-md-6 ">
                  <div className="white_bg report_content_outer image_container">
                    <div className="zone_outer"></div>

                    <div className="report_diagram_wrapper">
                      <img
                        src={image_data ? image_data :  plan_estimates?.data?.data?.imageUrl}
                        alt="report_diagram"
                        className="report_diagram"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 col-sm-12 col-md-6 report_image_outer">
                  <div className="white_bg report_content_outer position-relative">
                    <div className="legend_outer">
                      <ul className="legend_list">
                        <li>
                          {addPlanData?.loading? (
                           

                              <Loader classname="loading_container"/>
                            
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
                                  <img src={animation_loader_img} height="52px" width="52px"/>
                                
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
