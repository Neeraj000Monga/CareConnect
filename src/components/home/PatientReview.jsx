import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Box,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  ArrowBackIos,
  ArrowForwardIos,
  Star,
  StarHalf,
  StarBorder,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { styled } from "@mui/system";

const SectionWrapper = styled("div")({
  padding: "60px 0",
  textAlign: "center",
  position: "relative",
});

const ReviewCard = styled(Card)({
  textAlign: "center",
  padding: "20px",
  margin: "10px",
  transition: "all 0.3s ease-in-out",
  minHeight: "250px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  "&:hover": {
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
  },
});

const ActiveReviewCard = styled(ReviewCard)({
  transform: "scale(1.1)",
  boxShadow: "0 12px 30px rgba(0, 0, 0, 0.3)",
  background: "#E3F2FD",
});

const reviews = [
  { id: 1, name: "John Doe", review: "The platform made booking effortless. Highly recommend!", rating: 5, avatar: "https://via.placeholder.com/50" },
  { id: 2, name: "Jane Smith", review: "Great experience! I found the best doctor in just a few clicks.", rating: 4.5, avatar: "https://via.placeholder.com/50" },
  { id: 3, name: "Michael Lee", review: "Easy to use and super convenient for scheduling check-ups.", rating: 4, avatar: "https://via.placeholder.com/50" },
  { id: 4, name: "Emma Wilson", review: "Fast, reliable, and great customer support. Love it!", rating: 5, avatar: "https://via.placeholder.com/50" },
  { id: 5, name: "David Brown", review: "The UI is intuitive, and the doctors are top-notch!", rating: 4, avatar: "https://via.placeholder.com/50" },
  { id: 6, name: "Olivia Taylor", review: "Highly professional service. Booking was seamless!", rating: 4.5, avatar: "https://via.placeholder.com/50" },
];

const ReviewCardItem = ({ review, isActive }) => (
  <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
    <Box component={isActive ? ActiveReviewCard : ReviewCard}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" color="secondary">
          Very Caring
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ my: 1 }}>
          {review.review}
        </Typography>
        <StarRating rating={review.rating} />
        <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
          <Avatar src={review.avatar} sx={{ width: 50, height: 50, mr: 2 }} />
          <Typography variant="body2" fontWeight="bold">
            {review.name}
          </Typography>
        </Box>
      </CardContent>
    </Box>
  </motion.div>
);

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <Box display="flex" justifyContent="center" my={1}>
      {[...Array(fullStars)].map((_, i) => <Star key={i} sx={{ color: "#FFD700" }} />)}
      {hasHalfStar && <StarHalf sx={{ color: "#FFD700" }} />}
      {[...Array(emptyStars)].map((_, i) => <StarBorder key={i} sx={{ color: "#FFD700" }} />)}
    </Box>
  );
};

const PatientReview = () => {
  const [index, setIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const nextReview = () => setIndex((prev) => (prev + (isMobile ? 1 : 3)) % reviews.length);
  const prevReview = () => setIndex((prev) => (prev - (isMobile ? 1 : 3) + reviews.length) % reviews.length);

  useEffect(() => {
    const interval = setInterval(nextReview, 3000);
    return () => clearInterval(interval);
  }, [isMobile]);

  const displayedReviews = useMemo(() => reviews.slice(index, index + (isMobile ? 1 : 3)), [index, isMobile]);

  return (
    <SectionWrapper>
      <Container>
        <Typography variant="h4" gutterBottom>
          What Our Patients Say about our service
        </Typography>
        <Box position="relative">
          {/* Left Navigation Button - Only on Mobile */}
          {isMobile && (
            <IconButton
              onClick={prevReview}
              sx={{
                position: "absolute",
                top: "50%",
                left: 0,
                transform: "translateY(-50%)",
                background: "#FFF",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                "&:hover": { background: "#E3F2FD" },
              }}
            >
              <ArrowBackIos />
            </IconButton>
          )}

          {/* Review Cards */}
          <Grid container spacing={3} justifyContent="center">
            {displayedReviews.map((review, i) => (
              <Grid item xs={12} sm={6} md={4} key={review.id}>
                <ReviewCardItem review={review} isActive={!isMobile && i === 1} />
              </Grid>
            ))}
          </Grid>

          {/* Right Navigation Button - Only on Mobile */}
          {isMobile && (
            <IconButton
              onClick={nextReview}
              sx={{
                position: "absolute",
                top: "50%",
                right: 0,
                transform: "translateY(-50%)",
                background: "#FFF",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                "&:hover": { background: "#E3F2FD" },
              }}
            >
              <ArrowForwardIos />
            </IconButton>
          )}
        </Box>
      </Container>
    </SectionWrapper>
  );
};

export default PatientReview;
