import General_physician from "../../../assets/General_physician.svg";
import Gynecologist from "../../../assets/Gynecologist.svg";
import Neurologist from "../../../assets/Neurologist.svg";
import Pediatricians from "../../../assets/Pediatricians.svg";
import Dermatologist from "../../../assets/Dermatologist.svg";
import Gastroenterologist from "../../../assets/Gastroenterologist.svg";
import { Link } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";

const specialityData = [
  {
    speciality: "General physician",
    image: General_physician,
  },
  {
    speciality: "Gynecologist",
    image: Gynecologist,
  },
  {
    speciality: "Dermatologist",
    image: Dermatologist,
  },
  {
    speciality: "Pediatricians",
    image: Pediatricians,
  },
  {
    speciality: "Neurologist",
    image: Neurologist,
  },
  {
    speciality: "Gastroenterologist",
    image: Gastroenterologist,
  },
];

const SpecialityMenu = () => {

  return (
    <Stack>
      <Typography variant="h6" fontWeight="bold" ml={2}>
        Find by Speciality
      </Typography>
      <Stack
        sx={{
          flexDirection: "row",
          overflowX: "scroll",
          maxWidth: { xs: "310px", sm: "600px", lg: "100%" }
        }}
      >

        {specialityData.map((item, index) => (
          <Box key={index} sx={{ width: "120px" }}>
            <Link
              // to={`/doctors/${item.speciality}`}
              onClick={() => window.scrollTo(0, 0)}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="center"
                sx={{
                  minWidth: "110px",
                  cursor: "pointer",
                  transition: "transform 0.5s",
                  "&:hover": { transform: "translateY(-10px)" },
                }}
              >
                <Box
                  component="img"
                  src={item.image}
                  alt="Speciality"
                  sx={{ width: 66, height: "85px" }}
                />
                <Typography variant="body2" sx={{ fontSize: "12px" }}>
                  {item.speciality}
                </Typography>
              </Box>
            </Link>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};

export default SpecialityMenu;
