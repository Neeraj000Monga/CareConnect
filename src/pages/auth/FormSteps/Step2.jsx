import React, { useState } from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Grid,
  Box,
} from "@mui/material";

const Step2 = ({ setStep, role }) => {
  const [formData, setFormData] = useState({
    city: "",
    state: "",
    zipCode: "",
    emergencyContact: "",
    currentAddress: "",
    permanentAddress: "",
    isPermanentSame: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      if (type === "checkbox") {
        return {
          ...prev,
          isPermanentSame: checked,
          permanentAddress: checked ? prev.currentAddress : "",
        };
      } else {
        return {
          ...prev,
          [name]: value,
          ...(name === "currentAddress" && prev.isPermanentSame
            ? { permanentAddress: value }
            : {}),
        };
      }
    });
  };

  // const handleNext = () => {
  //   setStep(2);
  // };

  return (
    <Box component="form" sx={{ width: "100%", }} >
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        
      >
        <Grid item>
          <Typography variant="h5" fontWeight={500}>
            {role === "patient" ? "Patient Signup Form" : "Doctor Signup Form"}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6" fontWeight={500}>
            Step 2
          </Typography>
        </Grid>
      </Grid>

      <Typography color="primary" sx={{ mt: 2, textDecoration: "underline" }}>
        Address & Contact Details
      </Typography>

      {/* City & State in one line */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="City"
            name="city"
            variant="outlined"
            value={formData.city}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="State"
            name="state"
            variant="outlined"
            value={formData.state}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>

      {/* Zip Code & Emergency Contact in one line */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Zip Code"
            name="zipCode"
            variant="outlined"
            value={formData.zipCode}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Emergency Contact"
            name="emergencyContact"
            variant="outlined"
            value={formData.emergencyContact}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>

      {/* Current Address & Permanent Address in one line */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Current Address"
            name="currentAddress"
            variant="outlined"
            multiline
            rows={2}
            value={formData.currentAddress}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Permanent Address"
            name="permanentAddress"
            variant="outlined"
            multiline
            rows={2}
            value={formData.permanentAddress}
            onChange={handleInputChange}
            disabled={formData.isPermanentSame}
          />
        </Grid>
      </Grid>

      {/* Checkbox below Current Address */}
      <Grid item xs={12} sx={{ mt: 1 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.isPermanentSame}
              onChange={handleInputChange}
            />
          }
          label="This is your permanent address"
        />
      </Grid>
    </Box>
  );
};

export default Step2;
