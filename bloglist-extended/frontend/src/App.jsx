import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// styles
import { Container, Typography } from "@mui/material";

// import React Router
import { Navigate, Route, Routes, useMatch } from "react-router-dom";

// import components
import LoginForm from "./components/LoginForm";
import Blogs from "./components/Blogs";
import Users from "./components/Users";
import Menu from "./components/Menu";
import User from "./components/User";
import Blog from "./components/Blog";
import Notification from "./components/Notification";

// import reducers
import { initializeUser } from "./reducers/userReducer";
import { initializeBlogs } from "./reducers/blogReducer";

const App = () => {
  const dispatch = useDispatch();

  const loggedUser = useSelector((state) => state.user); // current logged in user

  const users = useSelector((state) => state.users); // users list
  const blogs = useSelector((state) => state.blogs); // blogs list

  // Auto login user if exists in local storage
  useEffect(() => {
    dispatch(initializeUser());
    dispatch(initializeBlogs());
  }, [dispatch]);

  // get user matched with url param id for User page
  const userMatch = useMatch("/users/:id");
  const matchedUser = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null;

  // get blog matched with url param id for Blog page
  const blogMatch = useMatch("/blogs/:id");
  const matchedBlog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null;

  return (
    <Container>
      <Menu user={loggedUser} />

      <Typography variant="h2" align="center" sx={{ mt: 10, mb: 2 }}>
        Blog App
      </Typography>

      <Notification />

      <Routes>
        <Route path="/" element={<Blogs blogs={blogs} />} />
        <Route
          path="/login"
          element={
            loggedUser ? <Navigate replace to="/" /> : <LoginForm />
          }
        />
        <Route
          path="/users"
          element={
            loggedUser ? (
              <Users users={users} />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route path="/users/:id" element={<User user={matchedUser} />} />
        <Route
          path="/blogs/:id"
          element={<Blog blog={matchedBlog} loggedUser={loggedUser} />}
        />
      </Routes>
    </Container>
  );
};

export default App;
