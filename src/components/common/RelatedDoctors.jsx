import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { useSelector } from "react-redux";

const RelatedDoctors = () => {
  const { doctors, selectedDoctorId } = useSelector(
    (state) => state.appointment
  );

  const selectedDoctor = doctors.find((doc) => doc.id === selectedDoctorId);

  const selectedSpecialty = selectedDoctor?.specialization;

  const relatedDoctors = doctors.filter(
    (doc) =>
      doc.specialization === selectedSpecialty && doc.id !== selectedDoctorId
  );

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
          marginTop: "15px",
        }}
      >
        {relatedDoctors.length > 0 ? (
          relatedDoctors.map((item) => (
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
              key={item.id}
            >
              <CardMedia
                component="img"
                image={item?.profilePic}
                alt={item?.name}
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
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="body1" color="text.secondary" mt={2}>
            No related doctors found.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default RelatedDoctors;
