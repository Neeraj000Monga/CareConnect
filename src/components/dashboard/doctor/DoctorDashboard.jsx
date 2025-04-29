import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import stethoscope from "../../../assets/Stethoscope.webp";
import RigthSideProfile from "../../common/RigthSideProfile";
import LatestAppointment from "../../common/LatestAppointment";
import { useSelector } from "react-redux";
import { Heading } from "../../../style/Typography";

const DoctorDashboard = () => {
  const profile = useSelector((state) => state.profile.user);

  const currentDate = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Box sx={{ mt: 8 }}>
      <Grid container>
        <Grid item xs={12} sm={8}>
          {/* Top Section */}
          <Box
            sx={{
              mb: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Heading>
              Dashboard
            </Heading>
            <Typography color="text.secondary" fontWeight="600">
              {currentDate}
            </Typography>
          </Box>

          <Divider />

          {/* Welcome Section */}
          <Box
            sx={(theme) => ({
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              margin: "0px 10px",
              justifyContent: "space-between",
              [theme.breakpoints.down("sm")]: {
                flexDirection: "column-reverse",
                margin: "0px",
              },
            })}
          >
            <Box>
              <Stack flexDirection="row" gap={1}>
                <Typography variant="h5" fontWeight="bold" color="primary.dark">
                  Welcome to CareConnect,
                </Typography>
                <Typography variant="h5" fontWeight="bold"> {profile?.name}! 👋</Typography>
              </Stack>
              <Typography color="text.secondary">
                You have <b style={{ color: "red" }}>{profile?.appointments?.length || 0} Patients</b> remaining
                today!
              </Typography>
              <Typography color="gray">
                Remember to check documentation before the call.
              </Typography>
            </Box>
            <img src={stethoscope} alt="health" width={180} height={120} style={{ margin: "10px 0px" }} />
          </Box>

          <Box></Box>
          <LatestAppointment />
        </Grid>
        <Grid item xs={12} sm={4}>
          <RigthSideProfile />
        </Grid>
      </Grid>
    </Box >
  );
};

export default DoctorDashboard;
