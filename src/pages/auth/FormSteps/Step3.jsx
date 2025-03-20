import React, { useState } from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Box,
  Grid,
} from "@mui/material";

const specialityData = [
  { speciality: "General physician" },
  { speciality: "Gynecologist" },
  { speciality: "Dermatologist" },
  { speciality: "Pediatricians" },
  { speciality: "Neurologist" },
  { speciality: "Gastroenterologist" },
];

const Step3 = ({ setStep, role }) => {
  const [formData, setFormData] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      ...(name === "allergies" && value === "No" && { allergyDetails: "" }),
      ...(name === "takingMedications" &&
        value === "No" && { medicationDetails: "" }),
    }));
  };

  const roleFields =
    role === "patient"
      ? [
          { label: "Weight (kg/lbs)", name: "weight", type: "text" },
          { label: "Height (cm/inches)", name: "height", type: "text" },
          {
            label: "Do you have any allergies?",
            name: "allergies",
            type: "select",
            options: ["Yes", "No"],
            conditionalField: "Yes",
            childField: {
              name: "allergyDetails",
              placeholder: "Specify allergies",
            },
          },

          {
            label: "Blood Group",
            name: "bloodGroup",
            type: "select",
            options: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
          },
        ]
      : [
          { label: "Degree", name: "degree", type: "text" },
          {
            label: "Specialization",
            name: "specialization",
            type: "select",
            options: specialityData.map((item) => item.speciality),
          },
          { label: "Hospital Name", name: "hospitalName", type: "text" },
          { label: "Experience (Years)", name: "experience", type: "text" },
          { label: "License Number", name: "licenseNo", type: "text" },
          {
            label: "Consultation Fees",
            name: "consultationFees",
            type: "text",
          },
        ];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">
          {role === "patient" ? "Patient Signup Form" : "Doctor Signup Form"}
        </Typography>
        <Typography variant="body1">Step 3</Typography>
      </Box>

      <Typography
        color="primary"
        mt={2}
        variant="subtitle1"
        sx={{ textDecoration: "underline" }}
      >
        {role === "patient" ? "Medical History" : "Professional Information"}
      </Typography>

      <Grid container spacing={3} mt={2}>
        {roleFields.map(
          ({ label, name, type, options, conditionalField, childField }) => (
            <Grid item xs={12} md={6} key={name}>
              {type === "select" ? (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                  <Select
                    name={name}
                    value={formData[name] || ""}
                    onChange={handleInputChange}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label={label}
                  >
                    <MenuItem value="" disabled>
                      {label}
                    </MenuItem>

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
                  value={formData[name] || ""}
                  onChange={handleInputChange}
                  placeholder={`Enter ${label.toLowerCase()}`}
                />
              )}

              {conditionalField &&
                formData[name] === conditionalField &&
                childField && (
                  <TextField
                    fullWidth
                    margin="normal"
                    label={childField.placeholder}
                    name={childField.name}
                    value={formData[childField.name] || ""}
                    onChange={handleInputChange}
                  />
                )}
            </Grid>
          )
        )}
      </Grid>
    </Box>
  );
};

export default Step3;
