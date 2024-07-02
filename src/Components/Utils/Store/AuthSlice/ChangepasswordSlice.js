

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState={
        data: {},
        isSuccess: false,
        loading: false,
        error: null,
        isError: false,
}
// add plan actions

export const changePasswordActions=createAsyncThunk("changePasswordActions",async({id,password,newPassword,confirmPassword},thunkAPI)=>{

    try {
    const myHeaders = new Headers();
    const token = localStorage.getItem("token")
   
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
 
        "id":id,
        "password":password,
        "newPassword":newPassword,
        "confirmPassword":confirmPassword
      });
    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      redirect: "follow",
      body:raw
    };
    
    
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/changePassword`, requestOptions)
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


const changePasswordSlice=createSlice({
    name:"changePasswordSlice",
    initialState:initialState,
    reducers: {
       clear_changepassword_slice : () => {
            return initialState
        }
      },
    extraReducers:(builder)=>{
    builder.addCase(changePasswordActions.pending,(state)=>{
     state.loading=true
    }).addCase(changePasswordActions.fulfilled,(state,action)=>{
        state.loading=false
        state.isSuccess=true
        state.data=action.payload
    })
    .addCase(changePasswordActions.rejected,(state,action)=>{
        state.loading=false
        state.isSuccess=false
        state.isError=true
        state.error=action.payload
    })
    }
})
export const {clear_changepassword_slice}=changePasswordSlice.actions
export default changePasswordSlice.reducer