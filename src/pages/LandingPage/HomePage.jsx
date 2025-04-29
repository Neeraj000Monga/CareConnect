import React from 'react'
import { Box } from '@mui/material'
import Header from '../../components/home/Header'
import HowItWorks from '../../components/home/HowItWorks'
import TopDoctors from '../../components/home/TopDoctors'
import Banner from '../../components/home/Banner'

const HomePage = () => {
  return (
    <Box sx={{ ml: { xs: 2, sm: "10%" },mr:{ xs: 2, sm: "8%" }, pr: { xs: 0, md: "10px"}}}>
        <Header/>
        <HowItWorks/>
        <TopDoctors/>
        <Banner/>
        {/* <PatientReview/> */}
    </Box>
  )
}

export default HomePage