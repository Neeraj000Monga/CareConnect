import { Box, Button, Paper, styled, Typography, Stack } from "@mui/material";

export const DaysWrapper = styled(Box)({
  gap: "2px",
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
});

export const Wrapper = styled(Box)({
  boxShadow:
    "inset 10px 10px 15px rgba(0,0,0,0.05), 15px 25px 20px rgba(0,0,0,.1), 15px 20px 20px rgba(0,0,0,0.05)",
  gap: "2px",
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
});

export const WeekdayText = styled(Typography)({
  fontSize: "14px",
  letterSpacing: "2px",
  fontWeight: 600,
});

export const HeaderCell = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "40px",
  display: "flex",
  minWidth: "40px",
  alignItems: "center",
  background: "#cccccc45",
  justifyContent: "center",
  border: "1px solid #ccc",
  "&:hover": {
    backgroundColor: "#a7a7a745",
  },
}));

export const DayText = styled(Typography)(({ active, isPast }) => ({
  fontSize: "14px",
  color: isPast ? "#aaa" : active ? "white" : "#6a6a6a",
}));

export const DayCell = styled(Box)(({ active, isToday, isPast, theme }) => ({
  height: "35px",
  minWidth: "40px",
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

export const TimeCell = styled(Button)(({ active, isPast, theme }) => ({
  width: "85px",
  height: "35px",
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

export const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
  },
}));

export const DoctorCard = styled(Paper)(({ theme }) => ({
  flex: 1,
  border: "1px solid #BDBDBD",
  borderRadius: "8px",
  padding: "12px 16px",
  backgroundColor: "#fff",
  position: "relative",
  bottom: "50px",
  margin: "0px 10px",
  [theme.breakpoints.up("sm")]: {
    marginTop: 0,
    padding: "20px 30px",
    bottom: "0px",
    marginLeft: theme.spacing(2),
  },
}));


export const FormWrapper = styled(Stack)(({ theme }) => ({
  gap: "20px",
  flexDirection: "row",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));