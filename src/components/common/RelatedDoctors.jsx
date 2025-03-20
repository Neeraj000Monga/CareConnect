import React from "react";
import doc1 from "../../assets/doc1.png";
import doc2 from "../../assets/doc2.png";
import {
  Box,
  Typography,
  Card,
  CardMedia,
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
      "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
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
      "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 60,
    address: {
      line1: "27th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
];

const RelatedDoctors = () => {
  return (
    <Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
        mt={4}
        color="grey.900"
        mx={{ md: 10 }}
      >
        <Typography variant="h4" fontWeight={500}>
          Related Doctors
        </Typography>
        <Typography variant="body1" textAlign="center" width={{ sm: "50%" }}>
          Simply browse through our extensive list of trusted doctors.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "flex-start",
          marginTop:'15px'
        }}
      >
        {doctors.slice(0, 10).map((item, index) => (
          <Card
            sx={{
              width: "215px",
              border: "1px solid #c9d8ff",
              borderRadius: 2,
              overflow: "hidden",
              cursor: "pointer",
              transition: "transform 0.5s",
              "&:hover": { transform: "translateY(-10px)" },
            }}
            key={index}
          >
            <CardMedia
              component="img"
              image={item.image}
              alt=""
              sx={{ bgcolor: "#eaefff", height: "218px", width: "100%" }}
            />
            <CardContent>
              <Box
                display="flex"
                alignItems="center"
                gap={1}
                textAlign="center"
                color="#22c55e"
              >
                <Box
                  width={8}
                  height={8}
                  bgcolor="#22c55e"
                  borderRadius="50%"
                />
                <Typography variant="body2">Available</Typography>
              </Box>
              <Typography variant="h6" fontWeight="medium" color="text.primary">
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.speciality}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default RelatedDoctors;
