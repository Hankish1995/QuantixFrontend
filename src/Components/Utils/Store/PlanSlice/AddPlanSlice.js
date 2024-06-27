import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  isSuccess: false,
  loading: false,
  error: null,
  isError: false,
};

// Async Thunk Action Creator
export const addPlanActions = createAsyncThunk(
  'plans/addPlan',
  async ({ planName, planAddress, planImg }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${token}`);

      const formData = new FormData();
      formData.append('planName', planName);
      formData.append('planAddress', planAddress);
      if (planImg.length > 0) {
        formData.append('planImg', planImg[0]);
      }

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formData,
        redirect: "follow"
      };

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/addPlans`, requestOptions);

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message);
      }

      const data = await response.text(); // Assuming response is JSON
      return data; // This will be dispatched to Redux store
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Redux Slice
const addPlanSlice = createSlice({
  name: "addPlanSlice",
  initialState,
  reducers: {
    clear_add_plan_slice: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPlanActions.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPlanActions.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.data = action.payload;
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
export const { clear_add_plan_slice } = addPlanSlice.actions;
export default addPlanSlice.reducer;
