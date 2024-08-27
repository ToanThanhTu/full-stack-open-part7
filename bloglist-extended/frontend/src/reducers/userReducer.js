import { createSlice } from "@reduxjs/toolkit";

import blogService from "../services/blogs";
import loginService from "../services/login";

import { setNotification } from "./notificationReducer";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    // store user in redux
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

// initialize user if exists in local storage
export const initializeUser = () => {
  return (dispatch) => {
    const loggedUser = window.localStorage.getItem("loggedBlogappUser");

    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      blogService.setToken(user.token);
      dispatch(setUser(user));
    } else {
      dispatch(setUser(null));
    }
  };
};

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const loggedUser = await loginService.login({ username, password });

      // set user data in local storage
      window.localStorage.setItem(
        "loggedBlogappUser",
        JSON.stringify(loggedUser),
      );

      dispatch(setUser(loggedUser));
      blogService.setToken(loggedUser.token);
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, "error", 5));
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(setUser(null));
  };
};

export default userSlice.reducer;
