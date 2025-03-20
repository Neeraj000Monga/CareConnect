import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
} from "@mui/material";

const Step1 = ({ setStep, role, isEditing, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    contactNumber: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleNext = () => {
  //   setStep(1);
  // };

  const formFields = [
    {
      label: "First Name",
      name: "firstName",
      type: "text",
      placeholder: "First Name",
    },
    {
      label: "Last Name",
      name: "lastName",
      type: "text",
      placeholder: "Last Name",
    },
    { label: "DOB", name: "DOB", type: "date" },
    {
      label: "Gender",
      name: "gender",
      type: "select",
      options: ["Male", "Female", "Other"],
    },
    {
      label: "Contact No.",
      name: "contactNumber",
      type: "number",
      placeholder: "Contact No.",
    },
    { label: "Email", name: "email", type: "email", placeholder: "Email" },
  ];

  return (
    <Box component="form" sx={{ width: "100%" }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight="medium">
          {role === "patient" ? "Patient Signup Form" : "Doctor Signup Form"}
        </Typography>
        <Typography variant="h6" fontWeight="medium">
          Step 1
        </Typography>
      </Box>

      {/* Personal Information Title */}
      <Typography
        variant="body1"
        sx={{ mt: 2, color: "blue", textDecoration: "underline" }}
      >
        Personal Information
      </Typography>

      {/* Form Fields */}
      <Box
        sx={{
          mt: 3,
          display: "grid",
          gap: 2,
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        }}
      >
        {formFields.map(({ label, name, type, placeholder, options }) => (
          <Box key={name}>
            {type === "select" ? (
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{label} *</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  label="Gender"
                >
                  <MenuItem value="">Select Gender</MenuItem>
                  {options.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <TextField
                fullWidth
                label={label}
                name={name}
                type={type}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                InputLabelProps={{ shrink: type === "date" ? true : undefined }}
              />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Step1;
