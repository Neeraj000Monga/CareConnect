import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Stack,
  styled,
  Avatar,
  Button,
  MenuItem,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import UploadImage from "../../assets/about_image.png";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const specializations = [
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Psychiatry",
  "Radiology",
  "Urology",
];

const TextFields = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "4px",
  },
});

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [role, setRole] = useState(localStorage.getItem("userRole") || "");
  useEffect(() => {
    localStorage.setItem("userRole", role);
  }, [role]);

  console.log("rolerole", role);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
    experience: "",
    specialization: "",
    degree: "",
    fees: "",
    hospitalName: "",
    licenseNo: "",
    profilePic: null,
  });

  // ======
  const apiUrl =
    role === "patient"
      ? "https://67d826719d5e3a10152d9ddf.mockapi.io/CareConnect/Patient"
      : "https://67d826719d5e3a10152d9ddf.mockapi.io/CareConnect/Doctor";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-TYpe": "application/json",
      },
      body: JSON.stringify(formData),
    });
  };
  // =======
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilePic: file });
    }
  };

  return (
    <Box my={10}>
      <Stack mt={2} flexDirection="row" justifyContent="center">
        <Paper sx={{ p: 2, width: "100%", maxWidth: "800px" }}>
          <Stack flexDirection="row" justifyContent="space-between">
            <Box
              display="flex"
              alignItems="center"
              sx={{ width: "fit-content" }}
              gap={2}
              mb={1}
            >
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="upload-image"
                onChange={handleFileChange}
              />
              <label htmlFor="upload-image">
                <Avatar
                  src={
                    formData.profilePic
                      ? URL.createObjectURL(formData.profilePic)
                      : UploadImage
                  }
                  sx={{
                    width: 100,
                    height: 100,
                    cursor: "pointer",
                    mb: 1,
                    border: "2px solid #ccc",
                  }}
                />
              </label>

              <Typography variant="caption" color="#6b7280" fontSize={20}>
                Upload Profile <br /> Picture
              </Typography>
            </Box>
            <Typography sx={{ fontSize: "18px" }}>create account</Typography>
          </Stack>
          {/* Form Fields */}
          <form
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            onSubmit={handleSubmit}
          >
            <Stack flexDirection="row" gap="20px">
              <TextFields
                sx={{ borderRadius: "4px !important" }}
                fullWidth
                label="UserName"
                name="name"
                onChange={handleChange}
                required
                size="small"
              />
              <TextFields
                fullWidth
                label="Email"
                name="email"
                type="email"
                onChange={handleChange}
                required
                size="small"
              />
            </Stack>
            <Stack flexDirection="row" gap="20px">
              <TextFields
                fullWidth
                select
                label="Gender"
                name="gender"
                onChange={handleChange}
                required
                size="small"
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextFields>

              <TextFields
                fullWidth
                type="number"
                label="Age"
                name="age"
                onChange={handleChange}
                required
                size="small"
              />
            </Stack>

            {role === "patient" ? (
              <Stack gap="20px">
                <Stack flexDirection="row" gap="20px">
                  <TextFields
                    fullWidth
                    label="Weight (Kg/ibs)"
                    name="weight"
                    type="text"
                    onChange={handleChange}
                    required
                    size="small"
                  />

                  <TextFields
                    fullWidth
                    label="Height (cm/inches)"
                    name="height"
                    type="text"
                    onChange={handleChange}
                    required
                    size="small"
                  />
                </Stack>
                <Stack flexDirection="row" gap="20px">
                  <TextFields
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
                  </TextFields>

                  <TextFields
                    fullWidth
                    select
                    label="Blood Group"
                    name="bloodgroup"
                    onChange={handleChange}
                    required
                    size="small"
                  >
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                      (group) => (
                        <MenuItem key={group} value={group}>
                          {group}
                        </MenuItem>
                      )
                    )}
                  </TextFields>
                </Stack>
              </Stack>
            ) : (
              <Stack gap="20px">
                <Stack flexDirection="row" gap="20px">
                  <TextFields
                    fullWidth
                    label="Degree"
                    name="degree"
                    onChange={handleChange}
                    required
                    size="small"
                  />

                  <TextFields
                    fullWidth
                    select
                    label="Specialization"
                    name="specialization"
                    onChange={handleChange}
                    required
                    size="small"
                  >
                    {specializations.map((specialty, index) => (
                      <MenuItem key={index} value={specialty}>
                        {specialty}
                      </MenuItem>
                    ))}
                  </TextFields>
                </Stack>
                <Stack flexDirection="row" gap="20px">
                  <TextFields
                    fullWidth
                    label="Hospital Name"
                    name="hospitalName"
                    onChange={handleChange}
                    required
                    size="small"
                  />
                  <TextFields
                    fullWidth
                    select
                    label="Experience (Years)"
                    name="experience"
                    onChange={handleChange}
                    required
                    size="small"
                  >
                    {[...Array(12)].map((_, i) => (
                      <MenuItem key={i + 1} value={i + 1}>
                        {i + 1} Years
                      </MenuItem>
                    ))}
                  </TextFields>
                </Stack>
                <Stack flexDirection="row" gap="20px">
                  <TextFields
                    fullWidth
                    label="License Number"
                    name="licenseNo"
                    onChange={handleChange}
                    required
                    size="small"
                  />

                  <TextField
                    fullWidth
                    label="Consultation Fees"
                    name="consultationfees"
                    type="number"
                    onChange={handleChange}
                    required
                    size="small"
                  />
                </Stack>
              </Stack>
            )}

            <Stack flexDirection="row" gap="20px">
              <TextFields
                fullWidth
                size="small"
                label="Password"
                name="password"
                type="text"
                onChange={handleChange}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextFields
                fullWidth
                size="small"
                label="Confirm Password"
                name="confirmpassword"
                type="text"
                onChange={handleChange}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>

            {/* Submit Button */}
            <Box textAlign="center">
              <FormGroup>
                <FormControlLabel
                  required
                  control={<Checkbox />}
                  label="Required"
                />
              </FormGroup>
              <Button
                sx={{
                  width: "200px",
                  background: "#000",
                  "&:hover": { backgroundColor: "#000000e0" },
                }}
                type="submit"
                variant="contained"
                color="primary"
              >
                Add {role}
              </Button>
            </Box>
          </form>
        </Paper>
      </Stack>
    </Box>
  );
};

export default Signup;
