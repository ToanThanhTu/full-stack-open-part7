import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: { message: null, type: null },
  reducers: {
    addNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return { message: null, type: null };
    },
  },
});

export const { addNotification, clearNotification } = notificationSlice.actions;

export const setNotification = (message, type, time) => {
  return (dispatch) => {
    dispatch(addNotification({ message, type }));
    setTimeout(() => {
      dispatch(clearNotification());
    }, time * 1000);
  };
};

export default notificationSlice.reducer;
