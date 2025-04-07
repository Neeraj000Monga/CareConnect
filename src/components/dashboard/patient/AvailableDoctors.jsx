import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDoctors,
  setSelectedDoctorId,
} from "../../../redux/appointmentSlice";
import Loader from "../../../Loader";

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

  // Get doctors & selectedDoctorId from Redux store
  const { doctors, loading, selectedDoctorId, error } = useSelector(
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

  // Filter doctors based on selected specialty
  const filteredDoctors =
    selectedSpecialty === "All Doctors"
      ? doctors
      : doctors.filter((doctor) => doctor.specialization === selectedSpecialty);

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={{ mt: 10 }}>
      <Typography variant="h5" fontWeight="bold" mb={2} color="#616161">
        Available Doctors
      </Typography>
      <Divider />
      <Typography variant="body1" color="text.secondary" mt={2}>
        Browse through the doctors specialist
      </Typography>

      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        alignItems="flex-start"
        gap={2}
        mt={3}
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
                width: { xs: "94vw", sm: "auto", md: "180px" },
                backgroundColor:
                  selectedSpecialty === specialty ? "#e2e5ff" : "transparent",
                color: selectedSpecialty === specialty ? "black" : "#4a5568",
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
                  width: "250px",
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
