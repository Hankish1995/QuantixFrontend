import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const forgotPasswordAction=createAsyncThunk("forgotPasswordAction",async(email,thunkAPI)=>{
 
    try {
        const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const raw = JSON.stringify({
      "email": email,
    });
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    
    
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/forgetPassword`, requestOptions)
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
const forgot_password_slice=createSlice({
    name:"forgotPasswordSlice",
    initialState:initialState,
    
    reducers:{
        clear_forgotpassword_slice:()=>{
           return initialState
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(forgotPasswordAction.pending,(state)=>{
       state.isLoading=true
        })
        builder.addCase(forgotPasswordAction.fulfilled,(state,action)=>{
            state.isLoading=false
            state.data=action.payload
            state.isSuccess=true
        })
        builder.addCase(forgotPasswordAction.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.error=action.payload
        })
    }
})



export const {clear_forgotpassword_slice} = forgot_password_slice.actions
export default forgot_password_slice.reducer