import { List, ListItem, Typography } from "@mui/material";

const User = ({ user }) => {
  const margin = {
    my: 2,
  };

  if (!user) {
    return null;
  }

  return (
    <div>
      <Typography variant="h4" sx={margin}>{user.name}</Typography>

      <Typography variant="h5" sx={margin}>Added blogs:</Typography>

      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
