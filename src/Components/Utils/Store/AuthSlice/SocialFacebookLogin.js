import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  isSuccess: false,
  loading: false,
  error: null,
  isError: false,
};

export const socialLoginActions=createAsyncThunk("socialLoginActions",async({providerName,providerId,email},thunkAPI)=>{

  try {
    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
 
  "providerName":providerName,
  "providerId": providerId,
  "email": email,
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};


const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/socialLogin`, requestOptions)
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


export const socialLogin_slice = createSlice({
  name: "socialLogin_slice",
  initialState: initialState,
  reducers: {
    clear_sociallogin_slice : () => {
        return initialState
    }
  },
  extraReducers : (builder) => {
    builder
    .addCase(socialLoginActions.pending,(state) => {
        state.loading = true
    })
    .addCase(socialLoginActions.fulfilled,(state,action) => {
        state.data = action.payload
        state.isSuccess = true
        state.loading = false
        state.isError = false
    })
    .addCase(socialLoginActions.rejected,(state,action) => {
        state.error = action.payload
        state.isError = true
        state.loading = false
        state.isSuccess = false
    })
  }
});
   export const {clear_sociallogin_slice} = socialLogin_slice.actions
export default socialLogin_slice.reducer
