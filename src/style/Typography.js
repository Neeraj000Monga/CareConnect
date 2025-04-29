import { styled, Typography } from "@mui/material";

export const Heading = styled(Typography)(({ theme }) => ({
    fontSize: "1.5rem",
    fontWeight: 700,
    color: theme.palette.mode === "dark" ? "#a7a7a7" : "#374151",
}));