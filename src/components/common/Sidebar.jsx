import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import MuiDrawer from "@mui/material/Drawer";
import { styled, useTheme } from "@mui/material/styles";
import ListItem from "@mui/material/ListItem";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import useMediaQuery from "@mui/material/useMediaQuery";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import {
  FaUsers,
  FaUserMd,
  FaCalendarDay,
  FaCalendarCheck,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { RiFileList3Fill } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import CareConnectLogo from "../../assets/CareConnectLogo.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AppBar, Button, Container, Toolbar } from "@mui/material";
import { MdAssignmentTurnedIn, MdDashboard } from "react-icons/md";
import ToggleSwitch from "../ToggleSwitch";
import { logout } from "../../redux/loginSlice";

const drawerWidth = 200;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: "#fff",
  color: "#000",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(7)} + 1px)`,
  },
  backgroundColor: "#fff",
  color: "#000",
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Sidebar = ({ isOpen, toggleSidebar, hadleToggleSwitch }) => {
  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("md"));
  const isMdDown = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = useState(isLgUp);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userRole, setUserRole] = useState("patient");

  useEffect(() => {
    const role = localStorage.getItem("userRole") || "patient";
    setUserRole(role);
  }, []);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (isMdDown) {
      toggleSidebar(false);
    }
  }, [isMdDown, toggleSidebar]);

  useEffect(() => {
    if (isLgUp) {
      toggleSidebar(true);
    }
  }, [isLgUp, toggleSidebar]);

  const menuItems = {
    patient: [
      {
        name: "Dashboard",
        icon: <MdDashboard size={20} />,
        path: "/patient/dashboard",
      },
      {
        name: "Available Doctors",
        icon: <FaUserMd size={20} />,
        path: "/patient/availableDoctors",
      },
      {
        name: "My Appointments",
        icon: <FaCalendarCheck size={20} />,
        path: "/patient/myAppointments",
      },
      {
        name: "Profile",
        icon: <AccountCircleIcon size={20} />,
        path: "/patient/profile",
      },
    ],
    doctor: [
      {
        name: "Dashboard",
        icon: <MdDashboard size={20} />,
        path: "/doctor/dashboard",
      },
      {
        name: "Appointments",
        icon: <FaCalendarDay size={20} />,
        path: "/doctor/myAppointments",
      },
      {
        name: "Settability",
        icon: <AccountCircleIcon size={20} />,
        path: "/doctor/Settability",
      },
    ],
    admin: [
      {
        name: "Doctors Approval",
        icon: <MdAssignmentTurnedIn size={20} />,
        path: "/admin/doctorsApproval",
      },
      {
        name: "Appointments",
        icon: <FaCalendarCheck size={20} />,
        path: "/admin/appointments",
      },
      {
        name: "Doctors List",
        icon: <RiFileList3Fill size={20} />,
        path: "/admin/doctorsLists",
      },
      {
        name: "Patient List",
        icon: <FaUsers size={20} />,
        path: "/admin/patientLists",
      },
    ],
  };

  const handleDrawerToggle = () => {
    const newState = !open;
    setOpen(newState);
    toggleSidebar(newState);
  };

  const handleLogout = () => {
    navigate("/");
    dispatch(logout());
  };

  return (
    <Box>
      {/* AppBar */}
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
            <Box
              component="img"
              src={CareConnectLogo}
              alt="CareConnect Logo"
              sx={{ width: 200, marginLeft: "22px" }}
            />
            <Box sx={{ display: "flex", gap: "30px" }}>
              <Button
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
                onClick={handleLogout}
              >
                Logout
              </Button>
              <ToggleSwitch hadleToggleSwitch={hadleToggleSwitch} />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {/* <NavBar /> */}

      {/* Toggle Icon */}
      {!isMdDown && (
        <Box sx={{ position: "fixed", left: "2px", zIndex: 9999, top: "12px" }}>
          <IconButton sx={{ color: "#000" }} onClick={handleDrawerToggle}>
            {open ? (
              <ChevronLeftIcon sx={{ fontSize: "28px", color: theme.palette.mode === "dark" ? "#fff" : "#000", }} />
            ) : (
              <MenuIcon sx={{ color: theme.palette.mode === "dark" ? "#fff" : "#000", }} />
            )}
          </IconButton>
        </Box>
      )}

      {/* Sidebar for md+ screens */}
      {!isMdDown && (
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            "& .MuiDrawer-paper": {
              zIndex: 0,
              top: "65px",
              height: "90vh",
              display: "flex",
              background: theme.palette.mode === "dark" ? "#212121" : "#fff",
              flexDirection: "column",
              justifyContent: "space-between",
            },
          }}
        >
          <List>
            {menuItems[userRole]?.map((item) => (
              <ListItem key={item.name} disablePadding>
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  sx={{
                    px: 2,
                    py: 1,
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    color: location.pathname === item.path ? "#000b6d" : "#000",
                    borderRight: location.pathname === item.path ? "4px solid #2F54EB" : "none",
                    backgroundColor: location.pathname === item.path ? (theme.palette.mode === "dark" ? "#525252" : "#eaecfb") : "transparent",
                    "&:hover": { backgroundColor: theme.palette.mode === "dark" ? " #464545" : "#e2e5ff" },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : "auto",
                      justifyContent: "center",
                      color: location.pathname === item.path ? "#4486ff" : theme.palette.mode === "dark" ? "#fff" : "#000",
                    }}

                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    sx={{
                      opacity: open ? 1 : 0,
                      color: location.pathname === item.path ? "#4486ff" : theme.palette.mode === "dark" ? "#fff" : "#000",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}

      {/* Bottom Navigation for mobile */}
      {isMdDown && (
        <BottomNavigation
          showLabels
          value={location.pathname}
          onChange={(event, newValue) => navigate(newValue)}
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            borderTop: "1px solid #ddd",
            zIndex: 1300,
            backgroundColor: "#fff",
          }}
        >
          {menuItems[userRole]?.map((item) => (
            <BottomNavigationAction
              key={item.name}
              label={item.name}
              value={item.path}
              icon={item.icon}
              sx={{
                color: location.pathname === item.path ? "#000b6d" : "#000",
              }}
            />
          ))}
        </BottomNavigation>
      )}
    </Box>
  );
};

export default Sidebar;