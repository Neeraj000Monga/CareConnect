import { Box, Button, Card, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Loader from "../../../Loader";

const DoctorAppointments = () => {
  const [patient, setPatients] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const storedUser = JSON.parse(localStorage.getItem("user2"));
  const userId = storedUser; // Assuming userId is the same as doctor id

  console.log("userId", userId);

  useEffect(() => {
    const fetchPatient = async () => {
      if (!userId) {
        setError("User not found.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://67d826719d5e3a10152d9ddf.mockapi.io/CareConnect/Doctor/${userId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch doctor data");
        }

        const data = await response.json();
        setPatients(data); // Since you're fetching one doctor, it's a single object
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [userId]);

  if (loading) return <Loader />;

  return (
    <Stack sx={{ pt: 8, gap: "20px", }}>
      {error && <Typography color="error">{error}</Typography>}
      {patient?.appointments?.map((appointment, i) => (
        <Card sx={{ p: 2, }} key={i}>
          <Stack gap={2} flexDirection="row" justifyContent="space-between">
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
                src={appointment?.patienProfilePic}
                alt={appointment?.patienProfilePic || "patien"}
                sx={{
                  backgroundColor: "#f0f0ff",
                  borderRadius: 2,
                  maxWidth: "210px",
                  height: "210px",
                  objectFit: "cover",
                }}
              />

              <Stack sx={{ color: "grey.700" }}>
                {appointment?.patientName && (
                  <>
                    <Typography variant="h6" fontWeight={600} color="text.primary">
                      {appointment.patientName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {appointment.patienAllergies}
                    </Typography>
                  </>
                )}

                <Box mt={2}>
                  <Typography fontWeight={500} color="text.secondary">
                    Appointment Details:
                  </Typography>
                  <Box mt={1} p={1} border="1px solid #ddd" borderRadius={2}>
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
                    textTransform: "none",
                    borderColor: "#696969",
                    "&:hover": {
                      backgroundColor: "#DC3545",
                      color: "white",
                      borderColor: "#DC3545",
                    },
                  }}
                >
                  Cancel Appointment
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Card>
      ))}
    </Stack>
  );
};

export default DoctorAppointments;