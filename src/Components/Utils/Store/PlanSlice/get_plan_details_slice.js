import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getPlanDetailsEstimates = createAsyncThunk(
  "getPlanDetailsEstimates",
  async ({ planId }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        const token = localStorage.getItem("token")
        myHeaders.append("Authorization", `Bearer ${token}`);

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/get_plan_details?planId=${planId}`, requestOptions)
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
});

export const get_plan_details_estimates = createSlice({
  name: "get_plan_details_estimates",
  initialState: {
    data: {},
    isError: false,
    isSuccess: false,
    loading: false,
    error: null,
  },
  reducers: {
    clear_plan_estimates: (state) => {
      state.data = {};
      state.isError = false;
      state.isSuccess = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPlanDetailsEstimates.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPlanDetailsEstimates.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isSuccess = true;
        state.loading = false;
      })
      .addCase(getPlanDetailsEstimates.rejected, (state, action) => {
        state.error = action.payload;
        state.isError = true;
        state.loading = false;
      });
  },
});
export const { clear_plan_estimates } = get_plan_details_estimates.actions;
export default get_plan_details_estimates.reducer;
