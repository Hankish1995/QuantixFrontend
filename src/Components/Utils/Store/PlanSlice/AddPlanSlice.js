import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Initial State
const initialState = {
  data: "",
  isSuccess: false,
  loading: false,
  error: null,
  isError: false,
  responseLoader: false,
};

// Async Thunk Action Creator
export const addPlanActions = createAsyncThunk(
  "plans/addPlan",
  async ({ planName, planAddress, planImg }, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const formData = new FormData();
      formData.append("planName", planName);
      formData.append("planAddress", planAddress);
      formData.append("planImage", planImg[0]);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formData,
        redirect: "follow",
      };

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/addPlans`,
        requestOptions
      );

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message);
      }

      const responseData = await response.text(); // Read entire response as text
      console.log("data---",responseData)
      // Dispatch final data or success state
      dispatch(updateStreamData(responseData));

      return "Streaming Completed";
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Redux Slice
const addPlanSlice = createSlice({
  name: "addPlanSlice",
  initialState,
  reducers: {
    clear_add_plan_slice: () => initialState,
    updateStreamData: (state, action) => {
      state.data = action.payload; // Update state with the final streamed data
      state.loading = false;
      state.isSuccess = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPlanActions.pending, (state) => {
        state.loading = true;
        state.responseLoader = true;
      })
      .addCase(addPlanActions.fulfilled, (state) => {
        state.loading = false;
        state.isSuccess = true;
        state.responseLoader = false;
      })
      .addCase(addPlanActions.rejected, (state, action) => {
        state.loading = false;
        state.isSuccess = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

// Export Actions and Reducer
export const { clear_add_plan_slice, updateStreamData } = addPlanSlice.actions;
export default addPlanSlice.reducer;
