import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import ToggleSwitch from "../../components/ToggleSwitch"
import CareConnectLogo from '../../assets/CareConnectLogo.png'
import { useTheme } from "@mui/material";

function NavBar({ hadleToggleSwitch }) {
  const theme = useTheme();
  const handleAdmin = () => {
    localStorage.setItem("userRole", "admin");
    window.location.href = "/login";
  };
  return (
    <AppBar
      sx={{
        position: "fixed",
        boxShadow: "none",
        background: theme.palette.mode === "dark" ? "#212121" : "#fff",
        borderBottom: theme.palette.mode === "dark" ? "1px solid #3c3b3b" : "1px solid #ddd"
      }}
    >
      <Container maxWidth="xl" sx={{ paddingRight: "0px !important", }}>
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          {/* Logo and Brand Name */}
          <Box component="img" src={CareConnectLogo} alt="CareConnect Logo" sx={{ width: 200 }} />

          <Box sx={{ display: "flex", alignItems: "center", gap: "30px" }}>
            {["/", "/about", "/contact"].map((path, index) => {
              const labels = ["HOME", "ABOUT", "CONTACT"];
              return (
                <NavLink
                  key={path}
                  to={path}
                  style={({ isActive }) => ({
                    textDecoration: "none",
                    color: isActive
                      ? theme.palette.mode === "dark"
                        ? "#192ff3"
                        : "#000b6d"
                      : theme.palette.mode === "dark"
                        ? "#fff"
                        : "#000",
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
                color: theme.palette.mode === "dark" ? "#fff" : "#181c18",
                borderColor: theme.palette.mode === "dark" ? "#fff" : "#181c18",
                borderRadius: "18px",
                fontSize: "12px",
                fontWeight: 600,
                padding: "6px 12px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: theme.palette.mode === "dark" ? "#181c18" : "#fff",
                },
              }}
              onClick={handleAdmin}
            >
              Admin Panel
            </Button>
          </Box>

          {/* Buttons (Login) */}
          <Box sx={{ display: "flex", gap: "22px" }}>
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
            <ToggleSwitch hadleToggleSwitch={hadleToggleSwitch} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
