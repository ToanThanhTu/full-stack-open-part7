import { useDispatch } from "react-redux";
import { Button, TextField, Typography } from "@mui/material";

import { login } from "../reducers/userReducer";

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    dispatch(login(username, password));

    event.target.password.value = "";
    event.target.username.value = "";
  };

  return (
    <div>
      <Typography variant="h4" align="center" sx={{ m: 2 }}>
        Log in to application
      </Typography>

      <form onSubmit={handleLogin}>
        <TextField
          id="username"
          data-testid="username"
          type="text"
          name="username"
          label="Username"
          fullWidth
          margin="normal"
        />
        <TextField
          id="password"
          data-testid="password"
          type="password"
          name="password"
          label="Password"
          fullWidth
          margin="normal"
        />
        <Button id="login-button" type="submit" fullWidth sx={{ my: 1 }}>
          login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
