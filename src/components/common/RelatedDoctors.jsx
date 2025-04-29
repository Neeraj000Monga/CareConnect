import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = () => {
  const { doctors, selectedDoctorId } = useSelector(
    (state) => state.appointment
  );

  const navigate = useNavigate();

  const selectedDoctor = doctors.find((doc) => doc.id === selectedDoctorId);

  const selectedSpecialty = selectedDoctor?.specialization;

  const relatedDoctors = doctors.filter(
    (doc) =>
      doc.specialization === selectedSpecialty && doc.id !== selectedDoctorId
  );

  useEffect(() => {
    if (selectedDoctor === undefined) {
      navigate("/patient/availableDoctors");
    }
  }, [selectedDoctor, navigate]);

  return (
    <Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
        color="grey.900"
        mx={{ md: 10 }}
      >
        {relatedDoctors.length > 0 ? (
          <Typography variant="h4" fontWeight={500}  color="text.primary">
            Related Doctors
          </Typography>
        ) : (
          <Typography variant="body1" color="text.secondary" mt={2}>
            No related doctors found.
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "flex-start",
          marginTop: "15px",
        }}
      >
        {relatedDoctors?.length > 0 &&
          relatedDoctors.map((item) => (
            <Card
              sx={{
                width:  { xs: "100%", sm: "215px" } ,
                borderRadius: 2,
                overflow: "hidden",
                cursor: "pointer",
                transition: "transform 0.5s",
                border: "1px solid #c9d8ff",
                "&:hover": { transform: "translateY(-10px)" },
              }}
              key={item.id}
            >
              <CardMedia
                component="img"
                image={item?.profilePic}
                alt={item?.name}
                sx={{ bgcolor: "#eaefff", height: { xs: "300px", sm: "218px" },  width: "100%" }}
              />
              <CardContent>
                <Box
                  gap={1}
                  display="flex"
                  color="#22c55e"
                  textAlign="center"
                  alignItems="center"
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
              </CardContent>
            </Card>
          ))}
      </Box>
    </Box>
  );
};

export default RelatedDoctors;
