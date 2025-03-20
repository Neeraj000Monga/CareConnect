import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Paper,
} from "@mui/material";
import doc1 from "../../../assets/doc1.png";
import verifiedIcon from "../../../assets/verified_icon.svg";
import infoIcon from "../../../assets/info_icon.svg";
import { styled } from "@mui/system";
import RelatedDoctors from "../../common/RelatedDoctors";

const doctors = {
  _id: "doc1",
  name: "Dr. Richard James",
  image: doc1,
  speciality: "General Physician",
  degree: "MBBS",
  experience: "4 Years",
  about:
    "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
  fees: 50,
  address: {
    line1: "17th Cross, Richmond",
    line2: "Circle, Ring Road, London",
  },
};

const bookingSlots = [
  { day: "Sun", date: "03" },
  { day: "Mon", date: "04" },
  { day: "Tues", date: "05" },
  { day: "Wed", date: "06" },
  { day: "Thur", date: "07" },
  { day: "Fri", date: "08" },
  { day: "Sat", date: "09" },
];

const timeSlots = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
];

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
  },
}));

const DoctorCard = styled(Paper)(({ theme }) => ({
  flex: 1,
  border: "1px solid #BDBDBD",
  borderRadius: "8px",
  padding: theme.spacing(4),
  marginTop: "-80px",
  backgroundColor: "#fff",
  [theme.breakpoints.up("sm")]: {
    marginTop: 0,
    marginLeft: theme.spacing(2),
  },
}));

const BookingSlot = styled(Box)(({ selected }) => ({
  textAlign: "center",
  padding: "24px 0",
  minWidth: "64px",
  borderRadius: "9999px",
  cursor: "pointer",
  fontWeight: 600,
  border: selected ? "none" : "1px solid #565656",
  backgroundColor: selected ? "#4F6EF7" : "transparent",
  color: selected ? "#fff" : "#565656",
}));

const TimeSlot = styled(Button)(({ selected }) => ({
  fontSize: "14px",
  fontWeight: 300,
  padding: "8px 0px",
  borderRadius: "999px",
  textTransform: "none",
  minWidth: "120px",
  backgroundColor: selected ? "#4F6EF7" : "transparent",
  color: selected ? "#fff" : "#565656",
  border: selected ? "none" : "1px solid #565656",
}));

const BookAppointment = () => {
  const [appointmentDate, setAppointmentDate] = useState(bookingSlots[0].date);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(timeSlots[0]);

  return (
    <Box mt={12}>
      <StyledBox>
        <Avatar
          src={doctors.image}
          alt="Doctor"
          sx={{
            width: "100%",
            maxWidth: 288,
            border: "1px solid #c9d8ff",
            borderRadius: "8px",
            bgcolor: "#eaefff",
            height: "100%",
          }}
        />
        <DoctorCard>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="h4" fontWeight={600} color="text.primary">
              {doctors.name}
            </Typography>
            <img src={verifiedIcon} alt="Verified" width={20} />
          </Box>
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            mt={1}
            color="text.secondary"
          >
            <Typography>
              {doctors.degree} - {doctors.speciality}
            </Typography>
            <Button
              variant="outlined"
              size="small"
              sx={{
                borderRadius: "999px",
                fontSize: "12px",
                padding: "2px 8px",
              }}
            >
              {doctors.experience}
            </Button>
          </Box>
          <Box mt={3}>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="body1" fontWeight={500} color="text.primary">
                About
              </Typography>
              <img src={infoIcon} alt="Info" width={16} />
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              maxWidth={700}
              mt={1}
            >
              {doctors.about}
            </Typography>
          </Box>
          <Typography
            variant="body1"
            fontWeight={500}
            color="text.secondary"
            mt={4}
          >
            Appointment Fee:{" "}
            <Typography component="span" color="text.primary">
              ${doctors.fees}
            </Typography>
          </Typography>
        </DoctorCard>
      </StyledBox>

      <Box
        ml={36}
        pl={{ sm: 4 }}
        mt={4}
        fontWeight={500}
        color="text.secondary"
      >
        <Typography sx={{ color: "#565656" }} fontWeight={600}>
          Booking Slots
        </Typography>
        <Box display="flex" gap={3} mt={2} overflow="auto" >
          {bookingSlots.map((item, index) => (
            <BookingSlot
              key={index}
              selected={appointmentDate === item.date}
              onClick={() => setAppointmentDate(item.date)}
            >
              <Typography>{item.day}</Typography>
              <Typography>{item.date}</Typography>
            </BookingSlot>
          ))}
        </Box>
        <Box
          display="flex"
          gap={3}
          mt={2}
          overflow="auto"
          sx={{ maxWidth: "900px" }}
        >
          {timeSlots.map((item, index) => (
            <TimeSlot
              key={index}
              selected={selectedTimeSlot === item}
              onClick={() => setSelectedTimeSlot(item)}
            >
              {item.toLocaleLowerCase()}
            </TimeSlot>
          ))}
        </Box>
        <Button
          variant="contained"
          sx={{
            mt: 4,
            px: 7,
            py: 1.5,
            borderRadius: "999px",
            backgroundColor: "#4F6EF7",
          }}
        >
          Book an appointment
        </Button>
      </Box>
      <RelatedDoctors />
    </Box>
  );
};

export default BookAppointment;
