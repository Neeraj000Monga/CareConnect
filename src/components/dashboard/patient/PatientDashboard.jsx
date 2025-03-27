import { Box, Typography, Divider, Grid } from "@mui/material";
import PatientHealth from "../../../assets/healthy_image-removebg-preview.png";
import RigthSideProfile from "../../common/RigthSideProfile";
import LatestAppointment from "../../common/LatestAppointment";
import SpecialityMenu from "./SpecialityMenu";

const PatientDashboard = () => {
  return (
    <Box sx={{ mt: 10 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
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
                Welcome to CareConnect, Vishal! 👋
              </Typography>
              <Typography color="text.secondary">
                You have <b style={{ color: "red" }}>1 Appointment</b> today!
              </Typography>
              <Typography color="gray">
                Remember to check documentation before the call.
              </Typography>
            </Box>
            <img src={PatientHealth} alt="health" width={180} height={120} />
          </Box>

          <SpecialityMenu />
          <LatestAppointment />
        </Grid>
        <Grid item xs={4}>
          <RigthSideProfile />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PatientDashboard;
