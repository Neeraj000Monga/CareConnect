import { useEffect, useState } from "react";
import { Box, Typography, Grid, Button, Stack, Card } from "@mui/material";
import Loader from "../../../Loader";

const PatientAppointments = () => {
  const [patient, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Handle cancel appointment
  // const handleCancelAppointment = async (doctorId) => {
  //   if (!doctorId) return;

  //   const updatedPatients = patient.map((p) => {
  //     // Filter out the appointment that needs to be canceled
  //     const updatedAppointments = p.myappointments.filter(
  //       (appointment) => appointment.id !== doctorId
  //     );

  //     return { ...p, myappointments: updatedAppointments };
  //   });

  //   setPatients(updatedPatients);

  //   try {
  //     // Make API call to delete the appointment (replace with your API endpoint)
  //     const response = await fetch(
  //       `https://67d826719d5e3a10152d9ddf.mockapi.io/CareConnect/Patient/${doctorId}`,
  //       {
  //         method: "DELETE",
  //       }
  //     );
  //     if (!response.ok) {
  //       throw new Error("Failed to cancel appointment");
  //     }

  //     // After successful deletion, we do nothing as we've already updated the state.
  //   } catch (err) {
  //     setError(err.message);
  //   }
  //   console.log("doctorId", doctorId);
  // };

  const handleCancelAppointment = async (doctorId) => {
    if (!doctorId) return;

    console.log("doctorId:", doctorId); // Log here

    const updatedPatients = patient.map((p) => {
      const updatedAppointments = p.myappointments.filter(
        (appointment) => appointment.doctorId !== doctorId
      );
      return { ...p, myappointments: updatedAppointments };
    });

    setPatients(updatedPatients);

    try {
      const response = await fetch(
        `https://67d826719d5e3a10152d9ddf.mockapi.io/CareConnect/Patient/${doctorId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to cancel appointment");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <Loader />;

  return (
    <Box mt={8}>
      <Typography variant="h5" fontWeight="bold" color="grey.700" m={2}>
        My Appointments
      </Typography>

      {error && <Typography color="error">{error}</Typography>}

      {!error &&
        patient.map((item, index) => (
          <Stack key={index} gap={2}>
            {item?.myappointments?.map((appointment, i) => (
              <Card sx={{ p: 2 }} key={i}>
                <Grid container spacing={2}>
                  {/* Doctor Image */}
                  <Grid item xs={12} sm={12} md={2.5}>
                    <Box
                      component="img"
                      src={appointment?.profilePic}
                      alt={appointment?.doctorName || "Doctor"}
                      sx={{
                        backgroundColor: "#f0f0ff",
                        borderRadius: 2,
                        width: "210px",
                        height: "210px",
                        objectFit: "cover",
                      }}
                    />
                  </Grid>

                  {/* Appointment Details */}
                  <Grid item xs={12} sm={12} md={7}>
                    <Box sx={{ color: "grey.700" }}>
                      {appointment?.doctorName && (
                        <>
                          <Typography
                            variant="h6"
                            fontWeight={600}
                            color="#262626"
                          >
                            {appointment.doctorName}
                          </Typography>
                          <Typography variant="body2">
                            {appointment.specialization}
                          </Typography>
                          <Typography variant="body2">
                            {appointment.degree}
                          </Typography>
                        </>
                      )}

                      <Box mt={2}>
                        <Typography fontWeight={500} color="grey.800">
                          Appointment Details:
                        </Typography>
                        <Box
                          mt={1}
                          p={1}
                          border="1px solid #ddd"
                          borderRadius={2}
                        >
                          <Typography fontWeight={500}>
                            📅 Date: {appointment?.date}
                          </Typography>
                          <Typography>
                            🕒 Time Slots:{" "}
                            {appointment?.timeSlots?.join(", ") || "N/A"}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>

                  {/* Action Buttons */}
                  <Grid item xs={12} sm={12} md={2.5}>
                    <Stack
                      sx={{
                        height: "100%",
                        justifyContent: "flex-end",
                        gap: "10px",
                      }}
                    >
                      <Button
                        variant="outlined"
                        sx={{
                          minWidth: 140,
                          py: 1,
                          color: "#696969",
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
                        sx={{
                          minWidth: 140,
                          py: 1,
                          color: "#696969",
                          textTransform: "none",
                          borderColor: "#696969",
                          "&:hover": {
                            backgroundColor: "#DC3545",
                            color: "white",
                            borderColor: "#DC3545",
                          },
                        }}
                        onClick={() =>
                          handleCancelAppointment(appointment.doctorId)
                        }
                      >
                        Cancel
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </Card>
            ))}
          </Stack>
        ))}
    </Box>
  );
};

export default PatientAppointments;