import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState={
        data: {},
        isSuccess: false,
        loading: false,
        error: null,
        isError: false,
}
// add plan actions

export const deletePlanActions=createAsyncThunk("deletePlanActions",async(id,thunkAPI)=>{

    try {
    const myHeaders = new Headers();
    const token = localStorage.getItem("token")
    myHeaders.append("Authorization", `Bearer ${token}`);
    
    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow"
    };
    
    
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/deletePlan?planId=${id}`, requestOptions)
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


const deletePlanSlice=createSlice({
    name:"deletePlanSlice",
    initialState:initialState,
    reducers: {
       clear_delete_plan_slice : () => {
            return initialState
        }
      },
    extraReducers:(builder)=>{
    builder.addCase(deletePlanActions.pending,(state)=>{
     state.loading=true
    }).addCase(deletePlanActions.fulfilled,(state,action)=>{
        state.loading=false
        state.isSuccess=true
        state.data=action.payload
    })
    .addCase(deletePlanActions.rejected,(state,action)=>{
        state.loading=false
        state.isSuccess=false
        state.isError=true
        state.error=action.payload
    })
    }
})
export const {clear_delete_plan_slice}=deletePlanSlice.actions
export default deletePlanSlice.reducer