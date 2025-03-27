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
import { FaUserMd, FaCalendarDay, FaCalendarCheck, FaUsers } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import {  MdAssignmentTurnedIn, MdDashboard } from "react-icons/md";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AppBar, Button, Container, Toolbar } from "@mui/material";
// import logo from "../images/CareConnectLogoApp.png";
import CareConnectLogo from '../../assets/CareConnectLogo.png'
import { RiFileList3Fill } from "react-icons/ri";

const drawerWidth = 200;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: "#fff", // Matching navbar
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
  backgroundColor: "#fff", // Matching navbar
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

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const [open, setOpen] = useState(isLgUp);
  const location = useLocation();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("patient");

  useEffect(() => {
    const role = localStorage.getItem("userRole") || "patient";
    setUserRole(role);
  }, []);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

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
      {
        name: "Settability",
        icon: <AccountCircleIcon size={20} />,
        path: "/patient/Settability",
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
    ],
   admin: [
    {
      name: "Doctors Approval",
      icon: <MdAssignmentTurnedIn  size={20} />,
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
    setOpen(!open);
    toggleSidebar(!open);
  };

  return (
    <Box>
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
            <Box component="img" src={CareConnectLogo} alt="CareConnect Logo" sx={{  width: 200 ,marginLeft:'22px' }} />
            {/* <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                src={logo}
                style={{ height: "60px", width: "auto" }}
                alt="CareConnectLogo"
              />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color: "#000b6d",
                }}
                mr={2}
              >
                CareConnect
              </Typography>
            </Box> */}

            {/* Buttons (Login) */}
            <Box sx={{ display: "flex", gap: "12px" }}>
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
                onClick={() => navigate("/")}
              >
                Logout
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {/* Toggle Button */}
      <Box sx={{ position: "fixed", left: "2px", zIndex: 9999, top: "12px" }}>
        <IconButton sx={{ color: "#000" }} onClick={handleDrawerToggle}>
          {open ? <ChevronLeftIcon sx={{ fontSize: "28px" }} /> : <MenuIcon />}
        </IconButton>
      </Box>

      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          "& .MuiDrawer-paper": {
            zIndex: 0,
            top: "66px",
            height: "90vh",
            display: "flex",
            background: "#fff",
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
                  borderRight:
                    location.pathname === item.path
                      ? "4px solid #2F54EB"
                      : "none",
                  justifyContent: open ? "initial" : "center",
                  color: location.pathname === item.path ? "#000b6d" : "#000",
                  backgroundColor:
                    location.pathname === item.path ? "#eaecfb" : "transparent",
                  "&:hover": { backgroundColor: "#e2e5ff" },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    color: location.pathname === item.path ? "#000b6d" : "#000",
                    justifyContent: "center",
                    mr: open ? 2 : "auto",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={{
                    opacity: open ? 1 : 0,
                    color: location.pathname === item.path ? "#000b6d" : "#000",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
