import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const verifyOtpAction=createAsyncThunk("verifyOtpAction",async({email,otp},thunkAPI)=>{

    try {
        const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const raw = JSON.stringify({
      "email": email,
      "otp":otp
    });
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    
    
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/verifyOTP`, requestOptions)
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
   const initialState= {
        data:{},
        isError:false,
        isSuccess:false,
        isLoading:false,
        error: null,
    }
const verify_otp_slice=createSlice({
    name:"verify_otp_slice",
    initialState:initialState,
    
    reducers:{
        clear_verifyotp_slice:(state)=>{
            state.data = {}
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.error = null
            return state
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(verifyOtpAction.pending,(state)=>{
       state.isLoading=true
        })
        builder.addCase(verifyOtpAction.fulfilled,(state,action)=>{
            state.isLoading=false
            state.data=action.payload
            state.isSuccess=true
        })
        builder.addCase(verifyOtpAction.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.error=action.payload
        })
    }
})



export const {clear_verifyotp_slice} = verify_otp_slice.actions
export default verify_otp_slice.reducer