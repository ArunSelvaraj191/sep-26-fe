import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const Register = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: ""
  });
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("")

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }))
  }

        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

const validatePassword = (pwd) => {
  return regex.test(pwd);
}

validatePassword(userDetails.password);

  const handleSignup = async () => {
    if (!userDetails.username || !userDetails.email || !userDetails.password || !userDetails.cpassword) {
      setError(true);
      setErrorMsg("All fields are required");
    }
    else if (userDetails.password != userDetails.cpassword) {
      setError(true);
      setErrorMsg("Password doesn't match");
    }else if(!validatePassword(userDetails.password)){
       setError(true);
      setErrorMsg("Password must be in the this example Abc@123");
    }
    else {
      setError(false);
      const payload = {
        username: userDetails.username,
        email: userDetails.email,
        password: userDetails.password
      }
      const response = await axios.post(`${API_URL}/auth/register`, payload);
      if (response.status == 200 || response.status == 201) {
        alert(response.data.message);
        if (response.status == 201) {
          setUserDetails({
            username: "",
            email: "",
            password: "",
            cpassword: ""
          })
          navigate("/")
        }
      }
    }
  }

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
          required
          variant="outlined"
          label="Username"
          placeholder="Enter your username"
          name="username"
          value={userDetails.username}
          onChange={handleChange}
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <TextField
          required
          name="email"
          value={userDetails.email}
          variant="outlined"
          label="Email"
          placeholder="Enter your email"
          onChange={handleChange}
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <TextField required type="password" name="password" value={userDetails.password} variant="outlined" label="Password" onChange={handleChange} />
      </Box>
      <Box sx={{ mt: 2 }}>
        <TextField required type="password" name='cpassword' value={userDetails.cpassword} variant="outlined" label="Confirn Password" onChange={handleChange} />
      </Box>
      {error && <Typography variant="body1" color="error">{errorMsg}</Typography>}
      <Button sx={{ mt: 2 }} variant="contained" onClick={handleSignup}>
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
