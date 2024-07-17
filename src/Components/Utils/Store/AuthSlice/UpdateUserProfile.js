import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const update_user_profile = createAsyncThunk("update_user_profile", async ({ email, profile }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));

        const formdata = new FormData();
        formdata.append("profile", profile);
        formdata.append("email", email);

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: formdata,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/updateProfile`, requestOptions)
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

export const updateUserProfile = createSlice({
    name: "updateUserProfile",
    initialState: {
        message: {},
        isError: false,
        isSuccess: false,
        isLoading: false,
        error: null
    },
    reducers: {
        clear_user_profile_state: (state) => {
            state.message = {}
            state.isError = false
            state.error = null
            state.isSuccess = false
            state.isLoading = false
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(update_user_profile.pending, (state) => {
                state.isLoading = true
            })
            .addCase(update_user_profile.fulfilled, (state, action) => {
                state.isSuccess = true
                state.message = action.payload
                state.isLoading = false
            })
            .addCase(update_user_profile.rejected, (state, action) => {
                state.isError = true
                state.error = action.payload
                state.isLoading = false
            })
    }
})

export const { clear_user_profile_state } = updateUserProfile.actions
export default updateUserProfile.reducer