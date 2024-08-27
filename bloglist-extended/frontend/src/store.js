import { configureStore } from "@reduxjs/toolkit";

// reducers
import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";
import notificationReducer from "./reducers/notificationReducer";
import userListReducer from "./reducers/userListReducer";

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: userReducer,
    notification: notificationReducer,
    users: userListReducer,
  },
});

export default store;
