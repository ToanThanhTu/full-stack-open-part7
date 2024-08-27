import { createSlice, current } from "@reduxjs/toolkit";

import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload;

      return state.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog,
      );
    },
    removeBlog(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
  },
});

export const { appendBlog, setBlogs, updateBlog, removeBlog } =
  blogSlice.actions;

// initialize blogs from server
export const initializeBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll();
      dispatch(setBlogs(blogs));
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, "error", 5));
    }
  };
};

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blogObject);
      dispatch(appendBlog(newBlog));
      dispatch(
        setNotification(
          `a new blog ${newBlog.title} by ${newBlog.author} added`,
          "info",
          5,
        ),
      );
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, "error", 5));
    }
  };
};

export const likeBlog = (blogObject) => {
  const likedBlog = {
    ...blogObject,
    likes: blogObject.likes + 1,
  };

  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(likedBlog);
      dispatch(updateBlog(updatedBlog));
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, "error", 5));
    }
  };
};

export const deleteBlog = (blogObject) => {
  window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}?`);
  return async (dispatch) => {
    try {
      await blogService.deleteBlog(blogObject.id);
      dispatch(removeBlog(blogObject.id));
      dispatch(
        setNotification(
          `blog ${blogObject.title} by ${blogObject.author} removed`,
          "info",
          5,
        ),
      );
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, "error", 5));
    }
  };
};

export const addComment = (blogObject, comment) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.comment(blogObject, comment);
      dispatch(updateBlog(updatedBlog));
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, "error", 5));
    }
  };
};

export default blogSlice.reducer;
