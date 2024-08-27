import { useDispatch } from "react-redux";
import { addComment, deleteBlog, likeBlog } from "../reducers/blogReducer";
import { useNavigate } from "react-router-dom";
import { Button, Link, TextField, Typography } from "@mui/material";

const Blog = ({ blog, loggedUser }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const removeBlog = (blog) => {
    dispatch(deleteBlog(blog));
    navigate("/");
  };

  const comment = (event) => {
    event.preventDefault();

    const comment = event.target.comment.value;

    dispatch(addComment(blog, comment));
  };

  const margin = {
    my: 1,
  };

  if (!blog) {
    return null;
  }

  return (
    <div>
      <Typography variant="h4" sx={margin}>
        {blog.title} - {blog.author}
      </Typography>

      <Link href={blog.url} target="_blank">
        {blog.url}
      </Link>

      <Typography variant="subtitle1" sx={margin}>
        {blog.likes} likes
        <Button
          size="small"
          variant="outlined"
          sx={{ mx: 1 }}
          onClick={() => dispatch(likeBlog(blog))}
        >
          like
        </Button>
      </Typography>

      <Typography variant="subtitle1">added by {blog.user.name}</Typography>

      {loggedUser ? (
        loggedUser.username === blog.user.username ? (
          <Button onClick={() => removeBlog(blog)}>remove</Button>
        ) : null
      ) : null}

      <div>
        <Typography variant="h6" sx={margin}>
          Comments
        </Typography>

        <form onSubmit={comment}>
          <TextField
            id="title"
            type="text"
            name="comment"
            label="comment"
            size="small"
            margin="dense"
          />

          <Button variant="outlined" type="submit" sx={{ m: 1.1 }}>
            add comment
          </Button>
        </form>

        {blog.comments ? (
          <ul>
            {blog.comments.map((comment, index) => (
              <li key={index}>{comment.content}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default Blog;
