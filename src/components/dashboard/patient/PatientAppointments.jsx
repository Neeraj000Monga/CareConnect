import { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Card,
  Alert,
  Button,
  Dialog,
  Snackbar,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import Loader from "../../../Loader";
import { Heading } from "../../../style/Typography";

const PatientAppointments = () => {
  const [patient, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  const storedUser = JSON.parse(localStorage.getItem("user2"));
  const userId = storedUser;

  useEffect(() => {
    const fetchPatient = async () => {
      if (!userId) {
        setError("User not found.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://67d826719d5e3a10152d9ddf.mockapi.io/CareConnect/Patient/${userId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setPatients(Array.isArray(data) ? data : [data]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [userId]);


  const handleCancelAppointment = async () => {
    if (!selectedDoctorId || !patient.length) return;

    const currentPatient = patient[0];

    const updatedAppointments = currentPatient.myappointments.filter(
      (appointment) => appointment?.doctorId !== selectedDoctorId
    );

    const updatedPatientData = {
      ...currentPatient,
      myappointments: updatedAppointments,
    };

    setPatients([{ ...updatedPatientData }]);
    setOpenDialog(false);

    try {
      const patientRes = await fetch(
        `https://67d826719d5e3a10152d9ddf.mockapi.io/CareConnect/Patient/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPatientData),
        }
      );

      if (!patientRes.ok) {
        throw new Error("Failed to cancel appointment for patient");
      }

      const doctorRes = await fetch(
        `https://67d826719d5e3a10152d9ddf.mockapi.io/CareConnect/Doctor/${selectedDoctorId}`
      );

      if (!doctorRes.ok) {
        throw new Error("Failed to fetch doctor data");
      }

      const doctorData = await doctorRes.json();

      const updatedDoctorAppointments = doctorData.appointments?.filter(
        (appt) => appt?.patientId !== userId
      );

      const updatedDoctorData = {
        ...doctorData,
        appointments: updatedDoctorAppointments,
      };

      const updateDoctorRes = await fetch(
        `https://67d826719d5e3a10152d9ddf.mockapi.io/CareConnect/Doctor/${selectedDoctorId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedDoctorData),
        }
      );

      if (!updateDoctorRes.ok) {
        throw new Error("Failed to cancel appointment for doctor");
      }

      setSnackbarMessage("Appointment successfully cancelled.");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (err) {
      setError(err.message);
      setSnackbarMessage("Error cancelling appointment: " + err.message);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const confirmCancelAppointment = (doctorId) => {
    setSelectedDoctorId(doctorId);
    setOpenDialog(true);
  };

  if (loading) return <Loader />;

  return (
    <Box mt={8}>
      <Heading m={2}>
        My Appointments
      </Heading>

      {error && <Typography color="error">{error}</Typography>}

      {!error &&
        patient.map((item, index) => (
          <Stack key={index} gap={2}>
            {item?.myappointments?.map((appointment, i) => (
              <Card sx={{ p: 2 }} key={i}>
                <Stack
                  sx={(theme) => ({
                    flexDirection: "column",
                    [theme.breakpoints.up("sm")]: {
                      flexDirection: "row",
                    },
                  })}
                  gap={2}
                  justifyContent="space-between"
                >
                  <Stack
                    gap={2}
                    sx={(theme) => ({
                      flexDirection: "column",
                      [theme.breakpoints.up("md")]: {
                        flexDirection: "row",
                      },
                    })}
                  >
                    <Stack
                      component="img"
                      src={appointment?.profilePic}
                      alt={appointment?.doctorName || "Doctor"}
                      sx={{
                        height: "210px",
                        borderRadius: 2,
                        objectFit: "initial",
                        backgroundColor: "#f0f0ff",
                        maxWidth: { xs: "100%", sm: "210px" },
                      }}
                    />

                    <Stack sx={{ color: "grey.700" }}> 
                      {appointment?.doctorName && (
                        <>
                          <Typography
                            variant="h6"
                            fontWeight={600}
                            color="text.primary"
                          >
                            {appointment.doctorName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {appointment.specialization}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {appointment.degree}
                          </Typography>
                        </>
                      )}

                      <Box mt={2}>
                        <Typography fontWeight={500} color="text.secondary">
                          Appointment Details:
                        </Typography>
                        <Box
                          mt={1}
                          p={1}
                          border="1px solid #ddd"
                          borderRadius={2}
                        >
                          <Typography fontWeight={500} color="text.secondary">
                            📅 Date: {appointment?.date}
                          </Typography>
                          <Typography color="text.secondary">
                            🕒 Time Slots:{" "}
                            {appointment?.timeSlots?.join(", ") || "N/A"}
                          </Typography>
                        </Box>
                      </Box>
                    </Stack>
                  </Stack>

                  <Stack>
                    <Stack
                      sx={{
                        height: "100%",
                        justifyContent: "flex-end",
                        gap: "10px",
                      }}
                    >
                      <Button
                        variant="outlined"
                        color="text.secondary"
                        sx={{
                          minWidth: 140,
                          py: 1,
                          textTransform: "none",
                          borderColor: "#696969",
                          "&:hover": {
                            backgroundColor: "#007BFF",
                            color: "white",
                            borderColor: "#007BFF",
                          },
                        }}
                      >
                        Reschedule
                      </Button>
                      <Button
                        variant="outlined"
                        color="text.secondary"
                        sx={{
                          py: 1,
                          minWidth: 140,
                          textTransform: "none",
                          borderColor: "#696969",
                          "&:hover": {
                            backgroundColor: "#DC3545",
                            color: "white",
                            borderColor: "#DC3545",
                          },
                        }}
                        onClick={() =>
                          confirmCancelAppointment(appointment?.doctorId)
                        }
                      >
                        Cancel Appointment
                      </Button>
                    </Stack>
                  </Stack>
                </Stack>
              </Card>
            ))}
          </Stack>
        ))}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Cancel Appointment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to cancel this appointment?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            No
          </Button>
          <Button
            onClick={handleCancelAppointment}
            color="error"
            variant="contained"
          >
            Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={snackbarSeverity}
          variant="filled"
          onClose={() => setOpenSnackbar(false)}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PatientAppointments;
