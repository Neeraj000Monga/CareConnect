import React, { useState } from "react";
import { FaUserMd, FaUser } from "react-icons/fa";
import { Box, Typography, Paper, useTheme } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

const Container = styled(Box)({
  height: "70vh",
  display: "flex",
  marginTop: '10px',
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
});

const TextContainer = styled(Box)({
  width: "100%",
  maxWidth: 350,
  textAlign: "left",
});

const RoleCard = styled(Paper)(({ selected, theme }) => ({
  gap: "12px",
  width: "100%",
  padding: "20px",
  display: "flex",
  cursor: "pointer",
  borderRadius: "8px",
  alignItems: "center",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  border: selected ? "2px solid #f2f3ff" : "2px solid #ccc",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.03)",
    backgroundColor: theme.palette.mode === "dark" ? "#242323" : "#f2f3ff"
  },
}));

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate()
  const theme = useTheme();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    localStorage.setItem("userRole", role);
    navigate('/login')
  };

  return (
    <Container>
      {/* Left-aligned text in center */}
      <TextContainer>
        <Typography variant="h4" fontWeight="bold" mb={1} sx={{ color: theme.palette.mode === "dark" ? "#00888e" : "#374151" }}>
          Hello!
        </Typography>
        <Typography variant="h6" color="textPrimary" mb={1}>
          Are you a Doctor or a Patient?
        </Typography>
      </TextContainer>

      {/* Centered role selection cards */}
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        width="100%"
        maxWidth={350}
        alignItems="center"
      >
        <RoleCard
          selected={selectedRole === "patient"}
          onClick={() => handleRoleSelect("patient")}
        >
          <FaUser size={24} color="#4F6EF7" />
          <Typography variant="h6" color="textPrimary">
            Patient
          </Typography>
        </RoleCard>

        <RoleCard
          selected={selectedRole === "doctor"}
          onClick={() => handleRoleSelect("doctor")}
        >
          <FaUserMd size={24} color="#4F6EF7" />
          <Typography variant="h6" color="textPrimary">
            Doctor
          </Typography>
        </RoleCard>
      </Box>
    </Container>
  );
};

export default RoleSelection;
