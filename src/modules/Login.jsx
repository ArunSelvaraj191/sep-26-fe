import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }))
  }

  const handleSignIn = async () => {
    console.log("userDetails :", userDetails)
    await axios.post(`${API_URL}/auth/login`, userDetails).then((response) => {
      console.log("response :", response)
      if (response.status == 200) {
        alert(response.data.message);
        localStorage.setItem("username",response.data.user.username)
        navigate("/dashboard")
      }
    }).catch((error)=>{
      console.log("Error =>",error)
      alert("User Invalid")
    })

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
        <h2>Login</h2>
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
   
      <Button
       sx={{ mt: 2 }}
        variant="outlined"
        onClick={() => navigate("/register")}
      >
        Sign up
      </Button>
         <Button  sx={{ mt: 2, ml: 2 }}  variant="contained" onClick={handleSignIn}>
        Sign In
      </Button>
    </div>
  );
};

export default Login;
