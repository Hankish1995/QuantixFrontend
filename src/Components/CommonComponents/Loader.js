import React from 'react'
import loading_img from "../Images/loading-gif.gif"
import "./commonStyle.css"
const Loader = ({classname}) => {
  return (
    <div className={`d-flex align-items-center justify-content-center  loader_outer ${classname}`}>
        <img src={loading_img} height="80px" width="80px"/>
    </div>
  )
}

export default Loader