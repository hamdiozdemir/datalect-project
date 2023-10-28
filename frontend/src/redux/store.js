import { configureStore } from "@reduxjs/toolkit";
import globalVariablesReducer from "./globalVariables";
import authReducer from './auth';


export default configureStore({
    reducer: {
        globalVariables: globalVariablesReducer,
        auth: authReducer,
    }
});