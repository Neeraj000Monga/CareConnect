import React from "react";
import { Box, Typography, Button, Divider, Grid, Avatar } from "@mui/material";
import ProfilePic from "../../../assets/profile_pic.png";

const patientData = {
  personalInfo: {
    firstName: "Vishal",
    lastName: "Rajput",
    dob: "12-09-1998",
    gender: "Male",
    contact: "+1 123 456 7890",
    email: "vishal@gmail.com",
  },

  addressInfo: {
    state: "Haryana",
    city: "Faridabad",
    zipcode: "121001",
    emergencyContact: "+1 987 654 3210",
    currentAddress: "Sgm Nager NIT, Faridabad",
    permanentAddress: "Sector 15, Faridabad",
  },
  
  medicalHistory: {
    weight: "70 kg",
    height: "174 cm",
    bloodGroup: "B+",
    allergies: "None",
  },
  accountInfo: {
    image: ProfilePic,
    username: "vishal_sharma",
    termsAccepted: true,
  },
};

const DetailsPage = () => {

  return (
    <Box mt={10} >
      <Box display="flex" flexDirection="column" gap={3} mt={1}>
        <Box display="flex" flexDirection="column">
          <Avatar
            src={patientData.accountInfo.image}
            alt={patientData.personalInfo.firstName}
            sx={{ width: 144, height: 144, borderRadius: 2 }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h4" fontWeight={500} color="#262626" mt={2}>
              {patientData.personalInfo.firstName}
              {patientData.personalInfo.lastName}
            </Typography>
            <Box mt={2} textAlign="center">
              <Button
                variant="outlined"
                sx={{
                  px: 4,
                  py: 1,
                  borderRadius: 10,
                  borderColor: "primary.main",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "primary.main",
                    color: "white",
                  },
                }}
              >
               Remove
              </Button>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ bgcolor: "#ADADAD", height: 1 }} />

        <Grid container spacing={3}>
          <Grid item xs={4}>
            {/* Contact Information */}
            <Typography
              color="gray"
              fontWeight={500}
              sx={{ textDecoration: "underline" }}
            >
              CONTACT INFORMATION
            </Typography>
            <Grid container spacing={1} mt={2} color="#363636">
              <Grid item xs={6} fontWeight={600}>
                Email:
              </Grid>
              <Grid item xs={6} color="gray">
                {patientData.personalInfo.email}
              </Grid>
              <Grid item xs={6} fontWeight={600}>
                Phone:
              </Grid>
              <Grid item xs={6} color="gray">
                {patientData.personalInfo.contact}
              </Grid>
              <Grid item xs={6} fontWeight={600}>
                Emergency:
              </Grid>
              <Grid item xs={6} color="gray">
                {patientData.addressInfo.emergencyContact}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            {/* Basic Information */}
            <Typography
              color="gray"
              fontWeight={500}
              sx={{ textDecoration: "underline" }}
            >
              BASIC INFORMATION
            </Typography>
            <Grid container spacing={1} mt={2} color="gray">
              <Grid item xs={6} fontWeight={600}>
                Gender:
              </Grid>
              <Grid item xs={6}>
                {patientData.personalInfo.gender}
              </Grid>
              <Grid item xs={6} fontWeight={600}>
                Birthdate:
              </Grid>
              <Grid item xs={6}>
                {patientData.personalInfo.dob}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Typography
              color="gray"
              fontWeight={500}
              sx={{ textDecoration: "underline" }}
            >
              ACCOUNT INFORMATION
            </Typography>
            <Grid container spacing={1} mt={2} color="gray">
              <Grid item xs={6} fontWeight={600}>
                Username:
              </Grid>
              <Grid item xs={6}>
                {patientData.accountInfo.username}
              </Grid>
              <Grid item xs={6} fontWeight={600}>
                Terms Accepted:
              </Grid>
              <Grid
                item
                xs={6}
                color={patientData.accountInfo.termsAccepted ? "green" : "red"}
              >
                {patientData.accountInfo.termsAccepted ? "Yes" : "No"}
              </Grid>
            </Grid>
          </Grid>
        </Grid>


        {/* Content Section: Two Columns */}
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Typography
              color="gray"
              fontWeight={500}
              sx={{ textDecoration: "underline" }}
            >
              MEDICAL HISTORY
            </Typography>
            <Grid container spacing={1} mt={2} color="gray">
              <Grid item xs={6} fontWeight={600}>
                Weight:
              </Grid>
              <Grid item xs={6}>
                {patientData.medicalHistory.weight}
              </Grid>
              <Grid item xs={6} fontWeight={600}>
                Height:
              </Grid>
              <Grid item xs={6}>
                {patientData.medicalHistory.height}
              </Grid>
              <Grid item xs={6} fontWeight={600}>
                Blood Group:
              </Grid>
              <Grid item xs={6}>
                {patientData.medicalHistory.bloodGroup}
              </Grid>
              <Grid item xs={6} fontWeight={600}>
                Allergies:
              </Grid>
              <Grid item xs={6}>
                {patientData.medicalHistory.allergies}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            {/* Address Information */}
            <Typography
              color="gray"
              fontWeight={500}
              sx={{ textDecoration: "underline" }}
            >
              ADDRESS INFORMATION
            </Typography>
            <Grid container spacing={1} mt={2} color="#363636">
              <Grid item xs={6} fontWeight={600}>
                State:
              </Grid>
              <Grid item xs={6}>
                {patientData.addressInfo.state}
              </Grid>
              <Grid item xs={6} fontWeight={600}>
                City:
              </Grid>
              <Grid item xs={6}>
                {patientData.addressInfo.city}
              </Grid>
              <Grid item xs={6} fontWeight={600}>
                Zipcode:
              </Grid>
              <Grid item xs={6}>
                {patientData.addressInfo.zipcode}
              </Grid>
              <Grid item xs={6} fontWeight={600}>
                Current Address:
              </Grid>
              <Grid item xs={6}>
                {patientData.addressInfo.currentAddress}
              </Grid>
              <Grid item xs={6} fontWeight={600}>
                Permanent Address:
              </Grid>
              <Grid item xs={6}>
                {patientData.addressInfo.permanentAddress}
              </Grid>
            </Grid>
          </Grid>
          
        </Grid>
        {/* Edit Button */}
      </Box>
      <Box mt={5}>
        <Divider />
      </Box>
    </Box>
  );
};

export default DetailsPage;
