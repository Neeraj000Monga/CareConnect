import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import SideBar from "../components/common/Sidebar";
import DoctorDashboard from "../components/dashboard/doctor/DoctorDashboard";
import PatientDashboard from "../components/dashboard/patient/PatientDashboard";
import PatientAppointments from "../components/dashboard/patient/PatientAppointments";
import DoctorAppointments from "../components/dashboard/doctor/DoctorAppointments";
import AvailableDoctors from "../components/dashboard/patient/AvailableDoctors";
import BookAppointment from "../components/dashboard/patient/BookAppointment";
import PatientProfile from "../components/dashboard/patient/PatientProfile";
import Appointments from "../components/dashboard/admin/Appointments";
import DoctorsLists from "../components/dashboard/admin/DoctorsLists";
import PatientLists from "../components/dashboard/admin/PatientLists";
import DoctorsApproval from "../components/dashboard/admin/DoctorsApproval";
import DetailsPage from "../components/dashboard/admin/DetailsPage";
import Settability from "../components/dashboard/patient/Settability";

const DashboardLayout = ({ role, hadleToggleSwitch}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <SideBar isOpen={isSidebarOpen} hadleToggleSwitch={hadleToggleSwitch} toggleSidebar={setIsSidebarOpen} />

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          transition: "margin 0.3s ease",
          padding: "20px",
        }}
      >
        <Routes>
          {role === "patient" ? (
            <>
              <Route path="dashboard" element={<PatientDashboard />} />
              <Route path="availableDoctors" element={<AvailableDoctors />} />
              <Route path="myAppointments" element={<PatientAppointments />} />
              <Route path="bookAppointments" element={<BookAppointment />} />
              <Route path="profile" element={<PatientProfile />} />
            </>
          ) : role === "doctor" ? (
            <>
              <Route path="dashboard" element={<DoctorDashboard />} />
              <Route path="myAppointments" element={<DoctorAppointments />} />
              <Route path="Settability" element={<Settability />} />
            </>
          ) : role === "admin" ? (
            <>
              <Route path="doctorsApproval" element={<DoctorsApproval />} />
              <Route path="Appointments" element={<Appointments />} />
              <Route path="doctorsLists" element={<DoctorsLists />} />
              <Route path="patientLists" element={<PatientLists />} />
              <Route path="information" element={<DetailsPage />} />
            </>
          ) : null}
        </Routes>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
