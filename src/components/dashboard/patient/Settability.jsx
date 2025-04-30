import { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  Paper,
  Alert,
  IconButton,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveDay,
  toggleActiveSlot,
  setMonth,
  setYear,
  toggleAlert,
} from "../../../redux/bookApointmentSlice";
import {
  DaysWrapper,
  Wrapper,
  WeekdayText,
  HeaderCell,
  DayCell,
  TimeCell,
  DayText,
  TimeText,
} from "../../../style/Style";

const timeSlots = [];
let startHour = 10; // 10 AM
let endHour = 22; // 10 PM

for (let hour = startHour; hour < endHour; hour++) {
  for (let minutes of [0, 30]) {
    let period = hour < 12 ? "AM" : "PM";
    let formattedHour = hour > 12 ? hour - 12 : hour;
    formattedHour = formattedHour === 0 ? 12 : formattedHour;

    let timeString = `${formattedHour}:${minutes === 0 ? "00" : "30"
      } ${period}`;
    timeSlots.push({ time: timeString });
  }
}

const Settability = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today.getDate());

  const dispatch = useDispatch();

  const { activeDay, activeSlots, showAlert, currentMonth, currentYear } =
    useSelector((state) => state.bookapointment);


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

  const handleAppointmentBook = () => {
    dispatch(toggleAlert());
  };

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  return (
    <Box sx={{ py: 8 }}>
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
              ? `Selected: ${currentMonth + 1
              }-${activeDay}-${currentYear} ${activeSlots}`
              : "Select an available time"
            : `Today's Date: ${currentMonth + 1
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
                      isPast={new Date(currentYear, currentMonth, day) < today}
                      onClick={() => {
                        if (new Date(currentYear, currentMonth, day) >= today) {
                          dispatch(setActiveDay(day));
                        }
                      }}
                    >
                      <DayText isPast={new Date(currentYear, currentMonth, day) < today} active={activeDay === day}>{day}</DayText>
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
                  <TimeText active={activeSlots?.includes(slot?.time)}>
                    {slot?.time}
                  </TimeText>
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
              sx={{
                mt: 2,
                color: "white",
                width: "240px",
                background: "#000",
                fontWeight: "bold",
                "&:hover": { background: "#000000d6" },
              }}
            >
              Book an appointment
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
  );
};

export default Settability;
