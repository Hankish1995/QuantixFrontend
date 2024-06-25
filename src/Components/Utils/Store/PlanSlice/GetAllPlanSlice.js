import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState={
        data: {},
        isSuccess: false,
        loading: false,
        error: null,
        isError: false,
}
// add plan actions

export const getAllPlanActions=createAsyncThunk("getAllPlanActions",async({currentPage,limit,searchPlan},thunkAPI)=>{
    try {
    const myHeaders = new Headers();
    const token = localStorage.getItem("token")
    myHeaders.append("Authorization", `Bearer ${token}`);
    
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };
    
    
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/getAllPlans?page=${currentPage}&limit=${limit}&search=${searchPlan}`, requestOptions)
    if (!response.ok) {
        const errorMessage = await response.json();
        if (errorMessage) {
            throw new Error(errorMessage.message);
        }
    }
    const result = await response.json();
    return result;
    } catch (error) {
    return thunkAPI.rejectWithValue({
        message: error.message,
    });
    }
    })


const getAllPlanSlice=createSlice({
    name:"getAllPlanSlice",
    initialState:initialState,
    reducers: {
        clear_getall_plan_slice : () => {
            return initialState
        }
      },
    extraReducers:(builder)=>{
    builder.addCase(getAllPlanActions.pending,(state)=>{
     state.loading=true
    }).addCase(getAllPlanActions.fulfilled,(state,action)=>{
        state.loading=false
        state.isSuccess=true
        state.data=action.payload
    })
    .addCase(getAllPlanActions.rejected,(state,action)=>{
        state.loading=false
        state.isSuccess=false
        state.isError=true
        state.error=action.payload
    })
    }
})
export const {clear_getall_plan_slice}=getAllPlanSlice.actions
export default getAllPlanSlice.reducer