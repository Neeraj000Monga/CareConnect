import { Box, CircularProgress, styled } from "@mui/material";

const Wrapper = styled(Box)({
  top: 0,
  right: 0,
  zIndex: 10000,
  width: "100%",
  height: "100vh",
  display: "flex",
  position: "fixed",
  alignItems: "center",
  background: "#0000003d",
  justifyContent: "center",
});

const Loader = () => {
  return (
    <Wrapper>
      <Box>
        <svg width={0} height={0}>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e01cd5" />
            <stop offset="100%" stopColor="#1CB5E0" />
          </linearGradient>
        </svg>
        <CircularProgress
          sx={{ "svg circle": { stroke: "url(#my_gradient)" } }}
        />
      </Box>
    </Wrapper>
  );
};

export default Loader;
