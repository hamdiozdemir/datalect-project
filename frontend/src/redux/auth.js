
import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        access: localStorage.getItem('access'),
        refresh: localStorage.getItem('refresh'),
        isAuthenticated: null,
        user: null
    },
    reducers : {
        loginSuccess: (state, action) => {
            localStorage.setItem('access', action.payload.access);
            state.isAuthenticated = true;
            state.access = action.payload.access;
            state.refresh = action.payload.refresh;
        },

        loginFail: (state, action) => {
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            state.isAuthenticated=false;
            state.access=null;
            state.refresh=null;

        },
        userLoadedSuccess: (state, action) => {
            state.user = action.payload
        },
        userLoadedFail: (state) => {
            state.user = null;
        }
        
    }
});

export const { loginSuccess, loginFail, userLoadedSuccess, userLoadedFail } = authSlice.actions;

export default authSlice.reducer;