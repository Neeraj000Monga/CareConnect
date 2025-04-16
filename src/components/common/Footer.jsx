import {
  Box,
  Grid,
  Typography,
  Divider,
  IconButton,
  Link,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  LinkedIn,
  YouTube,
  Instagram,
  LocationOn,
  Email,
  Phone,
} from "@mui/icons-material";
import Logo from "../../assets/CareConnectLogo.png";

const Footer = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Divider sx={{ my: 3 }} />
      <Grid container spacing={2} sx={{ justifyContent: { xs: "start", sm: "center" } }}>
        {/* Company Info */}
        <Grid item sm={12} md={6} lg={4}>
          <Box
            component="img"
            src={Logo}
            alt="CareConnect Logo"
            sx={{ mb: 2, width: 160 }}
          />
          <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
            CareConnect makes it easy to book appointments with doctors,
            ensuring hassle-free healthcare access for patients.
          </Typography>
          <Box sx={{ mt: 3, display: "flex", gap: 1 }}>
            <IconButton color="inherit">
              <Facebook />
            </IconButton>
            <IconButton color="inherit">
              <Twitter />
            </IconButton>
            <IconButton color="inherit">
              <LinkedIn />
            </IconButton>
            <IconButton color="inherit">
              <YouTube />
            </IconButton>
            <IconButton color="inherit">
              <Instagram />
            </IconButton>
          </Box>
        </Grid>

        {/* Quick Links */}
        <Grid item sm={12} md={6} lg={3}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Quick Links
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Link color="inherit" underline="hover">
              Home
            </Link>
            <Link color="inherit" underline="hover">
              About Us
            </Link>
            <Link color="inherit" underline="hover">
              Our Services
            </Link>
            {/* <Link color="inherit" underline="hover">FAQs</Link> */}
            <Link color="inherit" underline="hover">
              Contact Us
            </Link>
          </Box>
        </Grid>

        {/* Services */}
        <Grid item sm={12} md={6} lg={2}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Our Services
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Link color="inherit" underline="hover">
              Find a Doctor
            </Link>
            <Link color="inherit" underline="hover">
              Book an Appointment
            </Link>
            <Link color="inherit" underline="hover">
              Telemedicine
            </Link>
            <Link color="inherit" underline="hover">
              Health Tips
            </Link>
          </Box>
        </Grid>

        {/* Contact Information */}
        <Grid item sm={12} md={6} lg={2}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Contact Us
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <LocationOn fontSize="small" />
            <Typography variant="body2">
              1234 Healthcare St, New York, NY 10001
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <Phone fontSize="small" />
            <Typography variant="body2">+1-123-456-7890</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Email fontSize="small" />
            <Typography variant="body2">support@careconnect.com</Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Footer Bottom */}
      <Divider sx={{ my: 3 }} />
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="body2">
          © {new Date().getFullYear()} CareConnect. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
