import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  isSuccess: false,
  loading: false,
  error: null,
  isError: false,
};

export const loginActions=createAsyncThunk("loginActions",async({email,password},thunkAPI)=>{
try {
    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
 
  "usernameOrEmail": email,
  "password": password
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};


const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/signIn`, requestOptions)
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


export const login_slice = createSlice({
  name: "login_slice",
  initialState: initialState,
  reducers: {
    clear_login_slice : () => {
        return initialState
    }
  },
  extraReducers : (builder) => {
    builder
    .addCase(loginActions.pending,(state) => {
        state.loading = true
    })
    .addCase(loginActions.fulfilled,(state,action) => {
        state.data = action.payload
        state.isSuccess = true
        state.loading = false
        state.isError = false
    })
    .addCase(loginActions.rejected,(state,action) => {
        state.error = action.payload
        state.isError = true
        state.loading = false
        state.isSuccess = false
    })
  }
});
   export const {clear_login_slice} = login_slice.actions
export default login_slice.reducer
