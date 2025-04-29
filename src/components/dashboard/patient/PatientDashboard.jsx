import React from "react";
import SpecialityMenu from "./SpecialityMenu";
import RigthSideProfile from "../../common/RigthSideProfile";
import { Box, Typography, Divider, Grid, Stack } from "@mui/material";
import LatestAppointment from "../../common/LatestAppointment";
import PatientHealth from "../../../assets/healthy_image-removebg-preview.png";
import { useSelector } from "react-redux";
import {Heading} from "../../../style/Typography";


const PatientDashboard = () => {
  const profile = useSelector((state) => state.profile.user);

  const currentDate = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Box sx={{ mt: 5 }}>
      <Grid container>
        <Grid item xs={12} sm={8}>
          <Box
            sx={{
              my: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
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
                You have <b style={{ color: "red" }}>{profile?.
                  myappointments?.length || 0} Appointment</b> today!
              </Typography>
              <Typography color="gray">
                Remember to check documentation before the call.
              </Typography>
            </Box>
            <img src={PatientHealth} alt="health" width={180} height={120} />
          </Box>

          <Stack sx={{ justifyContent: "center" }}>
            <SpecialityMenu />
          </Stack>

          <LatestAppointment />
        </Grid>
        <Grid item xs={12} sm={4}>
          <RigthSideProfile />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PatientDashboard;
