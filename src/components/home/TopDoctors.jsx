import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  CardMedia,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

const TopDoctors = () => {
  const theme = useTheme();
  const [doctors, setDoctors] = useState([]);
  const [doctorCount, setDoctorCount] = useState(6);

  console.log("doctors", doctors)

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(
          "https://67d826719d5e3a10152d9ddf.mockapi.io/CareConnect/Doctor"
        );
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleShowMore = () => {
    setDoctorCount((prev) => prev + 6);
  };

  return (
    <Stack mx={{ md: 5, gap: 4, alignItems: "center" }}>
      <Typography sx={{ fontSize: { xs: "37px", md: "3rem" } }} fontWeight="medium">
        Top Doctors to Book
      </Typography>
      <Typography textAlign="center" sx={{ width: { sm: "33%" } }} color="text.secondary">
        Simply browse through our extensive list of trusted doctors.
      </Typography>

      <Stack
        style={{
          gap: "30px",
          flexWrap: "wrap",
          paddingTop: "30px",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        {doctors.slice(0, doctorCount).map((item, index) => (
          <Box key={index} style={{ width: "260px", height: "310px" }}>
            <Stack>
              <Box style={{ position: "absolute", background: "#eaefff", borderRadius: "4px" }}>
                {item?.profilePic && (
                  <CardMedia
                    component="img"
                    image={item?.profilePic}
                    sx={{
                      width: "258px",
                      height: "240px",
                      borderRadius: "4px"
                    }}
                    alt={item?.name}
                  />
                )}
              </Box>
              <Box
                style={{
                  width: "260px",
                  display: "flex",
                  justifyContent: "center",
                  position: "relative",
                  top: "170px",
                }}
              >
                <Paper
                  style={{
                    justifyContent: "space-between",
                    border: "1px solid #d5d4d4",
                    flexDirection: "column",
                    height: "130px",
                    display: "flex",
                    padding: "10px",
                    width: "220px",
                  }}
                >
                  <Box>
                    <Box display="flex" alignItems="center" gap={1} textAlign="center" color="#22c55e">
                      <Box width={8} height={8} bgcolor="#22c55e" borderRadius="50%" />
                      <Typography variant="body2">Available</Typography>
                    </Box>
                    <Typography variant="h6" fontWeight="medium" color="text.primary">
                      {item?.name}
                    </Typography>
                    <Typography sx={{ fontSize: "14px", textTransform: "capitalize" }} color="text.secondary">
                      {item?.degree}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item?.specialization}
                    </Typography>
                  </Box>
                </Paper>
              </Box>
            </Stack>
          </Box>
        ))}
      </Stack>

      {doctorCount < doctors.length && (
        <Button
          variant="contained"
          onClick={handleShowMore}
          sx={{
            mt: 2,
            px: 6,
            py: 1.5,
            fontWeight: "600",
            borderRadius: "50px",
            textTransform: "none",
            color: "text.secondary",
            backgroundColor: theme.palette.mode === "dark" ? "#212121" : "#e8eced",
          }}
        >
          more
        </Button>
      )}
    </Stack>
  );
};

export default TopDoctors;
