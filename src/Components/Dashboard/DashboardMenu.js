import React, { useState } from 'react'
import "./dashboard.css"
import { BsUpload } from "react-icons/bs";



const DashboardMenu = () => {

    
  
   

  return (
    <div className='dashboardmenu_container cmn_container cmn_width'>
      <h3 className='cmn_heading_style dashboard_plan_heading'><span className='submit_plan_heading'>Dashboard</span>/Submit plan</h3>
    <div className='plan_details_outer cmn_padding white_bg cmn_box-shadow'>
        <h4 className='Plan_Details_heading'>Plan Details</h4>
        <h5 className='cmn_small_heading'>Enter Your Plans Details.</h5>
        <div className='row'>
            <div className='col-lg-6 col-md-6 col-sm-12'>
                <div className='form-group'>
                    <label>Plan Name</label>
                    <input type="text" className='form-control'/>
                </div>
            </div>
            <div className='col-lg-6 col-md-6 col-sm-12'>
            <div className='form-group'>
                    <label>Address</label>
                    <input type="text" className='form-control'/>
                </div>
            </div>
        </div>
        <label id='drop_file' className='drop_file_label'>
            <div className='file_upload_outer d-flex justify-content-center'>
            <div className='file_upload'>
            <BsUpload />
            </div>
            </div>
           <h3 className='text-center cmn_heading_style drop_file_text mt-3'>Drop files here or click to upload</h3>
           <h5 className='cmn_small_heading text-center'>(This is just a demo dropzone. Selected files are not actually uploaded.)</h5>
            <input type='file' htmlFor="drop_file" name='drop_file' className='drop_file_input' />
         
            
        </label>

    </div>
        <div className='text-end review_btn_outer'>
            <button className='review_btn'>Review</button>
            <button className='cmn_btn submit-Plan_btn ms-3'>Submit Plans</button>
        </div>
    
    </div>
  )
}

export default DashboardMenu
