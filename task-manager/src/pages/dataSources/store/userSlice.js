import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    firstName: '',
    lastName: '',
    username: ''
};

const userSlice = createSlice({
    initialState: initialState,
    name: "user",
    reducers: {
        loadUser: (state, action) => {
            const { payload } = action;

            state.firstName = payload.firstName;
            state.lastName = payload.lastName;
            state.username = payload.username;
        }
    }
});

export default userSlice.reducer;

export const { loadUser } = userSlice.actions;