import { useEffect, useState } from "react";
import infoIcon from "../../../assets/info_icon.svg";
import RelatedDoctors from "../../common/RelatedDoctors";
import verifiedIcon from "../../../assets/verified_icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctors } from "../../../redux/appointmentSlice";
import {
  Box,
  Typography,
  Button,
  Paper,
  CardMedia,
  Stack,
  IconButton,
  Alert,
} from "@mui/material";
import {
  setActiveDay,
  setMonth,
  setYear,
  toggleActiveSlot,
  toggleAlert,
} from "../../../redux/bookApointmentSlice";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  DayCell,
  DaysWrapper,
  DayText,
  DoctorCard,
  HeaderCell,
  StyledBox,
  TimeCell,
  WeekdayText,
  Wrapper,
} from "../../../style/Style";

const timeSlots = [];
let startHour = 10; 
let endHour = 22; 

for (let hour = startHour; hour < endHour; hour++) {
  for (let minutes of [0, 30]) {
    let period = hour < 12 ? "AM" : "PM";
    let formattedHour = hour > 12 ? hour - 12 : hour;
    formattedHour = formattedHour === 0 ? 12 : formattedHour;

    let timeString = `${formattedHour}:${
      minutes === 0 ? "00" : "30"
    } ${period}`;
    timeSlots.push({ time: timeString });
  }
}

const BookAppointment = () => {
  const today = new Date(); 
  const [currentDate, setCurrentDate] = useState(today.getDate()); 
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const { doctors, selectedDoctorId } = useSelector(
    (state) => state.appointment
  );
  const { activeDay, activeSlots, showAlert, currentMonth, currentYear } =
    useSelector((state) => state.bookapointment);

  const dispatch = useDispatch();

  useEffect(() => {
    const daysInNewMonth = getDaysInMonth(currentMonth, currentYear);

    if (activeDay > daysInNewMonth) {
      dispatch(setActiveDay(null)); 
    }

    setCurrentDate(today.getDate());
  }, [currentMonth, currentYear, dispatch]);

  const getDaysInMonth = (month, year) =>
    new Date(year, month + 1, 0).getDate();

  const handleSlotClick = (slotTime) => {
    dispatch(toggleActiveSlot(slotTime));
  };

  const handleNextMonth = () => {
    let newMonth = currentMonth + 1;
    let newYear = currentYear;

    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }

    dispatch(setMonth(newMonth));
    dispatch(setYear(newYear));
  };

  const handleBackMonth = () => {
    let newMonth = currentMonth - 1;
    let newYear = currentYear;

    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }

    dispatch(setMonth(newMonth));
    dispatch(setYear(newYear));
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);

  const storedUser = JSON.parse(localStorage.getItem("user2"));

  const handleAppointmentBook = async () => {
    if (!activeDay || activeSlots.length === 0) {
      console.error("Please select a date and time slot.");
      return;
    }

    setLoading(true); 

    const doctorApiUrl =
      "https://67d826719d5e3a10152d9ddf.mockapi.io/CareConnect/Doctor";
    const patientApiUrl = `https://67d826719d5e3a10152d9ddf.mockapi.io/CareConnect/Patient`;

    const selectedPatientId = storedUser; 

    try {
      const doctorResponse = await fetch(doctorApiUrl);
      if (!doctorResponse.ok) throw new Error("Failed to fetch doctors");

      const doctors = await doctorResponse.json();
      const doctor = doctors.find((doc) => doc.id === selectedDoctorId);
      if (!doctor) throw new Error("Doctor not found");

      // Update doctor appointments
      const updatedDoctor = {
        ...doctor,
        appointments: [
          ...(doctor.appointments || []),
          {
            date: `${currentYear}-${currentMonth + 1}-${activeDay}`,
            timeSlots: activeSlots,
          },
        ],
      };

      // Send PUT request to update doctor's appointments
      const doctorUpdateResponse = await fetch(`${doctorApiUrl}/${doctor.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDoctor),
      });

      if (!doctorUpdateResponse.ok)
        throw new Error("Failed to book appointment for doctor");

      // Fetch the patient data
      const patientResponse = await fetch(
        `${patientApiUrl}/${selectedPatientId}`
      );
      if (!patientResponse.ok) throw new Error("Failed to fetch patient");

      const patient = await patientResponse.json();

      // Update patient appointments

      const updatedPatient = {
        ...patient,
        myappointments: [
          ...(patient.myappointments || []),
          {
            doctorName: doctor.name,
            specialization: doctor.specialization,
            degree: doctor.degree,
            profilePic: doctor.profilePic,
            date: `${currentYear}-${currentMonth + 1}-${activeDay}`,
            timeSlots: activeSlots,
          },
        ],
      };

      const patientUpdateResponse = await fetch(
        `${patientApiUrl}/${selectedPatientId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPatient),
        }
      );

      if (!patientUpdateResponse.ok)
        throw new Error("Failed to book appointment for patient");

      console.log("Appointment booked successfully for doctor and patient!");
      setConfirmed(true); 
      dispatch(toggleAlert());
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  return (
    <Box mt={12}>
      {doctors
        ?.filter((item) => item?.id === selectedDoctorId)
        ?.map((item) => (
          <StyledBox key={item.id}>
            <CardMedia
              component="img"
              image={item?.profilePic}
              alt="Selected Doctor"
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
                  {item.name}
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
                  {item.degree} - {item.specialization}
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
                  {`${item.experience} Years`}
                </Button>
              </Box>
              <Box mt={3}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography
                    variant="body1"
                    fontWeight={500}
                    color="text.primary"
                  >
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
                  Dr. Davis has a strong commitment to delivering comprehensive
                  medical care, focusing on preventive medicine, early
                  diagnosis, and effective treatment strategies. Dr. Davis has a
                  strong commitment to delivering comprehensive medical care,
                  focusing on preventive medicine, early diagnosis, and
                  effective treatment strategies.
                </Typography>
              </Box>
              <Typography
                variant="body1"
                fontWeight={500}
                color="text.secondary"
                mt={4}
              >
                Appointment Fee:
                <Typography component="span" color="text.primary">
                  50
                </Typography>
              </Typography>
            </DoctorCard>
          </StyledBox>
        ))}

      <Box>
        <Paper sx={{ p: 2 }}>
          <Typography
            sx={{
              mb: 2,
              fontSize: "22px",
              textAlign: "center",
              borderBottom: "1px solid #ccc",
            }}
          >
            {activeDay
              ? activeSlots
                ? `Selected: ${
                    currentMonth + 1
                  }-${activeDay}-${currentYear} ${activeSlots}`
                : "Select an available time"
              : `Today's Date: ${
                  currentMonth + 1
                } ${currentDate}, ${currentYear}`}
          </Typography>
          <Box>
            <Stack sx={{ alignItems: "center" }}>
              <Stack sx={{ maxWidth: "700px", width: "100%" }}>
                <Stack
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <IconButton onClick={handleBackMonth}>
                    <ArrowBackIosIcon sx={{ fontSize: "18px", ml: 0.3 }} />
                  </IconButton>
                  <Typography sx={{ fontSize: "20px", letterSpacing: "2px" }}>
                    {new Date(currentYear, currentMonth).toLocaleString(
                      "default",
                      {
                        month: "long",
                      }
                    )}
                    {currentYear}
                  </Typography>
                  <IconButton onClick={handleNextMonth}>
                    <ArrowForwardIosIcon sx={{ fontSize: "18px" }} />
                  </IconButton>
                </Stack>
                <DaysWrapper>
                  {/* Render weekday headers */}
                  {daysOfWeek.map((day, index) => (
                    <HeaderCell key={index}>
                      <WeekdayText>{day}</WeekdayText>
                    </HeaderCell>
                  ))}

                  {/* Add empty spaces before the first day */}
                  {Array.from({ length: firstDay }).map((_, index) => (
                    <Box key={`empty-${index}`} />
                  ))}

                  {/* Render days in the correct grid position */}
                  {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
                    (day) => (
                      <DayCell
                        key={day}
                        active={activeDay === day}
                        isToday={
                          day === currentDate &&
                          currentMonth === today.getMonth() &&
                          currentYear === today.getFullYear()
                        }
                        isPast={
                          new Date(currentYear, currentMonth, day) < today
                        }
                        onClick={() => {
                          if (
                            new Date(currentYear, currentMonth, day) >= today
                          ) {
                            dispatch(setActiveDay(day));
                          }
                        }}
                      >
                        <DayText active={activeDay === day}>{day}</DayText>
                      </DayCell>
                    )
                  )}
                </DaysWrapper>
              </Stack>
            </Stack>

            <Stack>
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  my: 2,
                  textAlign: "center",
                }}
              >
                Select Time Slot:
              </Typography>

              <Wrapper sx={{ py: 3 }}>
                {timeSlots?.map((slot) => (
                  <TimeCell
                    key={slot?.time}
                    active={activeSlots?.includes(slot?.time)}
                    onClick={() => handleSlotClick(slot.time)}
                  >
                    <DayText active={activeSlots?.includes(slot?.time)}>
                      {slot?.time}
                    </DayText>
                  </TimeCell>
                ))}
              </Wrapper>
            </Stack>
          </Box>

          {activeDay && activeSlots.length >= 1 && (
            <Stack alignItems="center">
              <Button
                onClick={handleAppointmentBook}
                variant="contained"
                disabled={loading || confirmed} 
                sx={{
                  mt: 2,
                  color: "white",
                  width: "240px",
                  background: confirmed ? "gray" : "#000",
                  fontWeight: "bold",
                  "&:hover": { background: confirmed ? "gray" : "#000000d6" },
                }}
              >
                {loading
                  ? "Booking..."
                  : confirmed
                  ? "Appointment Confirmed"
                  : "Book an Appointment"}
              </Button>
            </Stack>
          )}
          {showAlert && (
            <Alert
              severity="info"
              sx={{
                mt: 1,
                top: 0,
                left: "46%",
                zIndex: 9999,
                position: "fixed",
              }}
            >
              your appointment booked successfully
            </Alert>
          )}
        </Paper>
      </Box>

      <RelatedDoctors />
    </Box>
  );
};

export default BookAppointment;
