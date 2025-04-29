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
  useTheme,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { signupUser } from "../../redux/signupSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FormWrapper } from "../../style/Style";

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
  const dispatch = useDispatch();
  const theme = useTheme();
  const { loading, error } = useSelector((state) => state.signup) || {};

  const [role, setRole] = useState(localStorage.getItem("userRole") || "");
  useEffect(() => {
    localStorage.setItem("userRole", role);
  }, [role]);

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

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signupUser({ formData, role }));
    navigate("/apruble");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show a temporary preview before upload
    const previewUrl = URL.createObjectURL(file);
    setFormData((prevData) => ({ ...prevData, profilePic: previewUrl }));

    const imageData = new FormData();
    imageData.append("file", file);
    imageData.append("upload_preset", "careconnet");
    imageData.append("cloud_name", "careconnet2");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/careconnet2/image/upload",
        imageData
      );
      const imageUrl = response.data.secure_url;

      // Update formData with uploaded image URL
      setFormData((prevData) => ({ ...prevData, profilePic: imageUrl }));
    } catch (error) {
      console.error(
        "Error uploading image:",
        error.response?.data || error.message
      );
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
                  src={formData.profilePic}
                  sx={{
                    width: 100,
                    height: 100,
                    cursor: "pointer",
                    mb: 1,
                    border: "2px solid #ccc",
                  }}
                />
              </label>

              <Typography variant="caption" fontSize={20} sx={{ color: theme.palette.mode === "dark" ? "#fff" : "#6b7280" }} >
                Upload Profile  Picture
              </Typography>
            </Box>
          </Stack>
          {/* Form Fields */}
          <form
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            onSubmit={handleSubmit}
          >
            <FormWrapper >
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
            </FormWrapper>
            <FormWrapper >
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
            </FormWrapper>

            {role === "patient" ? (
              <Stack gap="20px">
                <FormWrapper >
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
                </FormWrapper>
                <FormWrapper >
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
                </FormWrapper>
              </Stack>
            ) : (
              <Stack gap="20px">
                <FormWrapper >
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
                </FormWrapper>
                <FormWrapper >
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
                </FormWrapper>
                <FormWrapper >
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
                </FormWrapper>
              </Stack>
            )}

            <FormWrapper >
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
            </FormWrapper>

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
                onClick={handleSubmit}
                sx={{
                  width: "200px",
                  color: "#fff",
                  background: "#000",
                  "&:hover": { backgroundColor: "#000000e0" },
                }}
                type="submit"
                variant="contained"
                
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
