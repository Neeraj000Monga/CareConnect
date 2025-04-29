import { Box, Card, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import HomePage from "./pages/LandingPage/HomePage";
import AboutPage from "./pages/LandingPage/AboutPage";
import ContactPage from "./pages/LandingPage/ContactPage";
import RoleSelection from "./pages/auth/RoleSelection";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Footer from "./components/common/Footer";
import DashboardLayout from "./layouts/DashboardLayout";
import { Provider } from "react-redux";
import store from "./redux/store";
import Apruble from "./components/dashboard/doctor/Apruble";
import { useEffect, useState } from "react";

function App() {
  const getUserRole = () => localStorage.getItem("userRole");
  const userRole = getUserRole();
  const location = useLocation();
  const isDashboard =
    location.pathname.startsWith("/patient") ||
    location.pathname.startsWith("/doctor") ||
    location.pathname.startsWith("/admin");


  const [mode, setMode] = useState(() => {
    const storedMode = localStorage.getItem("mode");
    return storedMode === "true";
  });

  console.log("mode", mode)

  const hadleToggleSwitch = () => {
    if (!mode) {
      setMode(true)
    } else (setMode(false))
  }

  useEffect(() => {
    localStorage.setItem("mode", mode.toString());
  }, [mode]);


  const theme = createTheme({
    palette: {
      mode: !mode ? "light" : "dark",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CssBaseline />
        {!isDashboard && <Navbar hadleToggleSwitch={hadleToggleSwitch} />}
        <Card sx={{ minHeight: "47.5vh", background: mode ? "#000" : "#fff" }}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/roleSelection" element={<RoleSelection />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/apruble" element={<Apruble />} />

            {/* Protected Dashboard Routes */}
            {userRole === "patient" && (
              <Route
                path="/patient/*"
                element={<DashboardLayout hadleToggleSwitch={hadleToggleSwitch} role="patient" />}
              />
            )}
            {userRole === "doctor" && (
              <Route
                path="/doctor/*"
                element={<DashboardLayout hadleToggleSwitch={hadleToggleSwitch} role="doctor" />}
              />
            )}
            {userRole === "admin" && (
              <Route
                path="/admin/*"
                element={<DashboardLayout role="admin" hadleToggleSwitch={hadleToggleSwitch} />}
              />
            )}
          </Routes>
        </Card>
        <Box sx={{ ml: { xs: "0px", md: isDashboard ? "200px" : "0px" } }}>
          <Footer />
        </Box>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
