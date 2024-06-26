import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState={
        data: {},
        isSuccess: false,
        loading: false,
        error: null,
        isError: false,
}
// add plan actions

export const addPlanActions=createAsyncThunk("addPlanActions",async({planName,planAddress,planImg},thunkAPI)=>{
   
    try {
        const myHeaders = new Headers();

    const token = localStorage.getItem("token")
    myHeaders.append("Authorization", `Bearer ${token}`);
    
    const formdata = new FormData();
formdata.append("planName", planName);
formdata.append("planAddress", planAddress);
if(planImg.length>0){
    formdata.append("planImg",planImg[0])

}

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow"
    };
    
    
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/addPlans`, requestOptions)
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


const addPlanSlice=createSlice({
    name:"addPlanSlice",
    initialState:initialState,
    reducers: {
        clear_add_plan_slice : () => {
            return initialState
        }
      },
    extraReducers:(builder)=>{
    builder.addCase(addPlanActions.pending,(state)=>{
     state.loading=true
    }).addCase(addPlanActions.fulfilled,(state,action)=>{
        state.loading=false
        state.isSuccess=true
        state.data=action.payload
    })
    .addCase(addPlanActions.rejected,(state,action)=>{
        state.loading=false
        state.isSuccess=false
        state.isError=true
        state.error=action.payload
    })
    }
})
export const {clear_add_plan_slice}=addPlanSlice.actions
export default addPlanSlice.reducer