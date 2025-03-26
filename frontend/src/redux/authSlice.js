import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie"; 

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  access_token: Cookies.get("access_token") ? Cookies.get("access_token") : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));

      const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 1 day
      localStorage.setItem("expirationTime", expirationTime);
    },
    setCookie: (state, action) => {
      state.access_token = action.payload;
      Cookies.set("access_token", action.payload, { expires: 1 }); // expires in 1 day
    },
    logout: (state) => {
      state.userInfo = null;
      state.access_token = null;
      localStorage.clear();
      Cookies.remove("access_token");
    },
  },
});

export const { setCredentials, setCookie, logout } = authSlice.actions;
export default authSlice.reducer;
