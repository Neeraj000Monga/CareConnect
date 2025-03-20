import Typography from "@mui/material/Typography";
import { FaArrowUp } from "react-icons/fa6";
import { Card, Stack, Box } from "@mui/material";
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
  return (
    <Box
      sx={{
        gap: "20px",
        width: "100%",
        display: "flex",
        paddingTop: "15px",
        marginLeft:'12px',
        maxWidth: "350px",
       
      }}
    >
      <Card
        sx={{
          width: "100%",
          padding: "16px",
          borderRadius: "30px",
          background: "#ddd8f3",
        }}
      >
        <Stack spacing={1}>
          <Stack sx={{  gap: "6px",  }}>
            <Stack flexDirection="row" justifyContent="space-between" gap={2}>
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
                      <Typography
                        sx={{
                          fontSize: "11px",
                          color: "#4f4d4d",
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

                      <Typography
                        sx={{
                          fontSize: "11px",
                          color: "#696868",
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



