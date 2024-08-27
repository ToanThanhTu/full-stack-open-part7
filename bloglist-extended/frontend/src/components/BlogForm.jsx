import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { Button, TextField, Typography } from "@mui/material";

const BlogForm = () => {
  const dispatch = useDispatch();

  const addBlog = (event) => {
    event.preventDefault();

    const title = event.target.title.value;
    const author = event.target.author.value;
    const url = event.target.url.value;

    event.target.title.value = "";
    event.target.author.value = "";
    event.target.url.value = "";

    dispatch(createBlog({ title, author, url }));
  };

  return (
    <div>
      <Typography variant="h5" align="center" sx={{ m: 1 }}>Create new</Typography>

      <form onSubmit={addBlog}>
        <TextField
          id="title"
          data-testid="title"
          name="title"
          className="title-input"
          label="Title"
          fullWidth
          size="small"
          margin="dense"
        />
        <TextField
          id="author"
          data-testid="author"
          name="author"
          className="author-input"
          label="Author"
          fullWidth
          size="small"
          margin="dense"
        />
        <TextField
          id="url"
          data-testid="url"
          type="url"
          name="url"
          className="url-input"
          label="Url"
          fullWidth
          size="small"
          margin="dense"
        />
        <Button type="submit" className="create-button" fullWidth>
          create
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;
