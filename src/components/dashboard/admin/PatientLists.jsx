import React from "react";
import {
  Box,
  Typography,
  Divider,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import doc1 from "../../../assets/doc1.png";
import { Phone, CalendarToday, Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const patients = [
  {
    id: 1,
    name: "John Doe",
    age: 32,
    phone: "123-456-7890",
    appointments: 5,
    image: doc1,
    gender: "Male",
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 28,
    phone: "987-654-3210",
    appointments: 3,
    image: doc1,
    gender: "Female",
  },
  {
    id: 3,
    name: "Michael Brown",
    age: 45,
    phone: "555-123-4567",
    appointments: 7,
    image: doc1,
    gender: "Male",
  },
  {
    id: 4,
    name: "Emily Johnson",
    age: 36,
    phone: "444-987-6543",
    appointments: 2,
    image: doc1,
    gender: "Female",
  },
  {
    id: 5,
    name: "David Wilson",
    age: 40,
    phone: "333-222-1111",
    appointments: 6,
    image: doc1,
    gender: "Male",
  },
];

const PatientLists = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ mt: 7 }}>
      <Typography variant="h5" fontWeight="bold" mb={2} color="#616161">
        All Patients
      </Typography>
      <Divider />

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
          px: { xs: 2, sm: 0 },
          mt: 3,
        }}
      >
        {patients.map((patient) => (
          <Card
            key={patient.id}
            sx={{
              width: "230px",
              border: "1px solid #c9d8ff",
              borderRadius: 2,
              overflow: "hidden",
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
              },
            }}
            onClick={() => navigate("/admin/information")}
          >
            <CardMedia
              component="img"
              image={patient.image}
              alt={`Profile of ${patient.name}`}
              sx={{
                bgcolor: "#eaefff",
                height: "220px",
                width: "100%",
                objectFit: "cover",
              }}
            />
            <CardContent sx={{ textAlign: "left", paddingBottom: "16px" }}>
              <Typography
                variant="h6"
                fontWeight="bold"
                color="text.primary"
                gutterBottom
              >
                {patient.name}
              </Typography>

              <Typography
                variant="body2"
                display="flex"
                alignItems="center"
                mb={0.5}
              >
                <Person sx={{ color: "#3f51b5", mr: 1 }} fontSize="small" />
                <span
                  style={{
                    color: "#757575",
                    fontWeight: 600,
                    marginRight: "5px",
                  }}
                >
                  Age :{" "}
                </span>{" "}
                {patient.age}
              </Typography>

              <Typography
                variant="body2"
                display="flex"
                alignItems="center"
                mb={0.5}
              >
                <Phone sx={{ color: "#3f51b5", mr: 1 }} fontSize="small" />
                <span
                  style={{
                    color: "#757575",
                    fontWeight: 600,
                    marginRight: "5px",
                  }}
                >
                  Phone :{" "}
                </span>{" "}
                {patient.phone}
              </Typography>

              <Typography
                variant="body2"
                display="flex"
                alignItems="center"
                mb={1}
              >
                <CalendarToday
                  sx={{ color: "#3f51b5", mr: 1 }}
                  fontSize="small"
                />
                <span
                  style={{
                    color: "#757575",
                    fontWeight: 600,
                    marginRight: "5px",
                  }}
                >
                  Appointments :{" "}
                </span>{" "}
                {patient.appointments}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default PatientLists;
