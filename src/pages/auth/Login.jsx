import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(""); // Reset error message

    try {
      // Fetch both Patient & Doctor lists
      const patientsRes = await axios.get(
        "https://67d826719d5e3a10152d9ddf.mockapi.io/CareConnect/Patient"
      );
      const doctorsRes = await axios.get(
        "https://67d826719d5e3a10152d9ddf.mockapi.io/CareConnect/Doctor"
      );

      const patients = patientsRes.data;
      const doctors = doctorsRes.data;

      // Find user in patients list
      let user =
        patients.find((u) => u.email === email && u.password === password) ||
        doctors.find((u) => u.email === email && u.password === password); 

      if (user) {
        console.log("Logged-in User:", user); // Debugging log

        const userRole = localStorage.getItem("userRole");

        // Redirect based on role
        if (userRole === "admin") {
          navigate("/admin/dashboard");
        } else if (userRole === "doctor") {
          navigate("/doctor/dashboard");
        } else {
          navigate("/patient/dashboard");
        }
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Error logging in. Please try again.");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "85vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 3,
          width: "100%",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" fontWeight="bold" color="#5e5e5e" gutterBottom>
          Login
        </Typography>

        <Typography variant="body1" color="textSecondary" gutterBottom>
          Enter your email and password to access your account.
        </Typography>

        {/* Error Message */}
        {error && <Typography color="error.main">{error}</Typography>}

        {/* Form Inputs */}
        <Box component="form" sx={{ mt: 2, textAlign: "left" }}>
          <Typography variant="body2" fontWeight="bold" sx={{ mb: 0.5 }}>
            Email
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            margin="dense"
            size="small"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Typography variant="body2" fontWeight="bold" sx={{ mt: 2, mb: 0.5 }}>
            Password
          </Typography>
          <TextField
            fullWidth
            type="password"
            variant="outlined"
            margin="dense"
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Login Button */}
          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              bgcolor: "#4F6EF7",
              color: "white",
              fontWeight: "bold",
              "&:hover": { bgcolor: "#4F6EF7" },
            }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Box>

        {/* Signup Option */}
        <Typography variant="body2" sx={{ mt: 2 }} color="textSecondary">
          Don't have an account?
          <Button
            sx={{
              padding: 0,
              minWidth: "auto",
              textTransform: "none",
              fontWeight: "bold",
              color: "#4F6EF7",
              "&:hover": {
                backgroundColor: "transparent",
                textDecoration: "underline",
              },
            }}
            onClick={() => navigate("/register")}
          >
            Signup
          </Button>
        </Typography>
      </Paper>
    </Container>
  );
}

export default Login;
