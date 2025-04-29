import React from "react";
import { Box, Typography, Grid, useTheme } from "@mui/material";
import AboutImage from "../../assets/about_image.png";

const AboutPage = () => {

  const theme = useTheme();

  return (
    <Box sx={{ ml: { xs: 2, sm: "10%" }, mr: { xs: 2, sm: "8%" }, pr: { xs: 0, md: "10px" } }}>
      <Typography variant="h5" align="center" color="gray" pt={12}>
        ABOUT <span style={{ fontWeight: "bold", color: theme.palette.mode === "dark" ? "#92a6c5" : "#374151", }}>US</span>
      </Typography>

      <Grid container spacing={4} my={5} alignItems="center">
        <Grid item xs={12} md={4}>
          <img
            src={AboutImage}
            alt="About Us"
            style={{ width: "100%", maxWidth: 360 }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Box display="flex" flexDirection="column" gap={2} color="gray">
            <Typography variant="body1">
              Welcome to CareConnect, your trusted partner in managing your
              healthcare needs conveniently and efficiently. At CareConnect, we
              understand the challenges individuals face when it comes to
              scheduling doctor appointments and managing their health records.
            </Typography>
            <Typography variant="body1">
              CareConnect is committed to excellence in healthcare technology.
              We continuously strive to enhance our platform, integrating the
              latest advancements to improve user experience and deliver
              superior service. Whether you're booking your first appointment or
              managing ongoing care, CareConnect is here to support you every
              step of the way.
            </Typography>
            <Typography variant="h6" fontWeight="bold" sx={{ color: theme.palette.mode === "dark" ? "white" : "black", }}>
              Our Vision
            </Typography>
            <Typography variant="body1">
              Our vision at CareConnect is to create a seamless healthcare
              experience for every user. We aim to bridge the gap between
              patients and healthcare providers, making it easier for you to
              access the care you need, when you need it.
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Typography variant="h6" my={3}>
        WHY
        <span style={{ color: theme.palette.mode === "dark" ? "#92a6c5" : "#374151", fontWeight: "bold" }}>CHOOSE US</span>
      </Typography>

      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} mb={5}>
        {[
          {
            title: "EFFICIENCY:",
            text: "Streamlined appointment scheduling that fits into your busy lifestyle.",
          },
          {
            title: "CONVENIENCE:",
            text: "Access to a network of trusted healthcare professionals in your area.",
          },
          {
            title: "PERSONALIZATION:",
            text: "Tailored recommendations and reminders to help you stay on top of your health.",
          },
        ].map((feature, index) => (
          <Box
            key={index}
            elevation={2}
            sx={{
              border: ".5px solid #ccc",
              px: { xs: 4, md: 8 },
              py: { xs: 4, sm: 8 },
              display: "flex",
              flexDirection: "column",
              fontSize: "15px",
              color: "text.secondary",
              cursor: "pointer",
              transition: "all 0.3s",
              "&:hover": {
                bgcolor: "#5f6fff",
                color: "white",
              },
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold">
              {feature.title}
            </Typography>
            <Typography variant="body2">{feature.text}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AboutPage;
