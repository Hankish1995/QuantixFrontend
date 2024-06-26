import React, { useEffect, useState } from 'react'
import "./dashboard.css"
import { FaRegTrashAlt } from "react-icons/fa";
import left_right_icon from "../Images/left-right-icon.svg"
import { BsThreeDotsVertical } from "react-icons/bs";
import arrow_icon from "../Images/Arrow-top-down.svg"
import { useDispatch, useSelector } from 'react-redux';
import { clear_getall_plan_slice, getAllPlanActions } from '../Utils/Store/PlanSlice/GetAllPlanSlice';
import { clear_delete_plan_slice, deletePlanActions, delete_plan_slice } from '../Utils/Store/PlanSlice/DeletePlanSlice';
import Loader from '../CommonComponents/Loader';
import { toast } from 'react-toastify';
import Pagination from '../Pagination/Pagination';
import { useNavigate } from 'react-router';

const Dashboard = () => {

  const getAllPlansData = useSelector((store) => {return store.GET_ALL_PLAN_SLLICE})
  const deletePlanData=useSelector((store)=>{return store.DELETE_PLAN_SLICE} )


 const[currentPage,setCurrentPage]=useState(1)
 const[limit,setLimit]=useState(5)
 const[searchPlan,setSearchPlan]=useState("")
 const[showButton,setShowButton]=useState(false)
 const[error,setError]=useState(false)
 

  const dispatch=useDispatch()
const navigate=useNavigate()

useEffect(()=>{
  dispatch(getAllPlanActions({currentPage,limit,searchPlan}))
  
  if(deletePlanData.isError==true){
    toast.error(deletePlanData?.error.message)
    dispatch(clear_delete_plan_slice())
  }
 if(deletePlanData.isSuccess===true){
    toast.success(deletePlanData.data.message)
    dispatch(clear_delete_plan_slice())
    dispatch(getAllPlanActions({currentPage,limit,searchPlan}))
  }
},[deletePlanData,currentPage,limit])

// delete plan handler
const deletePlanHandler=(id)=>{
dispatch(deletePlanActions(id))

}

const handlePageClick = (event ) => {
  setCurrentPage(event.selected+1)
};

const selectHandler =(e)=>{
setLimit(e.target.value)
}
const submitPlanHandler=(e)=>{
  e.preventDefault()
  if(searchPlan===""){
    setError(true)
  }else{
    setShowButton(true)
    setError(false)
    dispatch(getAllPlanActions({currentPage,limit,searchPlan}))
    // dispatch(clear_getall_plan_slice())

  }
}

const clearPlanHandler=()=>{
  setShowButton(false)
  setSearchPlan("")
  dispatch(getAllPlanActions({currentPage,limit,searchPlan:""}))
}

const capitalLiseString=(str)=>{
  const modStr = str[0].toUpperCase() + str.slice(1);
return modStr

}


  return (
     
    <div className='dashboard_container cmn_container cmn_width'>

      <h3 className='cmn_heading_style dashboard_plan_heading'>Dashboard Plans</h3>
      <div className='white_bg cmn_box-shadow pb-3'>
      <div className='select_plan_outer'>
        <div>
        <select className='select_btn ' value={limit} onChange={(e) => selectHandler(e)}>
          <option value={5}>5</option>
          <option  value={10}>10</option>
          <option  value={15}>15</option>
          <option  value={20}>20</option>
        </select>

        </div>
        <div className='search_plan_wrapper d-flex gap-3'>
          <div>
      
          <input  disabled={showButton} value={searchPlan} onChange={(e)=>{setSearchPlan(e.target.value)}}  type='text' className='form-control Search_plans_input' placeholder='Search plans'/>
          {error?<p className='error'>Required</p>:""}

          </div>
          {showButton ?<button className='cmn_btn submit_plan_btn' onClick={clearPlanHandler}>Clear Plan</button>: 
          <div>
            
            <button className='cmn_btn submit_plan_btn' onClick={submitPlanHandler}>Submit Plans</button>
          </div>
          }
          
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
        { 
      getAllPlansData?.loading ? 
      <tr>
      <td colSpan="4" style={{ textAlign: 'center' }}>
        <Loader />
      </td>
    </tr>
      
      : 
          getAllPlansData?.data && getAllPlansData?.data?.plans?.map((data,i)=>{
            return(
              <tr key={i}>
              <td>{capitalLiseString(data.planName)}</td>
              <td>{data.planAddress}</td>
              <td><span className={`cmn_status_text ${data.status===false? "inactive_btn":"active_btn"}`}>{data.status===false? "Inactive":"Active"}</span></td>
              <td>
                <div className='d-flex gap-3 justify-content-end actions_wrapper'>
                <img src={left_right_icon} alt='left_right_icon' height="20px" width="20px"/>
                <FaRegTrashAlt onClick={()=>{deletePlanHandler(data._id)}} className=' trash-icon'/>
                <BsThreeDotsVertical />
  
                </div>
              </td>
              
            </tr>
            )
          }) 
          
          }
         

        </tbody>
      </table>

      </div>
      {/* pagination */}
      <Pagination pageCount={getAllPlansData?.data?.totalPages} handlePageClick={handlePageClick} totalCount={getAllPlansData?.data?.totalCount} currentPage={currentPage}/>

    </div>
     
    </div>
        
  )
}

export default Dashboard