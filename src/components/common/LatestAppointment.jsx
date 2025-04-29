import Typography from "@mui/material/Typography";
import { FaArrowUp } from "react-icons/fa6";
import { Card, Stack, Box, useTheme } from "@mui/material";
import doc1 from '../../assets/doc1.png'


const doctors = [
  {
    id: 1,
    name: "Dr. Vshal",
    specialty: "GP",
    date: "13 Oct 2025",
    image: doc1,
  },
];

const LatestAppointment = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        gap: "20px",
        width: "100%",
        display: "flex",
        paddingTop: "15px",
        marginLeft: { xs: "0px", sm: "12px" },
        maxWidth: "350px",

      }}
    >
      <Card
        sx={{
          width: "100%",
          padding: "16px",
          borderRadius: "30px",
          background: theme.palette.mode === "dark" ? "#303030" : "#ddd8f3",
        }}
      >
        <Stack spacing={1}>
          <Stack sx={{ gap: "6px", }}>
            <Stack flexDirection="row" justifyContent="space-between" gap={2} sx={{ color: theme.palette.mode === "dark" ? "#089bab" : "#374151", }}>
              <Box>
                <Typography sx={{ fontWeight: 600 }}>
                  Latest Appointmente
                </Typography>

              </Box>
              {/* <Box
                sx={{
                  height: "50px",
                  minWidth: "50px",
                  display: "flex",
                  borderRadius: "50%",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "white",
                }}
              >
                <FaArrowUp style={{ rotate: "45deg" }} />
              </Box> */}
            </Stack>
          </Stack>

          {doctors.map((doctor) => (
            <Card
              key={doctor.id}
              sx={{
                padding: "10px",
                display: "flex",
                borderRadius: "50px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Stack
                flexDirection="row"
                sx={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Stack flexDirection="row" gap={1}>
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    width={48}
                    height={48}
                    style={{
                      borderRadius: "50%",
                      background: "#c3c5cc",
                    }}
                  />
                  <Box>
                    <Typography sx={{ fontWeight: 600 }}>
                      {doctor.name}
                    </Typography>

                    <Stack flexDirection="row" alignItems="center" gap={0.5}>
                      <Typography color="text.secondary"
                        sx={{
                          fontSize: "11px",
                          fontWeight: 500,
                        }}
                      >
                        {doctor.specialty}
                      </Typography>

                      <Box
                        sx={{
                          background: "#696868",
                          padding: "1px",
                          height: "2px",
                          width: "2px",
                          borderRadius: "50px",
                        }}
                      />

                      <Typography color="text.secondary"
                        sx={{
                          fontSize: "11px",
                          fontWeight: 500,
                        }}
                      >
                        {doctor.date}
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
                <FaArrowUp style={{ marginRight: "15px", rotate: "45deg" }} />
              </Stack>
            </Card>
          ))}
        </Stack>
      </Card>
    </Box>
  );
};

export default LatestAppointment;



