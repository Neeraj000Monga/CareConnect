import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Divider,
} from "@mui/material";
import React, { useState } from "react";

const DoctorsApproval = () => {
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: "Dr. Raj",
      specialty: "Cardiologist",
      experience: "10 years",
      qualification: "MBBS, MD",
      licenseNumber: "ABC123456",
      fees: "$20",
      status: "Pending",
    },
    {
      id: 2,
      name: "Dr. Meera",
      specialty: "Dermatologist",
      experience: "8 years",
      qualification: "MBBS, MD",
      licenseNumber: "XYZ789101",
      fees: "$20",
      status: "Pending",
    },
  ]);

  const handleApproval = (id, newStatus) => {
    setDoctors((prevDoctors) =>
      prevDoctors.map((doctor) =>
        doctor.id === id ? { ...doctor, status: newStatus } : doctor
      )
    );
  };

  return (
    <Box sx={{ padding: "20px" }} mt={5}>
      <Typography variant="h6" fontWeight="bold" gutterBottom color="#616161">
        Doctors Approval
      </Typography>
      <Divider />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>#</strong>
              </TableCell>
              <TableCell>
                <strong>Doctor Name</strong>
              </TableCell>
              <TableCell>
                <strong>Specialty</strong>
              </TableCell>
              <TableCell>
                <strong>Experience</strong>
              </TableCell>
              <TableCell>
                <strong>Qualification</strong>
              </TableCell>
              <TableCell>
                <strong>License Number</strong>
              </TableCell>
              <TableCell>
                <strong>Fees</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
              <TableCell>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctors.map((doctor) => (
              <TableRow key={doctor.id}>
                <TableCell>{doctor.id}</TableCell>
                <TableCell>{doctor.name}</TableCell>
                <TableCell>{doctor.specialty}</TableCell>
                <TableCell>{doctor.experience}</TableCell>
                <TableCell>{doctor.qualification}</TableCell>
                <TableCell>{doctor.licenseNumber}</TableCell>
                <TableCell>{doctor.fees}</TableCell>
                <TableCell>{doctor.status}</TableCell>
                <TableCell>
                  {doctor.status === "Pending" && (
                    <>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleApproval(doctor.id, "Approved")}
                        sx={{ marginRight: 1 }}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleApproval(doctor.id, "Rejected")}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DoctorsApproval;
