import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  Avatar,
} from "@mui/material";

const Step4 = ({ setStep, role }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    selectedImage: "",
    agreeToTerms: false,
  });

  const [passwordError, setPasswordError] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "confirmPassword") {
      setPasswordError(value !== formData.password);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, selectedImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box component="form" sx={{ width: "100%" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">
          {role === "patient" ? "Patient Signup Form" : "Doctor Signup Form"}
        </Typography>
        <Typography variant="subtitle1">Step 4</Typography>
      </Box>

      <Typography color="primary" sx={{ mt: 2, textDecoration: "underline" }}>
        Create Account
      </Typography>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        {/* Profile Image Section */}
        <Grid
          item
          xs={12}
          md={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          mb={5}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
            id="upload-image"
          />
          <label htmlFor="upload-image">
            <Avatar
              src={formData.selectedImage || "https://via.placeholder.com/150"}
              sx={{
                width: 120,
                height: 120,
                cursor: "pointer",
                mb: 1,
                border: "2px solid #1976d2",
              }}
            />
          </label>
          <Typography variant="caption" color="gray">
            Click to upload profile picture
          </Typography>
        </Grid>

        {/* Form Fields */}
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            required
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            required
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            required
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={passwordError}
            helperText={passwordError ? "Passwords do not match" : ""}
            sx={{ mb: 2 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
              />
            }
            label="Agree to Terms & Conditions *"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Step4;
