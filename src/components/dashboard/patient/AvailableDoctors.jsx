import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  CardMedia,
  Typography,
  CardContent,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDoctors,
  setSelectedDoctorId,
} from "../../../redux/appointmentSlice";
import Loader from "../../../Loader";
import { Heading } from "../../../style/Typography";

const Specialties = [
  "All Doctors",
  "General Physician",
  "Cardiology",
  "Gynecologist",
  "Dermatologist",
  "Pediatricians",
];

const AvailableDoctors = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Doctors");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const { doctors, loading, selectedDoctorId } = useSelector(
    (state) => state.appointment
  );

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  const handleClick = (id) => {
    console.log("Doctor ID:", id);
    dispatch(setSelectedDoctorId(id));
    navigate("/patient/bookAppointments");
  };

  console.log("doctors", doctors);
  console.log("selectedSpecialty", selectedSpecialty);

  const filteredDoctors =
    selectedSpecialty === "All Doctors"
      ? doctors
      : doctors.filter((doctor) => doctor.specialization === selectedSpecialty);

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={{ mt: 10 }}>
      <Heading>
        Available Doctors
      </Heading>
      <Divider />
      <Typography variant="body1" color="text.secondary" mt={2}>
        Browse through the doctors specialist
      </Typography>

      <Box
        mt={3}
        gap={2}
        display="flex"
        alignItems="flex-start"
        flexDirection={{ xs: "column", sm: "row" }}
      >
        {/* Specialties List */}
        <Box display="flex" flexDirection="column" gap={2}>
          {Specialties.map((specialty) => (
            <Button
              key={specialty}
              variant="outlined"
              color="primary"
              fullWidth
              sx={{
                textTransform: "none",
                justifyContent: "flex-start",
                borderRadius: 1,
                px: 3,
                py: 1,
                width: { xs: "89vw", sm: "auto", md: "180px" },
                boxShadow:
                  selectedSpecialty === specialty &&
                  "inset 10px 10px 15px rgba(0,0,0,0.05), 15px 25px 20px rgba(0,0,0,.1), 15px 20px 20px rgba(0,0,0,0.05)",
                backgroundColor: selectedSpecialty === specialty ? "#e2e5ff" : "transparent",
                color: selectedSpecialty === specialty ? "#000b6d" : theme.palette.mode === "dark" ? "#fff" : "#4a5568",

                borderColor: "#cdd1d4",
              }}
              onClick={() => setSelectedSpecialty(specialty)}
            >
              {specialty}
            </Button>
          ))}
        </Box>

        {/* Doctors Grid */}
        <Box
          sx={{
            gap: "30px",
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((item) => (
              <Card
                sx={{
                  border:
                    selectedDoctorId === item.id
                      ? "2px solid rgb(144, 175, 255)"
                      : "1px solid #c9d8ff",
                  width: { xs: "100%", sm: "250px" },
                  borderRadius: 2,
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "transform 0.5s",
                  "&:hover": { transform: "translateY(-10px)" },
                }}
                key={item.id}
                onClick={() => handleClick(item.id)}
              >
                <CardMedia
                  component="img"
                  image={item?.profilePic}
                  alt="image"
                  sx={{ bgcolor: "#eaefff", objectFit: "inherit", height: { xs: "280", sm: "218px" }, width: "100%" }}
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
                  <Typography
                    variant="h6"
                    fontWeight="medium"
                    color="text.primary"
                  >
                    {item?.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item?.specialization}
                  </Typography>
                  <Button
                    sx={{
                      background: "#007e79",
                      color: "#fff",
                      width: "100%",
                      textTransform: "capitalize",
                      mt: 1,
                    }}
                  >
                    Book an appointment
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="body1" color="text.secondary">
              No doctors available for this specialty.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AvailableDoctors;
