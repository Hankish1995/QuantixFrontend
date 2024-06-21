import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  isSuccess: false,
  loading: false,
  error: null,
  isError: false,
};

export const SignupActions=createAsyncThunk("SignupActions",async({username,email,password},thunkAPI)=>{
try {
    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "username": username,
  "email": email,
  "password": password
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};


const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/signUp`, requestOptions)
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


export const signUp_slice = createSlice({
  name: "signUp_slice",
  initialState: initialState,
  reducers: {
    clear_signUp_slice : () => {
        return initialState
    }
  },
  extraReducers : (builder) => {
    builder
    .addCase(SignupActions.pending,(state) => {
        state.loading = true
    })
    .addCase(SignupActions.fulfilled,(state,action) => {
        state.data = action.payload
        state.isSuccess = true
        state.loading = false
    })
    .addCase(SignupActions.rejected,(state,action) => {
        state.error = action.payload
        state.isError = true
        state.loading = false
        state.isSuccess = false
    })
  }
});
export const {clear_signUp_slice} = signUp_slice.actions             
export default signUp_slice.reducer
