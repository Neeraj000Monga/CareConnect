import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Avatar,
  Stack,
  TextField,
  MenuItem,
  Card,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Alerts } from "../../../style/Alert";
import Loader from "../../../Loader";
import { Heading } from "../../../style/Typography";

const PatientProfile = () => {
  const [error, setError] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();

  const storedUser = JSON.parse(localStorage.getItem("user2"));

  useEffect(() => {
    const fetchPatientData = async () => {
      if (!storedUser) {
        setError("No user found in local storage");
        return;
      }

      try {
        const response = await fetch(
          `https://67d826719d5e3a10152d9ddf.mockapi.io/CareConnect/Patient/${storedUser}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setPatientData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    if (!patientData) {
      setError("No patient data to update.");
      return;
    }

    try {
      const response = await fetch(
        `https://67d826719d5e3a10152d9ddf.mockapi.io/CareConnect/Patient/${storedUser}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(patientData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update data");
      }

      const updatedData = await response.json();
      setPatientData(updatedData); 
      setIsEdit(false);
      setShowAlert(true);
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <Typography color="error">Error: {error}</Typography>;

  if (loading) {
    return <Loader />;
  }

  return (
    <Box mt={8}>
      <Heading>
        Profile
      </Heading>
      <Box
        mt={2}
        mx="auto"
        boxShadow={3}
        maxWidth={900}
        borderRadius={1}
      >
        <Card sx={{ p: 3 }}>


          {/* Profile Header */}
          <Box display="flex" alignItems="center" gap={3} mb={3}>
            {/* Avatar with Upload */}

            {isEdit ? (
              <Box>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  id="upload-photo"
                />
                <label htmlFor="upload-photo">
                  <Box sx={{ position: "absolute" }}>
                    <EditIcon
                      sx={{
                        zIndex: 1,
                        margin: "5px",
                        left: "4.5rem",
                        fontSize: "16px",
                        position: "relative",
                      }}
                    />
                  </Box>
                  <Avatar
                    src={patientData?.profilePic}
                    alt="Profile"
                    sx={{
                      width: 100,
                      height: 100,
                      borderRadius: 2,
                      cursor: "pointer",
                      background: "#dbe5f1",
                    }}
                  />
                </label>
              </Box>
            ) : (
              <Box>
                <Avatar
                  src={patientData?.profilePic}
                  alt="Profile"
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: 2,
                    cursor: "pointer",
                    background: "#dbe5f1",
                  }}
                />
              </Box>
            )}

            <Stack
              sx={(theme) => ({
                gap: "10px",
                width: "100%",
                flexDirection: "column",
                justifyContent: "space-between",
                [theme.breakpoints.up("sm")]: {
                  flexDirection: "row",
                },
              })}
            >
              <Box>
                {isEdit ? (
                  <TextField
                    size="small"
                    fullWidth
                    name="name"
                    label="User Name"
                    value={patientData?.name}
                    onChange={handleChange}
                  />
                ) : (
                  <Heading sx={{ fontSize: "20px" }}>
                    {patientData?.name}
                  </Heading>
                )}
              </Box>

              <Button
                sx={{
                  px: 2,
                  width: "fit-content",
                  borderRadius: 10,
                  textTransform: "none",
                  borderColor: "primary.main",
                }}
                variant="outlined"
                onClick={isEdit ? handleSave : () => setIsEdit(true)}
              >
                {isEdit ? "Save Information" : "Edit"}
              </Button>
            </Stack>
          </Box>

          {/* Information Sections */}

          {isEdit ? (
            <Stack direction="row" gap={3} mb={3}>
              <TextField
                size="small"
                name="email"
                label="Email"
                fullWidth
                value={patientData?.email}
                onChange={handleChange}
              />
            </Stack>
          ) : (
            <Box>
              <Divider sx={{ my: 3 }} />
              <Heading sx={{ fontSize: "1.25rem", fontWeight: 500, mb: 1 }}>
                Contact Information
              </Heading>
              <Typography>
                <strong>Email:</strong> {patientData?.email || "N/A"}
              </Typography>
              <Typography>
                <strong>Phone:</strong> {patientData?.phone || "N/A"}
              </Typography>
              <Typography>
                <strong>Emergency Contact:</strong>{" "}
                {patientData?.emergency || "N/A"}
              </Typography>
            </Box>
          )}

          {/* Basic Info */}
          {isEdit ? (
            <Box>
              <Stack direction="row" gap={3} mb={3}>
                <TextField
                  size="small"
                  fullWidth
                  name="weight"
                  label="Weight"
                  value={patientData?.weight}
                  onChange={handleChange}
                />
                <TextField
                  size="small"
                  fullWidth
                  name="height"
                  label="Height"
                  value={patientData?.height}
                  onChange={handleChange}
                />
              </Stack>
              <Stack direction="row" gap={3} mb={3}>
                <TextField
                  size="small"
                  fullWidth
                  name="bloodgroup"
                  label="Blood Group"
                  value={patientData?.bloodgroup}
                  onChange={handleChange}
                />

                <TextField
                  fullWidth
                  select
                  label="Do you have any allergies?"
                  name="allergies"
                  onChange={handleChange}
                  required
                  size="small"
                >
                  {[
                    "No Allergies",
                    "Dust",
                    "Pollen",
                    "Peanuts",
                    "Shellfish",
                    "Dairy",
                    "Gluten",
                    "Eggs",
                    "Soy",
                    "Latex",
                    "Medication",
                    "Other",
                  ].map((allergy) => (
                    <MenuItem key={allergy} value={allergy}>
                      {allergy}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
            </Box>
          ) : (
            <Box>
              <Divider sx={{ my: 3 }} />
              <Heading sx={{ fontSize: "1.25rem", fontWeight: 500, mb: 1 }} >
                Medical History
              </Heading>
              <Typography>
                <strong>Weight:</strong> {patientData?.weight || "N/A"}
              </Typography>
              <Typography>
                <strong>Height:</strong> {patientData?.height || "N/A"}
              </Typography>
              <Typography>
                <strong>Blood Group:</strong> {patientData?.bloodgroup || "N/A"}
              </Typography>
              <Typography>
                <strong>Allergies:</strong> {patientData?.allergies || "N/A"}
              </Typography>
            </Box>
          )}

          {/* Medical History */}
          {isEdit ? (
            <Stack direction="row" gap={3} mb={3}>
              <TextField
                size="small"
                select
                fullWidth
                name="gender"
                label="Gender"
                value={patientData?.gender}
                onChange={handleChange}
                required
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
              <TextField
                size="small"
                fullWidth
                name="birthdate"
                label="Birthdate"
                value={patientData?.birthdate}
                onChange={handleChange}
              />
            </Stack>
          ) : (
            <Box>
              <Divider sx={{ my: 3 }} />
              <Heading sx={{ fontSize: "1.25rem", fontWeight: 500, mb: 1 }} >
                Basic Information
              </Heading>
              <Typography>
                <strong>Gender:</strong> {patientData?.gender || "N/A"}
              </Typography>
              <Typography>
                <strong>Birthdate:</strong> {patientData?.birthdate || "N/A"}
              </Typography>
            </Box>
          )}

          {showAlert && (
            <Alerts severity="info" onClose={() => setShowAlert(false)}>
              Save
            </Alerts>
          )}
        </Card>
      </Box>
    </Box>
  );
};

export default PatientProfile;
