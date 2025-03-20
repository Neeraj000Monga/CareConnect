import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
// import logo from "../images/CareConnectLogoApp.png";
import CareConnectLogo from '../../assets/CareConnectLogo.png'

function NavBar() {
  const handleAdmin = () => {
    localStorage.setItem("userRole", "admin");
    window.location.href = "/login";
  };
  return (
    <AppBar
      sx={{
        background: "#fff",
        position: "fixed",
        boxShadow: "none",
        borderBottom: "1px solid #ddd",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          {/* Logo and Brand Name */}
          <Box component="img" src={CareConnectLogo} alt="CareConnect Logo" sx={{  width: 200 }} />
          {/* <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={logo}
              style={{ height: "35px", width: "auto" }}
              alt="CareConnectLogo"
            />
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#000b6d",
                ml: 1,
              }}
            >
              CareConnect
            </Typography>
          </Box> */}

          {/* Navigation Links */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "30px" }}>
            {["/", "/about", "/contact"].map((path, index) => {
              const labels = ["HOME", "ABOUT", "CONTACT"];
              return (
                <NavLink
                  key={path}
                  to={path}
                  style={({ isActive }) => ({
                    textDecoration: "none",
                    color: isActive ? "#000b6d" : "#000",
                    fontWeight: isActive ? "600" : "500",
                    fontSize: "14px",
                    padding: "10px 0",
                    position: "relative",
                    display: "inline-block",
                  })}
                >
                  {({ isActive }) => (
                    <>
                      {labels[index]}
                      {isActive && (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "80%",
                            height: "2px",
                            backgroundColor: "#4F6EF7",
                            position: "absolute",
                            bottom: "1px",
                            left: 2,
                            borderRadius: "2px",
                          }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}

            <Button
              variant="outlined"
              component={NavLink}
              to="/login"
              sx={{
                color: "#181c18",
                borderColor: "#181c18",
                borderRadius: "18px",
                fontSize: "12px",
                fontWeight: 600,
                padding: "6px 12px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#fff",
                  color: "#181c18",
                },
              }}
              onClick={handleAdmin}
            >
              Admin Panel
            </Button>
          </Box>

          {/* Buttons (Login) */}
          <Box sx={{ display: "flex", gap: "12px" }}>
            <Button
              component={NavLink}
              to="/roleSelection"
              variant="contained"
              sx={{
                backgroundColor: "#4F6EF7",
                color: "#fff",
                padding: "6px 16px",
                borderRadius: "20px",
                textTransform: "none",
                fontSize: "14px",
                "&:hover": {
                  backgroundColor: "#4058D3",
                },
              }}
            >
              Login Account
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
