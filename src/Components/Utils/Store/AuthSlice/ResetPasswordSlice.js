import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState={
    data:{},
    error:null,
    isLoading:false,
    isSuccess:false,
    isError:false
}


export const resetPasswordAction=createAsyncThunk("resetPasswordAction",async({email,password,confirmPassword},thunkAPI)=>{
   
    try {
        const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const raw = JSON.stringify({
        "email": email,
        "password": password,
        "confirmPassword": confirmPassword,
    });
    
    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    
    
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/resetPassword`, requestOptions)
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

const reset_password_slice=createSlice({
initialState:initialState,
name:"reset_password_slice",
reducers:{
    clear_reset_password_slice : () => {
        return initialState
    }
},
extraReducers:(builder)=>{
builder.addCase(resetPasswordAction.pending,(state)=>{
    state.isLoading=true
})
.addCase(resetPasswordAction.fulfilled,(state,action)=>{
    state.isLoading=false
    state.isSuccess=true
    state.data=action.payload
})
.addCase(resetPasswordAction.rejected,(state,action)=>{
    state.isLoading=false
    state.isSuccess=false
    state.isError=true
    state.error=action.payload
})
}
})

export default reset_password_slice.reducer
export const {clear_reset_password_slice} = reset_password_slice.actions
