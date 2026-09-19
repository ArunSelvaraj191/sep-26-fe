import { Box, Button, TextField } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
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
        <h2>Register</h2>
      </Box>
      <Box sx={{ mt: 2 }}>
        <TextField
          variant="standard"
          label="Username"
          placeholder="Enter your username"
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <TextField
          variant="standard"
          label="Email"
          placeholder="Enter your email"
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <TextField variant="standard" label="Password" />
      </Box>
      <Box sx={{ mt: 2 }}>
        <TextField variant="standard" label="Confirn Password" />
      </Box>
      <Button sx={{ mt: 2 }} variant="contained">
        Sign up
      </Button>
      <Button
        sx={{ mt: 2, ml: 2 }}
        variant="outlined"
        onClick={() => navigate("/")}
      >
        Sign in
      </Button>
    </div>
  );
};

export default Register;
