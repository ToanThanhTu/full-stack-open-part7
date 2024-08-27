import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Button, Toolbar } from "@mui/material";

import { logout } from "../reducers/userReducer";

const Menu = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const padding = {
    padding: 5,
  };

  return (
    <AppBar
      position="fixed"
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          users
        </Button>
        {user ? (
          <>
            {user.name} logged in
            <Button color="inherit" onClick={handleLogout}>
              logout
            </Button>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Menu;
