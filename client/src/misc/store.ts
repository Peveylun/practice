import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../reducers/authReducer.ts';
import {thunk} from "redux-thunk";

const store = configureStore({
    reducer: authReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(thunk)
});

export default store;