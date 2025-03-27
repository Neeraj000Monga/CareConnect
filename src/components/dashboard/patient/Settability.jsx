import { useState, useEffect } from "react";
import {
  Box,
  Stack,
  styled,
  Typography,
  Button,
  Paper,
  Alert,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Wrapper = styled(Box)({
  gap: "2px",
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
});

const DaysWrapper = styled(Box)({
  gap: "2px",
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
});

const HeaderCell = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "40px",
  display: "flex",
  minWidth: "50px",
  alignItems: "center",
  background: "#cccccc45",
  justifyContent: "center",
  border: "1px solid #ccc",
  "&:hover": {
    backgroundColor: "#a7a7a745",
  },
}));

const DayCell = styled(Box)(({ active, isToday, isPast, theme }) => ({
  height: "40px",
  minWidth: "50px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid #ccc",
  cursor: isPast ? "not-allowed" : "pointer",
  backgroundColor: active
    ? " #1eb700"
    : isToday
    ? " #ffd700"
    : isPast
    ? " #ffcfcf"
    : "transparent",
  "&:hover": {
    backgroundColor: isPast
      ? " #ffcfcf"
      : active
      ? " #1a9f00"
      : isToday
      ? " #ffc107"
      : " #cccccc2e",
  },
}));
const TimeCell = styled(Button)(({ active, isPast, theme }) => ({
  width: "100px",
  height: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid #ccc",
  cursor: isPast ? "not-allowed" : "pointer",
  [theme.breakpoints.down("md")]: {
    width: "80px",
  },
  backgroundColor: active ? "#45d129" : "white",
  "&:hover": {
    backgroundColor: active ? " #31c913 " : "#cccccc2e",
  },
}));

const DayText = styled(Typography)(({ active, isPast }) => ({
  fontSize: "14px",
  color: isPast ? "#aaa" : active ? "white" : "#6a6a6a",
}));

const WeekdayText = styled(Typography)({
  fontSize: "14px",
  letterSpacing: "2px",
  fontWeight: 600,
});

const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const timeSlots = [];
let startHour = 10; // 10 AM
let endHour = 22; // 10 PM

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

const Settability = () => {
  const today = new Date();
  const [activeDay, setActiveDay] = useState(null);
  const [activeSlot, setActiveSlot] = useState([]);
  const [isDayLocked, setIsDayLocked] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentDate, setCurrentDate] = useState(today.getDate());

  console.log("activeDay", activeDay);
  console.log("activeSlot", activeSlot);

  useEffect(() => {
    setCurrentDate(today.getDate());
  }, []);

  const getDaysInMonth = (month, year) =>
    new Date(year, month + 1, 0).getDate();

  const handleReset = () => {
    setActiveDay(null);
    setActiveSlot([]);
    setIsDayLocked(false);
    setShowAlert(true);
  };

  const handleSlotClick = (slot) => {
    setActiveSlot((prev) =>
      prev.includes(slot)
        ? prev.filter((time) => time !== slot)
        : [...prev, slot]
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
    if (currentMonth === 11) {
      setCurrentYear((prev) => prev + 1);
    }
  };

  const handleBackMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
    if (currentMonth === 0) {
      setCurrentYear((prev) => prev - 1);
    }
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);

  return (
    <Box sx={{ paddingTop: "60px" }}>
      <Paper sx={{ p: 2 }}>
        <Typography
          sx={{
            mb: 2,
            fontSize: "24px",
            textAlign: "center",
            borderBottom: "1px solid #ccc",
          }}
        >
          {activeDay
            ? activeSlot
              ? `Selected: ${
                  currentMonth + 1
                }-${activeDay}-${currentYear} ( ${activeSlot} )`
              : "Select an available time"
            : `Today's Date: ${
                currentMonth + 1
              } ${currentDate}, ${currentYear}`}
        </Typography>
        <Box>
          <Stack>
            <Stack sx={{ maxWidth: "700px", width: "100%", pt: 3 }}>
              <Stack
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <ArrowBackIosIcon fontSize="12px" onClick={handleBackMonth} />
                <Typography sx={{ fontSize: "24px", letterSpacing: "2px" }}>
                  {new Date(currentYear, currentMonth).toLocaleString(
                    "default",
                    {
                      month: "long",
                    }
                  )}
                  {currentYear}
                </Typography>
                <ArrowForwardIosIcon
                  fontSize="12px"
                  onClick={handleNextMonth}
                />
              </Stack>
              <Stack flexDirection="row" sx={{ gap: "2px", mb: "2px" }}>
                {daysOfWeek.map((day, index) => (
                  <HeaderCell key={index}>
                    <WeekdayText>{day}</WeekdayText>
                  </HeaderCell>
                ))}
              </Stack>
              <DaysWrapper>
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
                        if (
                          !isDayLocked &&
                          new Date(currentYear, currentMonth, day) >= today
                        ) {
                          setActiveDay(day);
                          setIsDayLocked(true);
                        }
                      }}
                    >
                      <DayText
                        active={activeDay === day}
                        isPast={
                          new Date(currentYear, currentMonth, day) < today
                        }
                      >
                        {day}
                      </DayText>
                    </DayCell>
                  )
                )}
              </DaysWrapper>
            </Stack>
          </Stack>

          <Stack>
            <Typography
              sx={{ mt: 1, fontSize: "18px", fontWeight: "bold", my: 3 }}
            >
              Select Time Slot:
            </Typography>
            <Wrapper>
              {timeSlots.map((slot) => (
                <TimeCell
                  key={slot.time}
                  active={activeSlot.includes(slot.time)}
                  onClick={() => handleSlotClick(slot.time)}
                >
                  <DayText active={activeSlot.includes(slot.time)}>
                    {slot.time}
                  </DayText>
                </TimeCell>
              ))}
            </Wrapper>
          </Stack>
        </Box>

        <Box>
          {activeDay && activeSlot && (
            <Stack flexDirection="row" gap={2} mt={2}>
              <Typography sx={{ fontSize: "22px", letterSpacing: "2px" }}>
                {`${currentMonth + 1}-${activeDay}-${currentYear}`}
              </Typography>
              <Typography sx={{ fontSize: "22px", color: "#000" }}>
                {`${activeSlot}`}
              </Typography>
            </Stack>
          )}
          {activeDay && activeSlot && (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleReset}
              sx={{ mt: 2 }}
            >
              Unselect Date & Time
            </Button>
          )}
        </Box>

        <Stack flexDirection="row" justifyContent="end">
          {activeDay && activeSlot.length >= 1 && (
            <Alert severity="info" sx={{ border: "1px solid", mt: 1 }}>
              Date & Time Selected
            </Alert>
          )}
          {showAlert && (
            <Alert
              severity="warning"
              sx={{ border: "1px solid", mt: 1 }}
              onClose={() => setShowAlert(false)}
            >
              Date & Time Unselected!
            </Alert>
          )}
        </Stack>
      </Paper>
    </Box>
  );
};

export default Settability;
