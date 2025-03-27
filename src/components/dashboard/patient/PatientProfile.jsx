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
  Alert,
} from "@mui/material";
import ProfilePic from "../../../assets/profile_pic.png";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

const PatientProfile = () => {
  const [error, setError] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [patientData, setPatientData] = useState(null);

  console.log("patientData", patientData);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await fetch(
          "https://67d826719d5e3a10152d9ddf.mockapi.io/CareConnect/Patient"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setPatientData(data[0]);
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

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show a temporary preview before upload
    const previewUrl = URL.createObjectURL(file);
    setPatientData((prevData) => ({ ...prevData, profilePic: previewUrl }));

    const imageData = new FormData();
    imageData.append("file", file);
    imageData.append("upload_preset", "careconnet"); // Your Cloudinary upload preset
    imageData.append("cloud_name", "careconnet2"); // Your Cloudinary cloud name

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/careconnet2/image/upload",
        imageData
      );

      const imageUrl = response.data.secure_url;

      // Update patientData with the new Cloudinary image URL
      setPatientData((prevData) => ({ ...prevData, profilePic: imageUrl }));
    } catch (error) {
      console.error(
        "Error uploading image:",
        error.response?.data || error.message
      );
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `https://67d826719d5e3a10152d9ddf.mockapi.io/CareConnect/Patient/${patientData.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(patientData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update data");
      }
      setIsEdit(false);
      setShowAlert(true);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  function GradientCircularProgress() {
    return (
      <Box>
        <svg width={0} height={0}>
          <defs>
            <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e01cd5" />
              <stop offset="100%" stopColor="#1CB5E0" />
            </linearGradient>
          </defs>
        </svg>
        <CircularProgress
          sx={{ "svg circle": { stroke: "url(#my_gradient)" } }}
        />
      </Box>
    );
  }

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
        sx={{ position: "absolute", left: "50%" }}
      >
        <GradientCircularProgress />
      </Box>
    );
  }

  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box
      mt={10}
      p={3}
      maxWidth={900}
      mx="auto"
      boxShadow={3}
      borderRadius={3}
      bgcolor="white"
    >
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
              onChange={handleFileChange}
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
                src={patientData?.profilePic || ProfilePic}
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
              src={patientData?.profilePic || ProfilePic}
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

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
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
              <Typography variant="h5" fontWeight={500} color="#262626">
                Dr. {patientData?.name}
              </Typography>
            )}
          </Box>

          <Button
            variant="outlined"
            sx={{
              px: 2,
              py: 1,
              borderRadius: 10,
              borderColor: "primary.main",
              textTransform: "none",
            }}
            onClick={isEdit ? handleSave : () => setIsEdit(true)}
          >
            {isEdit ? "Save Information" : "Edit"}
          </Button>
        </Box>
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
          <Typography variant="h6" color="#3e3d3d" fontWeight={500} mb={1}>
            Contact Information
          </Typography>
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
          <Typography variant="h6" color="#3e3d3d" fontWeight={500} mb={1}>
            Medical History
          </Typography>
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
          <Typography variant="h6" color="#3e3d3d" fontWeight={500} mb={1}>
            Basic Information
          </Typography>
          <Typography>
            <strong>Gender:</strong> {patientData?.gender || "N/A"}
          </Typography>
          <Typography>
            <strong>Birthdate:</strong> {patientData?.birthdate || "N/A"}
          </Typography>
        </Box>
      )}

      <Stack flexDirection="row" justifyContent="end">
        {showAlert && (
          <Alert
            severity="info"
            sx={{ border: "1px solid", mt: 1 }}
            onClose={() => setShowAlert(false)}
          >
            Save
          </Alert>
        )}
      </Stack>
    </Box>
  );
};

export default PatientProfile;
