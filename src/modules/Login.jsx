import { Box, Button, TextField } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("Register component mounted");
    return () => {
      console.log("Register component unmounted");
    };
  }, []);
  return (
    <div>
      <Box sx={{ mt: 2 }}>
        <h2>Login</h2>
      </Box>
      <Box sx={{ mt: 2 }}>
        <TextField
          variant="outlined"
          label="Email"
          placeholder="Enter your email"
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <TextField variant="outlined" label="Password" />
      </Box>
      <Button sx={{ mt: 2 }} variant="contained">
        Sign In
      </Button>
      <Button
        sx={{ mt: 2, ml: 2 }}
        variant="outlined"
        onClick={() => navigate("/register")}
      >
        Sign up
      </Button>
    </div>
  );
};

export default Login;
