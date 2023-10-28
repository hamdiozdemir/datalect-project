import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name: "sessionInfo",
    initialState: {
        isLoggedIn: true,
        userId: null,
        userName: null,
        userEmail: null,
    },
    reducers: {
        setUserInfo: (state, action) => {
            state.userId = action.payload.userId;
            state.userName = action.payload.userName;
            state.userEmail = action.payload.userEmail;
        },

        loggedInToggle: (state, action) => {
            state.isLoggedIn = !state.isLoggedIn;
            if (!state.isLoggedIn) {
                state.userId = null;
                state.userName = null;
                state.userEmail = null;
            } else {
                state.userId = action.payload.userId;
                state.userName = action.payload.userName;
                state.userEmail = action.payload.userEmail;
                console.log(action.payload);
            }
        }
    }
});


export const { setUserInfo, loggedInToggle } = counterSlice.actions

export default counterSlice.reducer;