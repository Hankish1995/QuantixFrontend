import React, { useEffect, useState } from 'react'
import "./dashboard.css"
import { FaRegTrashAlt } from "react-icons/fa";
import left_right_icon from "../Images/left-right-icon.svg"
import { useDispatch, useSelector } from 'react-redux';
import { getAllPlanActions } from '../Utils/Store/PlanSlice/GetAllPlanSlice';
import { clear_delete_plan_slice, deletePlanActions } from '../Utils/Store/PlanSlice/DeletePlanSlice';
import Loader from '../CommonComponents/Loader';
import { toast } from 'react-toastify';
import Pagination from '../Pagination/Pagination';
import { useNavigate } from 'react-router';
import { capitalLiseString } from '../Utils/CommonUtils';
import DeletePlanModal from '../Modal/DeletePlan';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Dashboard = () => {
  const getAllPlansData = useSelector((store) => { return store.GET_ALL_PLAN_SLLICE })
  console.log(getAllPlansData, "this is the al plan sT")
  const deletePlanData = useSelector((store) => { return store.DELETE_PLAN_SLICE })
  const [currentPage, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(5)
  const [searchPlan, setSearchPlan] = useState("")
  const [sortOrder, setSortOrder] = useState("desc")
  const [fieldName, setFieldName] = useState("PLAN NAME")
  const [triggerDispatch, setTriggerDispatch] = useState(false);
  const [showDeletePlanModal, setShowDeletePlanModal] = useState(false)
  const [id, setId] = useState()
  const [input, setInput] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (deletePlanData.isError) {
      toast.error(deletePlanData?.error.message)
      dispatch(clear_delete_plan_slice())
    }
    if (deletePlanData.isSuccess) {
      toast.success(deletePlanData.data.message)
      dispatch(clear_delete_plan_slice())
      dispatch(getAllPlanActions({ currentPage, limit, searchPlan, sortOrder, fieldName }))
    }
  }, [deletePlanData, currentPage, limit, searchPlan, sortOrder, triggerDispatch, dispatch, fieldName])

  const deletePlanHandler = () => {
    dispatch(deletePlanActions(id))
    setShowDeletePlanModal(false)
  }

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1)
  };

  const selectHandler = (e) => {
    setLimit(e.target.value)
    setCurrentPage(1)
  }
  const submitPlanHandler = () => {
    navigate("/addPlan")
  }

  const showDeletePlanModalHandler = (id) => {
    setShowDeletePlanModal(true)
    setId(id)
  }

  useEffect(() => {
    dispatch(getAllPlanActions({ currentPage, limit, searchPlan, sortOrder, fieldName }))
  }, [fieldName, sortOrder, searchPlan, limit, currentPage, dispatch])

  return (
    <div className='dashboard_container cmn_container '>
      <div className=''>
        <h3 className='cmn_heading_style dashboard_plan_heading'>Dashboard Plans</h3>
        <div className='white_bg cmn_box-shadow pb-3'>
          <div className={`select_plan_outer ${getAllPlansData?.data?.plans?.length === 0 ? "justify-content-end" : ""}`}>
            <div className={`${getAllPlansData?.data?.plans?.length === 0 ? "d-none" : ""}`}>
              <select className='select_btn ' value={limit} onChange={(e) => selectHandler(e)}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </div>
            <div className='search_plan_wrapper d-flex gap-3'>
              <div className={`${getAllPlansData?.data?.plans?.length === 0 && !input ? "d-none" : ""}`}>
                <input value={searchPlan} onChange={(e) => {
                  setSearchPlan(e.target.value);
                  setInput(true)
                }} type='text' className='form-control Search_plans_input' placeholder='Search plans ' />
              </div>
              <div>
                {input && searchPlan != "" ? <button className='cmn_btn submit_plan_btn' onClick={() => {
                  setInput(false);
                  setSearchPlan("")
                  dispatch(getAllPlanActions({ currentPage, limit, searchPlan: "", sortOrder, fieldName }))
                }}>Clear Search</button> :
                  getAllPlansData?.data?.plans?.length !== 0 && <button className='cmn_btn submit_plan_btn' onClick={submitPlanHandler}>Add Plan</button>}
              </div>
            </div>
          </div>
          {getAllPlansData?.data?.plans?.length === 0 && !input && currentPage === 1 ?
            <div className='no_plan_img_outer d-flex justify-content-center'>
              {/* <img src={no_plan_img} className='no_plan_img' alt="pla" /> */}
              <h1 className='welcomne_text'>Welcome to Quanti, <u onClick={() => submitPlanHandler()} style={{ cursor: "pointer", color: "#7367F0" }}>‘Add Plan’</u> to get started</h1>
            </div> :
            <div className='table-responsive plan_tabular_data'>
              <table className='table_plan table'>
                <thead>
                  <tr>
                    <th>
                      <div className='d-flex align-items-center gap-4'>
                        <h6> PLAN NAME</h6>
                        <div className='up_down_arrow_outer cursor-pointer'>
                          <IoIosArrowUp title='Ascending order' onClick={() => {
                            setSortOrder("asc"); setFieldName("PLAN NAME")
                          }}
                          />
                          <IoIosArrowDown title='Decending order' onClick={() => {
                            setSortOrder("desc"); setFieldName("PLAN NAME")
                          }} />
                        </div>
                      </div>
                    </th>
                    <th>
                      <div className='d-flex align-items-center gap-4'>
                        <h6 className=''> PLAN ADDRESS</h6>
                        <div className='up_down_arrow_outer cursor-pointer'>
                          <IoIosArrowUp title='Ascending order' onClick={() => {
                            setSortOrder("asc"); setFieldName("PLAN ADDRESS")
                          }} />
                          <IoIosArrowDown title='Decending order' onClick={() => {
                            setSortOrder("desc"); setFieldName("PLAN ADDRESS")
                          }} />
                        </div>
                      </div>
                    </th>
                    <th>
                      <div className='d-flex align-items-center gap-4'>
                        <h6>STATUS</h6>
                        <div className='up_down_arrow_outer cursor-pointer'>
                          <IoIosArrowUp title='Ascending order' onClick={() => {
                            setSortOrder("asc"); setFieldName("STATUS")
                          }} />
                          <IoIosArrowDown title='Decending order' onClick={() => {
                            setSortOrder("desc"); setFieldName("STATUS")
                          }} />
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
                      input && getAllPlansData?.data?.plans?.length == 0 ?
                        <tr>
                          <td colSpan="4" className='plan_doesnotexist_heading' style={{ textAlign: 'center' }}>
                            The plan you are looking for does not exist
                          </td>
                        </tr>
                        :
                        getAllPlansData?.data?.plans?.map((data, i) => {
                          return (
                            <tr key={i}>
                              <td onClick={() => { navigate("/report", { state: { planId: data?._id, isNotFound: false } }) }}>{capitalLiseString(data.planName)}</td>
                              <td>{data.planAddress}</td>
                              <td><span className={`cmn_status_text ${data.status === "active" ? " active_btn" : "inactive_btn"}`}>{data.status === false ? "Inactive" : "Active"}</span></td>
                              <td>
                                <div className='d-flex gap-3 justify-content-end actions_wrapper '>
                                  <img title='View plan' className='cursor-pointer' onClick={() => { navigate("/report", { state: { planId: data?._id, isNotFound: false } }) }} src={left_right_icon} alt='left_right_icon' height="20px" width="20px" />
                                  <FaRegTrashAlt title='Delete Plan' onClick={() => { showDeletePlanModalHandler(data._id) }} className=' trash-icon' />
                                </div>
                              </td>
                            </tr>
                          )
                        })
                  }
                </tbody>
              </table>
            </div>}
          <Pagination pageCount={getAllPlansData?.data?.totalPages} handlePageClick={handlePageClick} totalCount={getAllPlansData?.data?.totalCount} currentPage={currentPage} />
          {showDeletePlanModal && <DeletePlanModal show={showDeletePlanModal} setShow={setShowDeletePlanModal} deleteHandler={deletePlanHandler} />}
        </div>
      </div>
    </div>
  )
}

export default Dashboard