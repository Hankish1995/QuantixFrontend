import { useNavigate, useRouteError } from "react-router-dom";
import NotFound_img from "../Images/404img.png"
import "./error.css"
const NotFound = () => {


  const navigate=useNavigate()
  return (
    <>
    <div className="d-flex justify-content-center not_found_wrapper">
      <div>
      <img src={NotFound_img} height={"500px"} width={"600px"} className="NotFound_img"/>
      <div className="text-center">
      <button className="cmn_btn back_btn" onClick={()=>navigate(-1)}>Back</button>

      </div>

      </div>
    </div> 
    </>
  );
};

export default NotFound;
