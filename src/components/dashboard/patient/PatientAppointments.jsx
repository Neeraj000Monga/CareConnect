import React from "react";
import doc1 from "../../../assets/doc1.png";
import doc2 from "../../../assets/doc2.png";
import {
  Box,
  Typography,
  Grid,
  Button,
  CardContent,
} from "@mui/material";

const doctors = [
  {
    _id: "doc1",
    name: "Dr. Richard James",
    image: doc1,
    speciality: "General physician",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 50,
    address: {
      line1: "17th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc2",
    name: "Dr. Emily Larson",
    image: doc2,
    speciality: "Gynecologist",
    degree: "MBBS",
    experience: "3 Years",
    about:
      "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 60,
    address: {
      line1: "27th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
];

const PatientAppointments = () => {
  return (
    <Box ml={2}>
    <Typography
      variant="h5"
      fontWeight="bold"
      color="grey.700"
      borderBottom={1}
      pb={3}
      mt={12}
    >
      My Appointments
    </Typography>
    <Box>
      {doctors.map((item, index) => (
        <Grid
          container
          key={index}
          spacing={2}
          py={1}
          borderBottom={1}
          alignItems="center"
        >
          {/* Doctor Image */}
          <Grid item xs={12} sm={3} md={2}>
            <img
              src={item.image}
              alt="Doctor"
              style={{
                backgroundColor: "indigo.50",
                borderRadius: 2,
                width: "200px", // Adjust image width
                height: "200px", // Keep square shape
              }}
            />
          </Grid>
  
          {/* Doctor Details */}
          <Grid item xs={12} sm={6} md={7}>
            <CardContent sx={{ textAlign: "left", color: "grey.700" }}>
              <Typography variant="h6" fontWeight={600} color="#262626">
                {item.name}
              </Typography>
              <Typography variant="body2">{item.speciality}</Typography>
              <Typography fontWeight={500} color="grey.800" mt={1}>
                Address:
              </Typography>
              <Typography variant="body2">{item.address.line1}</Typography>
              <Typography variant="body2">{item.address.line2}</Typography>
              <Typography mt={1}>
                <Typography
                  component="span"
                  fontWeight={500}
                  color="grey.800"
                >
                  Date & Time:
                </Typography>{" "}
                {item.dateTime}
              </Typography>
            </CardContent>
          </Grid>
  
          {/* Action Buttons */}
          <Grid
            item
            xs={12}
            sm={3}
            md={3}
            display="flex"
            flexDirection="column"
            gap={1}
            textAlign="center"
          >
            <Button
              variant="outlined"
              sx={{
                minWidth: 180,
                py: 1,
                color: "#696969",
                textTransform: "none",
                borderColor: "#696969",
                "&:hover": { backgroundColor: "#007BFF", color: "white",borderColor:'#007BFF' },
              }}
            >
              Pay Online
            </Button>
            <Button
              variant="outlined"
              sx={{
                minWidth: 180,
                py: 1,
                color: "#696969",
                textTransform: "none",
                borderColor: "#696969",
                "&:hover": { backgroundColor: "#DC3545", color: "white",borderColor:'#DC3545' },
              }}
            >
              Cancel Appointment
            </Button>
          </Grid>
        </Grid>
      ))}
    </Box>
  </Box>
  
  );
};

export default PatientAppointments;
