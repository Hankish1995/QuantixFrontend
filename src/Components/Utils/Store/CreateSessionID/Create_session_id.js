import { createSlice } from "@reduxjs/toolkit";

export const create_session_id = createSlice({
    name: "create_session_id",
    initialState: {
        session_id: null
    },
    reducers: {
        createSessionId: (state, action) => {
            state.session_id = action.payload
            return state
        }
    }
})
export const { createSessionId } = create_session_id?.actions
export default create_session_id.reducer