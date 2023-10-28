import { useDispatch } from "react-redux";
import { loginFail, loginSuccess, userLoadedFail, userLoadedSuccess } from "../redux/auth";

import axios from 'axios';


export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAIL = 'LOAD_USER_FAIL';


export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config =  {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        };
        console.log(config.Authorization);
        console.log("Here");
        
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config);

            dispatch(userLoadedSuccess(res.data));
        } catch (err) {
            console.log(err.message);
            dispatch(userLoadedFail());
        }
    } else {
        dispatch(userLoadedFail());
    }
};

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config)

        dispatch(loginSuccess(res.data));
        dispatch(load_user());

    } catch (err) {
        dispatch(loginFail())
    }
}