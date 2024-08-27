import { useRef } from "react";

// components
import Notification from "./Notification";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";

// styles
import { Link } from "react-router-dom";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const Blogs = ({ blogs }) => {
  // use Ref hook to use toggleVisibility() from Togglable component
  const blogFormRef = useRef();

  return (
    <>
      <Typography variant="h4">
        Blogs
      </Typography>

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Blog name</strong>
              </TableCell>
              <TableCell>
                <strong>Author</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs
              .slice()
              .sort((a, b) => b.likes - a.likes) // Sort blogs based on Likes
              .map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </TableCell>
                  <TableCell>{blog.author}</TableCell>
                </TableRow>
              ))}
            <TableRow></TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Blogs;
