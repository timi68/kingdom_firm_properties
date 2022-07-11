import {Box, Button, Grid, Typography} from "@mui/material";
import React from "react";


export default function Management(){
  return (
    <div className="paper management">
      <Grid container gap={{xs: 3, md: 4}} sx={{alignItems: 'center', maxWidth: '1200px', width: '100%', overflow: 'hidden', mx: 'auto!important', flexDirection: {xs: 'column-reverse', md: 'row'},flexWrap: {xs: 'wrap', md: 'nowrap'}}}>
        <Grid item sm={12} md={7}>
          <Box mt={5} className="paper-card-wrapper explore-wrapper">
            <div className="image-wrapper">
              <img
                className="image large-image"
                alt="contentLargeImage"
                src="/images/management.jpg"
              />
            </div>
            <div className="card-content">
              <div className="text">
                <div className="primary-text">WE ARE REAL ESTATE MANAGEMENT</div>
                <div className="secondary-text">
                  Want to be part of our agent community, you just need a click
                </div>
              </div>
              <Button
                variant="contained"
                color="primary"
                className="btn learn-more"
              >
                Join our member
              </Button>
            </div>
          </Box>
        </Grid>
        <Grid item sm={12} md={5} sx={{mb: {xs: 10}}}>
          <Box className="section-header">
            <Typography textAlign={{xs: "center", md: 'left'}} variant="h4" fontWeight="900">
              We Provide List Of Properties Available For Lease And In Depth Information About The Asset.
              <Typography variant="subtitle1">
                We act as a link between owners and buyers.
              </Typography>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}
