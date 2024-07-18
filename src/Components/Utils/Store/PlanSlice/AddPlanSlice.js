import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  data: "",
  isSuccess: false,
  loading: false,
  error: null,
  isError: false,
  responseLoader: false,
};

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
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/executePlan`,
        requestOptions
      );

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const decodedValue = decoder.decode(value, { stream: true });
        dispatch(updateStreamData(decodedValue));
      }
      return "Streaming Completed";
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const addPlanSlice = createSlice({
  name: "addPlanSlice",
  initialState,
  reducers: {
    clear_add_plan_slice: (state) => {
      state.data = "";
      state.isSuccess = false;
      state.loading = false;
      state.error = null;
      state.isError = false;
      state.responseLoader = false;
      return state;
    },
    updateStreamData: (state, action) => {
      state.data += action.payload;
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

export const { clear_add_plan_slice, updateStreamData } = addPlanSlice.actions;
export default addPlanSlice.reducer;