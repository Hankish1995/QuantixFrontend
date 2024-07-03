import React, { useEffect, useState } from 'react'
import "./dashboard.css"
import { FaRegTrashAlt } from "react-icons/fa";
import left_right_icon from "../Images/left-right-icon.svg"
import { BsThreeDotsVertical } from "react-icons/bs";

import { useDispatch, useSelector } from 'react-redux';
import { clear_getall_plan_slice, getAllPlanActions } from '../Utils/Store/PlanSlice/GetAllPlanSlice';
import { clear_delete_plan_slice, deletePlanActions, delete_plan_slice } from '../Utils/Store/PlanSlice/DeletePlanSlice';
import Loader from '../CommonComponents/Loader';
import { toast } from 'react-toastify';
import Pagination from '../Pagination/Pagination';
import { useNavigate } from 'react-router';
import { capitalLiseString } from '../Utils/CommonUtils';
import DeletePlanModal from '../Modal/DeletePlan';
import no_plan_img from "../Images/noplan_img.svg"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Dashboard = () => {

  const getAllPlansData = useSelector((store) => {return store.GET_ALL_PLAN_SLLICE})
  const deletePlanData=useSelector((store)=>{return store.DELETE_PLAN_SLICE} )


 const[currentPage,setCurrentPage]=useState(1)
 const[limit,setLimit]=useState(5)
 const[searchPlan,setSearchPlan]=useState("")
 const[sortOrder,setSortOrder]=useState("desc")
 const [fieldName,setFieldName] = useState("")


 const[showDeletePlanModal,setShowDeletePlanModal]=useState(false)
 const[id, setId]=useState()
 
 const[input,setInput]=useState(false)

const dispatch=useDispatch()
const navigate=useNavigate()

useEffect(()=>{
  dispatch(getAllPlanActions({currentPage,limit,searchPlan,sortOrder,fieldName}))
  
  if(deletePlanData.isError==true){
    toast.error(deletePlanData?.error.message)
    dispatch(clear_delete_plan_slice())
  }
 if(deletePlanData.isSuccess===true){
    toast.success(deletePlanData.data.message)
    dispatch(clear_delete_plan_slice())
    dispatch(getAllPlanActions({currentPage,limit,searchPlan,sortOrder,fieldName}))
  }
},[deletePlanData,currentPage,limit,searchPlan,sortOrder])



// delete plan handler
const deletePlanHandler=()=>{
dispatch(deletePlanActions(id))
setShowDeletePlanModal(false)


}

const handlePageClick = (event ) => {
  setCurrentPage(event.selected+1)
};

const selectHandler =(e)=>{
setLimit(e.target.value)
}
const submitPlanHandler=()=>{
  navigate("/addPlan")
 
}

const showDeletePlanModalHandler=(id)=>{
setShowDeletePlanModal(true)
setId(id)
}
  return (
     
    <div className='dashboard_container cmn_container '>
     <div className=''>
      <h3 className='cmn_heading_style dashboard_plan_heading'>Dashboard Plans</h3>
      <div className='white_bg cmn_box-shadow pb-3'>
      <div className={`select_plan_outer ${getAllPlansData?.data?.plans?.length===0 ? "justify-content-end":"" }`}>
        <div className={`${getAllPlansData?.data?.plans?.length===0 ? "d-none":"" }`}>
      
        <select className='select_btn ' value={limit} onChange={(e) => selectHandler(e)}>
          <option value={5}>5</option>
          <option  value={10}>10</option>
          <option  value={15}>15</option>
          <option  value={20}>20</option>
        </select>

        </div>
        <div className='search_plan_wrapper d-flex gap-3'>
          <div className={`${getAllPlansData?.data?.plans?.length===0 && !input?"d-none":""}`}>
      
          <input    value={searchPlan} onChange={(e)=>{
            setSearchPlan(e.target.value);
            setInput(true)
        
          }}  type='text' className='form-control Search_plans_input' placeholder='Search plans '/>
        

          </div>
          <div>
            {input && searchPlan!="" ?  <button className='cmn_btn submit_plan_btn' onClick={()=>{
              setInput(false);
              setSearchPlan("")
              dispatch(getAllPlanActions({currentPage,limit,searchPlan:"",sortOrder,fieldName}))
            }}>Clear Search</button>:
            <button className='cmn_btn submit_plan_btn' onClick={submitPlanHandler}>Add Plans</button>}
          </div>
          
          
        </div>

      </div>
    {getAllPlansData?.data?.plans?.length===0 && !input  && currentPage === 1?
          <div className='no_plan_img_outer d-flex justify-content-center'>
         <img src={no_plan_img} className='no_plan_img'/>
          </div> : 
      <div className='table-responsive plan_tabular_data'>
    
      <table className='table_plan table'>
        <thead>
          <tr>
          <th>
          
          <div className='d-flex align-items-center gap-4'>
             <h6> PLAN NAME</h6>
             <div className='up_down_arrow_outer cursor-pointer'>
             <IoIosArrowUp  title='Ascending order' onClick={()=>{
              setSortOrder("asc");setFieldName("PLAN NAME");
              dispatch(getAllPlanActions({currentPage,limit,searchPlan,sortOrder,fieldName}))

            } }
              
              />
             <IoIosArrowDown  title='Decending order'  onClick={()=>{
              setSortOrder("desc");setFieldName("PLAN NAME");
              dispatch(getAllPlanActions({currentPage,limit,searchPlan,sortOrder,fieldName}))
              }}/>

             </div>
              
              </div>
           
          </th>
          <th>
         
              <div className='d-flex align-items-center gap-4'>
             <h6 className=''> PLAN ADDRESS</h6>
             <div className='up_down_arrow_outer cursor-pointer'>
             <IoIosArrowUp title='Ascending order' onClick={()=>{setSortOrder("asc");setFieldName("PLAN ADDRESS");
                 dispatch(getAllPlanActions({currentPage,limit,searchPlan,sortOrder,fieldName}))
             }}/>
             <IoIosArrowDown title='Decending order' onClick={()=>{setSortOrder("desc");setFieldName("PLAN ADDRESS");
               dispatch(getAllPlanActions({currentPage,limit,searchPlan,sortOrder,fieldName}))
             }}/>

             </div>
              </div>
            
          </th>
          <th>
         
              <div className='d-flex align-items-center gap-4'>
             <h6>STATUS</h6>
             <div className='up_down_arrow_outer cursor-pointer'>
             <IoIosArrowUp title='Ascending order' onClick={()=>{setSortOrder("asc");setFieldName("STATUS");
              dispatch(getAllPlanActions({currentPage,limit,searchPlan,sortOrder,fieldName}))

             }}/>
             <IoIosArrowDown  title='Decending order' onClick={()=>{setSortOrder("desc");setFieldName("STATUS");
               dispatch(getAllPlanActions({currentPage,limit,searchPlan,sortOrder,fieldName}))
             }}/>

             </div>
              </div>
           
          </th>
          <th>
       
              <div className='d-flex align-items-center gap-4 justify-content-end'>
      
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
      input && getAllPlansData?.data?.plans?.length==0?

    <tr>
 <td colSpan="4" className='plan_doesnotexist_heading' style={{ textAlign: 'center' }}>
      The plan you are looking for does not exist
    </td>
    </tr>
      
     :
          getAllPlansData?.data?.plans?.map((data,i)=>{
            return(
              <tr key={i}>
              <td>{capitalLiseString(data.planName)}</td>
              <td>{data.planAddress}</td>
              <td><span className={`cmn_status_text ${data.status==="active"? " active_btn":"inactive_btn"}`}>{data.status===false? "Inactive":"Active"}</span></td>
              <td>
                <div className='d-flex gap-3 justify-content-end actions_wrapper '>
                <img title='View plan' className='cursor-pointer' onClick={() => {navigate("/report",{state:{planId:data?._id,isNotFound:false}})}} src={left_right_icon} alt='left_right_icon' height="20px" width="20px"/>
                <FaRegTrashAlt title='Delete Plan' onClick={()=>{showDeletePlanModalHandler(data._id)}} className=' trash-icon'/>
                {/* <BsThreeDotsVertical /> */}
  
                </div>
              </td>
              
            </tr>
            )
          }) 
          
        
          }
         

        </tbody>
      </table>

      </div>}
      {/* pagination */}
      <Pagination pageCount={getAllPlansData?.data?.totalPages} handlePageClick={handlePageClick} totalCount={getAllPlansData?.data?.totalCount} currentPage={currentPage}/>
      {showDeletePlanModal && <DeletePlanModal show={showDeletePlanModal} setShow={setShowDeletePlanModal} deleteHandler={deletePlanHandler}/>}
    </div>

     </div>
     
    </div>
        
  )
}

export default Dashboard