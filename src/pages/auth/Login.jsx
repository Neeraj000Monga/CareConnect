import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmail,
  setPassword,
  clearError,
  loginUser,
} from "../../redux/loginSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Login() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const { email, password, error, user, loading } = useSelector(
    (state) => state.login
  );



  useEffect(() => {
    if (user) {
      const userRole = localStorage.getItem("userRole");
      if (userRole === "admin") {
        navigate("/admin/dashboard");
      } else if (userRole === "doctor") {
        navigate("/doctor/dashboard");
      } else {
        navigate("/patient/dashboard");
      }
    }
  }, [user, navigate]);

  const handleLogin = () => {
    dispatch(clearError());
    dispatch(loginUser({ email, password }));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin();
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
        <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: theme.palette.mode === "dark" ? "#00888e" : "#374151" }}>
          Login
        </Typography>

        <Typography variant="body1" color="textSecondary" gutterBottom>
          Enter your email and password to access your account.
        </Typography>

        {error && <Typography color="error.main">{error}</Typography>}

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
            onChange={(e) => dispatch(setEmail(e.target.value))}
            onKeyDown={handleKeyDown}
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
            onChange={(e) => dispatch(setPassword(e.target.value))}
            onKeyDown={handleKeyDown}
            required
          />

        </Box>
        <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              width: "200px",
              color: "#fff",
              background: "#000",
              "&:hover": { backgroundColor: "#000000e0" },
            }}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

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
