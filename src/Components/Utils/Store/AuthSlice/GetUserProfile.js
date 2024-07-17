import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const get_logged_in_user_profile = createAsyncThunk("get_logged_in_user_profile", async (thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/getUserProfile`, requestOptions)
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

export const getLoggedInUserProfile = createSlice({
    name: "getLoggedInUserProfile",
    initialState: {
        data: {},
        isSuccess: false,
        isError: false,
        isLoading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_logged_in_user_profile.pending, (state) => {
                state.isLoading = true
            })
            .addCase(get_logged_in_user_profile.fulfilled, (state, action) => {
                state.data = action.payload
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(get_logged_in_user_profile.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.error = action.payload
            })
    }
})

export default getLoggedInUserProfile.reducer