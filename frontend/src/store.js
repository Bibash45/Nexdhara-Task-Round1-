import {
    configureStore
} from "@reduxjs/toolkit";
import {
    apiSlice
} from "./redux/apiSlice";
import authSliceReducer from "./redux/authSlice"


const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSliceReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default store;