import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { MdNotifications } from "react-icons/md";
import doc1 from "../../assets/doc1.png";
import doc9 from "../../assets/doc9.png";
import doc13 from "../../assets/doc13.png";
import React from "react";

const alerts = [
  { type: "New Appointment", color: "#2563eb" },
  { type: "Canceled Appointment", color: "#dc2626" },
  { type: "New Review", color: "#16a34a" },
];

const RightSideProfile = () => {
  const role = 'patient'
  // const role = "doctor"; 


  return (
    <Box>
      <Typography fontWeight="bold" color="#616161">Profile</Typography>

      {/* Profile Section */}
      <Box
        sx={{
          mt: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={doc1}
          alt="Profile"
          style={{
            background: "pink",
            borderRadius: "50%",
            height: 80,
            width: 80,
            objectFit: "cover",
          }}
        />
        <Typography fontWeight="bold">Neeraj Monga</Typography>
        <Typography sx={{ fontSize: 14, color: "gray" }}>
          26 Years, Faridabad
        </Typography>
      </Box>

      {/* Health Info Section */}
      <Box
  sx={{
    my: 1,
    display: "flex",
    gap: 2,
    justifyContent: "space-around",
    alignItems: "center",
  }}
>
  {(role === "patient"
    ? [
        { label: "Weight", value: "72" },
        { label: "Height", value: "172" },
        { label: "Blood Group", value: "B+" },
      ]
    : [
        { label: "Overall Rating", value: "4.8" },
        { label: "Total Patients", value: "120" },
      ]
  ).map(({ label, value }, index, array) => (
    <Box
      key={label}
      sx={{ display: "flex", alignItems: "center", gap: 2 }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography color="#089bab" fontWeight={600}>
          {label}
        </Typography>
        <Typography fontWeight={600}>{value}</Typography>
      </Box>
      {index < array.length - 1 && (
        <Divider orientation="vertical" flexItem sx={{ height: "40px" }} />
      )}
    </Box>
  ))}
</Box>

      <Divider />

      {/* Notifications Section */}
      <Stack sx={{ padding: "10px 15px 0", gap: "10px" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <MdNotifications color="#eab308" />
          <Typography fontWeight={600}>Alerts</Typography>
        </Box>

        {alerts.map(({ type, color }) => (
          <Box
            key={type}
            sx={{
              height: 60,
              display: "flex",
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
              <Stack flexDirection="row" gap={2}>
                <img
                  src={doc13}
                  alt="Alert Icon"
                  width={48}
                  height={48}
                  style={{ borderRadius: "50%", background: "gray" }}
                />
                <Box>
                  <Typography
                    sx={{ fontWeight: 600, whiteSpace: "nowrap" }}
                    color={color}
                  >
                    {type}
                  </Typography>
                  <Stack flexDirection="row" alignItems="center" gap={0.5}>
                    <Typography
                      sx={{ fontSize: 11, color: "#696868", fontWeight: 600 }}
                    >
                      Andrew Grey
                    </Typography>
                    <Box
                      sx={{
                        background: "#ccc",
                        width: 2,
                        height: 2,
                        borderRadius: "50%",
                      }}
                    />
                    <Typography
                      sx={{ fontSize: 11, color: "#9b9a9a", fontWeight: 600 }}
                    >
                      30 min ago
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
              {/* <Typography sx={{ fontSize: 11, color: "#9b9a9a", fontWeight: 500 }}>30 min ago</Typography> */}
            </Stack>
          </Box>
        ))}
      </Stack>

      {/* Promotional Section */}
      <Box
        sx={{
          mt: 1,
          height: 150,
          display: "flex",
          borderRadius: 2,
          background: "#a26bfa",
          position: "relative",
          p: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography fontWeight="500" color="white" sx={{ fontSize: 18 }}>
            Need
          </Typography>
          <Typography variant="h6" fontWeight="bold" color="white">
            More?
          </Typography>
          <Button variant="contained" sx={{ background: "#fdad00" }}>
            Upload
          </Button>
        </Box>
        <img
          src={doc9}
          alt="Upgrade"
          style={{
            width: 150,
            height: 190,
            objectFit: "cover",
            position: "absolute",
            right: 0,
            bottom: 0,
            borderRadius: 14,
          }}
        />
      </Box>
    </Box>
  );
};

export default RightSideProfile;
