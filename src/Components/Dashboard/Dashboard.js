import React from 'react'
import "./dashboard.css"
import { FaRegTrashAlt } from "react-icons/fa";
import left_right_icon from "../Images/left-right-icon.svg"
import { BsThreeDotsVertical } from "react-icons/bs";
import arrow_icon from "../Images/Arrow-top-down.svg"
import Pagination from '../Pagination/Pagination';

const Dashboard = () => {
  return (
    <div className='dashboard_container cmn_container cmn_width'>
      <h3 className='cmn_heading_style dashboard_plan_heading'>Dashboard Plans</h3>
      <div className='white_bg cmn_box-shadow pb-3'>
      <div className='select_plan_outer'>
        <select className='select_btn '>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>10</option>
        </select>
        <div className='search_plan_wrapper d-flex gap-3'>
          <input type='text' className='form-control Search_plans_input' placeholder='Search plans'/>
          <button className='cmn_btn submit_plan_btn'>Submit Plans</button>
        </div>


      </div>
    
    
   
      <div className='table-responsive'>
    
      <table className='table_plan table'>
        <thead>
          <tr>
          <th>
          
          <div className='d-flex align-items-center gap-4'>
             <h6> PLAN NAME</h6>
                <img src={arrow_icon} alt='arrow_icon'/>
              </div>
           
          </th>
          <th>
         
              <div className='d-flex align-items-center gap-4'>
             <h6 className=''> PLAN ADDRESS</h6>
              </div>
            
          </th>
          <th>
         
              <div className='d-flex align-items-center gap-4'>
                <img src={arrow_icon} alt='arrow_icon'/>
             <h6>STATUS</h6>
              </div>
           
          </th>
          <th>
       
              <div className='d-flex align-items-center gap-4 justify-content-end'>
                <img src={arrow_icon} alt='arrow_icon'/>
             <h6> ACTIONS</h6>
              </div>
          
          </th>

          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Enterprise</td>
            <td>Marge.Jacobson@gmail.com</td>
            <td><span className='active_btn cmn_status_text'>Active</span></td>
            <td>
              <div className='d-flex gap-3 justify-content-end actions_wrapper'>
              <img src={left_right_icon} alt='left_right_icon' height="20px" width="20px"/>
              <FaRegTrashAlt />
              <BsThreeDotsVertical />

              </div>
            </td>
            
          </tr>
          <tr>
            <td>Enterprise</td>
            <td>Marge.Jacobson@gmail.com</td>
            <td><span className='inactive_btn cmn_status_text'>Inactive</span></td>
            <td>
              <div className='d-flex gap-3 justify-content-end actions_wrapper'>
              <img src={left_right_icon} alt='left_right_icon' height="20px" width="20px"/>
              <FaRegTrashAlt />
              <BsThreeDotsVertical />

              </div>
            </td>
            
          </tr>
          <tr>
            <td>Enterprise</td>
            <td>Marge.Jacobson@gmail.com</td>
            <td><span className='pending_btn cmn_status_text'>Pending</span></td>
            <td>
              <div className='d-flex gap-3 justify-content-end actions_wrapper'>
              <img src={left_right_icon} alt='left_right_icon' height="20px" width="20px"/>
              <FaRegTrashAlt />
              <BsThreeDotsVertical />

              </div>
            </td>
            
          </tr>
        </tbody>
      </table>

     

      </div>
      {/* pagination */}
      <Pagination/>

    </div>
    </div>
  )
}

export default Dashboard