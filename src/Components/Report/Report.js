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
import { FiSend } from "react-icons/fi";
import { addPlanActions } from "../Utils/Store/PlanSlice/AddPlanSlice";
import ai_logo from "../Images/logo.png";

const Report = () => {
  const dispatch = useDispatch()
  const addPlanData = useSelector((store) => store.ADD_PLAN_SLICE);
  const plan_estimates = useSelector((store) => { return store.PLAN_ESTIMATES })
  console.log(plan_estimates, "this is the plan estimates ")
  const [apiResponse, setApiResponse] = useState("");
  const [image_data, setImage_data] = useState();
  const location = useLocation();
  const { data, planId, isNotFound, } = location.state ? location.state : location;
  const { planName, image } = data || {};
  const divRef = useRef(null);
  const [success, setSuccess] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [chat_data, setChat_data] = useState([])
  console.log(chat_data, "hvhhfhghvfhmvhhgvguvgvghchchgkchch")
  const logged_in_user_details = useSelector((store) => store?.USER_PROFILE);
  const [current_index, setCurrent_index] = useState(0)
  const [prompt, setPrompt] = useState("")
  const [sessionId, setSessionId] = useState(null)
  const [stop_loading, setStop_loading] = useState(false)
  const inputRef = useRef(null);

  const [getResponse, setGetResponse] = useState(false)
  const session_id = useSelector(store => store?.SESSION_ID?.session_id?.session_id)
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
      dispatch(clear_plan_estimates())
    }
  }, [])

  useEffect(() => {
    if (plan_estimates?.isSuccess) {
      // Extracting data from plan_estimates
      const { data } = plan_estimates.data?.data?.chat;

      // Check if data exists before processing
      if (plan_estimates.data?.data?.chat) {
        // setChat_data(data.chat);
        setSessionId(plan_estimates.data?.data?.sessionId);
        setCurrent_index(plan_estimates.data?.data?.chat.length);

        // Process each item in the chat array
        plan_estimates.data?.data?.chat?.forEach((item, index) => {
          let processedContent;
          const tableRegex = /^\|.*\|$/m;

          const determineFormat = (item) => {
            if (tableRegex.test(item.message)) {
              return "table";
            }
            return "default";
          };

          let format = determineFormat(item?.message);
          if (format === "table") {
            processedContent = formatTableContent(item?.message);
          } else {
            processedContent = formatContent(item?.message);
          }

          // Update chat_data with processed message
          setChat_data(prevChatData => {
            let updatedData = [...prevChatData];
            updatedData[index] = { ...updatedData[index], message: processedContent, sender: item?.sender };
            return updatedData;
          });
        });
      }
    }

    if (plan_estimates?.isError) {
      toast.error("Something went wrong");
    }
  }, [plan_estimates]);

  let imageUrl;
  useEffect(() => {
    setGetResponse(false)
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
      setChat_data(prevChatData => {
        let updatedData = [...prevChatData];
        updatedData[current_index] = { ...updatedData[current_index], message: processedContent, sender: "quantix" };
        return updatedData;
      });
    }
  }, [addPlanData]);

  const formatTableContent = (content) => {
    content = content?.replace(/["`,./[\]#\\]/g, "");
    content = content?.replace(/stream started/gi, "");
    content = content?.replace(/stream ended/gi, "");
    let htmlContent = content?.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    const rows = htmlContent?.split("\n");
    htmlContent = "<table>";
    rows.forEach((row) => {
      htmlContent += "<tr>";
      const cells = row?.split("|")?.filter((cell) => cell?.trim() !== "");
      cells?.forEach((cell) => {
        htmlContent += `<td>${cell?.trim()}</td>`;
      });
      htmlContent += "</tr>";
    });
    htmlContent += "</table>";
    return htmlContent;
  };

  const formatContent = (content) => {
    content = content?.replace(/["`/[\]#\\]/g, "");
    content = content?.replace(/stream started/gi, "");
    content = content?.replace(/stream ended/gi, "");
    let htmlContent = content?.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    htmlContent = htmlContent?.replace(/\|/g, "</td><td>");
    htmlContent = `<table>${htmlContent
      ?.split("\n")
      ?.map((row) => `<tr><td>${row}</td></tr>`)
      ?.join("")}</table>`;
    htmlContent = htmlContent?.replace(
      /\*\*Grand Total\*\*: (.*?)$/m,
      "<p><strong>Grand Total:</strong> $1</p>"
    );
    return htmlContent;
  };

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [chat_data]);

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

  const handleContinueChat = () => {
    dispatch(clear_add_plan_slice())
    if (prompt === "") {
      return
    }

    setChat_data(prevChatData => {
      let updatedData = [...prevChatData];
      updatedData[current_index + 1] = { ...updatedData[current_index + 1], message: prompt, sender: "user" };
      return updatedData;
    });

    handleChatCompilation()
  }

  const handleChatCompilation = () => {
    setCurrent_index(current_index + 2)
    setGetResponse(true)
  }

  useEffect(() => {
    if (getResponse) {
      dispatch(addPlanActions({ sessionId: session_id ? session_id : sessionId, prompt: prompt }))
      setPrompt("")
    }

  }, [getResponse])

  const handleKeyDown = (e) => {
    // if (e.key === 'Enter' && e.shiftKey) {
    //   e.preventDefault();
    //   const { selectionStart, selectionEnd } = e.target;
    //   const newPrompt =
    //     prompt.substring(0, selectionStart) +
    //     '\n' +
    //     prompt.substring(selectionEnd);

    //   setPrompt(newPrompt);

    //   // Move the cursor to the new position after the inserted newline
    //   const newPosition = selectionStart + 1;
    //   inputRef.current.setSelectionRange(newPosition, newPosition);
    // }
    if (e.key === "Enter" && !e.shiftKey) {
      handleContinueChat()
    }
  };

  return (
    <>
      {isNotFound && !success && !error && !loading ? (
        <NotFound />
      ) : (
        <section className="report_outer ">
          <div className="dashboard_container cmn_container">

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
            <div className="row cmn_padding response_wrapper m-0">
              <div className="col-lg-6 col-sm-12 col-md-6 ">
                <div className={`white_bg report_content_outer ${image && image[0]?.type === "application/pdf" || extension === "pdf" ? "" : "image_container"}`}>
                  <div className="zone_outer"></div>
                  <div className="report_diagram_wrapper h-100">
                    {(!plan_estimates?.isSuccess && !image_data) ? <Loader /> : image && image[0]?.type === "application/pdf" || extension === "pdf" ?
                      <embed
                        src={imageUri ? imageUri : plan_estimates?.data?.data?.imageUrl}
                        type="application/pdf"
                        width="100%"
                        height="100%"
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
                  <div className="legend_outer" >


                    <div className="report_response_outer" ref={divRef}>
                      {addPlanData?.isError ? (
                        <img
                          className="badrequest_img"
                          src={badrequest_img}
                          height="100%"
                          width="100%"
                          alt="plan imag"
                        />
                      ) : (
                        <>
                          <div className="">
                            {chat_data?.map((message, index) => (
                              <div key={index}>
                                {message?.sender === "quantix" && (
                                  <div className="ai user_ai">
                                    <div className="image-container image_ai">
                                      <img
                                        className="image_ai"
                                        src={ai_logo}
                                        alt="Quanti"
                                      />
                                    </div>
                                    <div className="message-container">
                                      <div dangerouslySetInnerHTML={{ __html: message?.message }} />
                                    </div>
                                  </div>
                                )}
                                {message?.sender === "user" && (
                                  <div className="ai">
                                    <div className="user">
                                      <div className="message-container">
                                        <div dangerouslySetInnerHTML={{ __html: message?.message }} />
                                      </div>
                                      <div className="image-container image_ai">
                                        <img
                                          className="image_ai"
                                          src={
                                            logged_in_user_details?.data?.userData?.profile
                                              ? logged_in_user_details?.data?.userData?.profile
                                              : "https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
                                          }
                                          alt="Quanti"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                            {addPlanData?.loading && (
                              <div className="ai user_ai ">
                                <div className="image-container d-flex">
                                  <img
                                    className="image"
                                    src={ai_logo}
                                    alt="Quanti"
                                  />
                                  <img src={animation_loader_img} height="70" width="70" alt="imag" />
                                </div>
                              </div>
                            )}

                          </div>
                        </>
                      )}
                    </div>
                    <div className="message_outer p-2">
                      <input type="text" className="fixed w-100 scroll  rounded message_input" disabled={addPlanData?.responseLoader} placeholder="Message Quanti" value={prompt} onChange={(e) => setPrompt(e.target.value)} onKeyDown={(e) => handleKeyDown(e)} ref={inputRef} />
                      <div>
                        <button className="button_send" onClick={() => { handleContinueChat() }}><FiSend /></button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      )}
    </>
  );
};

export default Report;