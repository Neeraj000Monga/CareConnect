import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { MdNotifications } from "react-icons/md";
import { fetchUserProfile } from "../../redux/profileSlice";
import doc9 from "../../assets/doc9.png";
import doc13 from "../../assets/doc13.png";

const alerts = [
  { type: "New Appointment", color: "#2563eb" },
  { type: "Canceled Appointment", color: "#dc2626" },
  { type: "New Review", color: "#16a34a" },
];

const RightSideProfile = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.user);
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, []);

  if (!profile) {
    return <Typography sx={{ p: 2 }}>Loading...</Typography>;
  }

  return (
    <Stack flexDirection="row">
      <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
      <Stack sx={{ width: "100%" }}>
        <Typography mt={3} fontWeight="bold" color="#616161">
          Profile
        </Typography>

        {/* Profile Section */}
        <Stack sx={{ mt: 1, alignItems: "center" }}>
          <img
            src={profile?.profilePic}
            alt="Profile"
            style={{
              width: 80,
              height: 80,
              objectFit: "cover",
              borderRadius: "50%",
              background: "aliceblue"
            }}
          />
          <Typography fontWeight="bold">{profile.name}</Typography>
          <Typography sx={{ fontSize: 14, color: "gray" }}>
            {profile.age} Years, {profile.location}
          </Typography>
        </Stack>

        {/* Health Info Section */}
        {userRole === "patient" ? (
          <Stack
            sx={{
              my: 1,
              gap: 2,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                width: "100%",
              }}
            >
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  width: "100%",
                }}
              >
                <Box textAlign="center">
                  <Typography color="#089bab" fontWeight={600}>
                    Weight
                  </Typography>
                  <Typography fontWeight={600}>{profile.weight}</Typography>
                </Box>
                <Divider orientation="vertical" flexItem sx={{ height: "40px" }} />
                <Box textAlign="center">
                  <Typography color="#089bab" fontWeight={600}>
                    Height
                  </Typography>
                  <Typography fontWeight={600}>{profile?.height}</Typography>
                </Box>
                <Divider orientation="vertical" flexItem sx={{ height: "40px" }} />
                <Box textAlign="center">
                  <Typography color="#089bab" fontWeight={600}>
                    Blood Group
                  </Typography>
                  <Typography fontWeight={600}>{profile?.bloodgroup}</Typography>
                </Box>
              </Stack>
            </Box>
          </Stack>
        ) : (
          <Stack
            sx={{
              my: 1,
              gap: 2,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                width: "100%",
              }}
            >
              <Stack
                sx={{
                  gap: "20px",
                  flexDirection: "row",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Box textAlign="center">
                  <Typography color="#089bab" fontWeight={600}>
                    License No
                  </Typography>
                  <Typography fontWeight={600}>{profile?.licenseNo}</Typography>
                </Box>
                <Divider orientation="vertical" flexItem sx={{ height: "40px" }} />
                <Box textAlign="center">
                  <Typography color="#089bab" fontWeight={600}>
                    Fees
                  </Typography>
                  <Typography fontWeight={600}>{profile?.fees}</Typography>
                </Box>
              </Stack>
            </Box>
          </Stack>
        )}

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
      </Stack>
      <Divider orientation="vertical" flexItem sx={{ ml: 1 }} />
    </Stack>
  );
};

export default RightSideProfile;
