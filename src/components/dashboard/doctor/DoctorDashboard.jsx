import { Box, Divider, Typography } from "@mui/material";
import stethoscope from "../../../assets/Stethoscope.webp";
import RigthSideProfile from "../../common/RigthSideProfile";
import LatestAppointment from "../../common/LatestAppointment";

const DoctorDashboard = () => {
  return (
    <Box
      sx={{ maxWidth: "1400px", mx: "auto", display: "flex", gap: 3, mt: 10 }}
    >
      {/* Left Section */}
      <Box sx={{ flex: 1 }}>
        {/* Top Section */}
        <Box
          sx={{
            mb: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" fontWeight="bold" color="#616161">
            Dashboard
          </Typography>
          <Typography color="text.secondary" fontWeight="600">
            Friday, 28 Feb, 2025
          </Typography>
        </Box>

        <Divider />

        {/* Welcome Section */}
        <Box
          sx={{
            p: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",

            borderRadius: 2,
          }}
        >
          <Box>
            <Typography variant="h5" fontWeight="bold" color="primary.dark">
              Welcome to CareConnect, Neeraj Monga! 👋
            </Typography>
            <Typography color="text.secondary">
              You have <b style={{ color: "red" }}>7 Patients</b> remaining
              today!
            </Typography>
            <Typography color="gray">
              Remember to check documentation before the call.
            </Typography>
          </Box>
          <img src={stethoscope} alt="health" width={180} height={120} />
        </Box>

        <Box></Box>
        <LatestAppointment />
      </Box>

      {/* Right Section - Profile Card */}
      <Box sx={{ width: "320px", position: "sticky", top: 24 }}>
        <RigthSideProfile />
      </Box>
    </Box>
  );
};

export default DoctorDashboard;
