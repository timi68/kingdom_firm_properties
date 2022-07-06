import React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import SwipeableViews from "react-swipeable-views";

function Attributes() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <div className="property-attributes-container">
      <Box
        sx={{
          bgcolor: "#E5E5E5",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          scrollButtons={false}
          aria-label="scrollable prevent tabs example"
          sx={{
            maxWidth: { xs: "100%", sm: "60%" },
            mx: "auto",
          }}
        >
          <Tab label="Description" />
          <Tab label="Features" />
          <Tab label="Reviews" />
        </Tabs>
      </Box>
      <Box>
        <SwipeableViews
          enableMouseEvents
          animateHeight
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <div className="description swipe-content">
            <div className="title">
              <h2>Description</h2>
            </div>
            <div className="description-text">
              <span>
                This is newly built mansion , with the latest appliances , it
                has everything a client would ever wish for. Stationed in a well
                pleased environment and has a wonderful view around it,
              </span>
            </div>
            <ul className="list">
              <li className="region list-item">
                <span className="title">Region</span>
                <span className="label">South East Lagos</span>
              </li>
              <li className="lga list-item">
                <span className="title">Local Government Area</span>
                <span className="text">Ikate, Lekki</span>
              </li>
              <li className="state list-item">
                <span className="title">State</span>
                <span className="text">Lagos State.</span>
              </li>
              <li className="price list-item">
                <span className="title">Price</span>
                <span className="text">
                  ${Number(30000000).toLocaleString("en")}
                </span>
              </li>
              <li className="status list-item">
                <span className="title">Status</span>
                <span className="text">For Sale</span>
              </li>
              <li className="span-of-property list-item">
                <span className="title">Years of the building</span>
                <span className="text">Less than 4years</span>
              </li>
              <li className="upload-date list-item">
                <span className="title">Property uploaded date</span>
                <span className="text">--------- date here ----------</span>
              </li>
            </ul>
          </div>

          <div className="features swipe-content">
            <div className="title">
              <h2>Features</h2>
            </div>
          </div>
          <div className="reviews swipe-content">
            <div className="title">
              <h2>Reviews</h2>
            </div>
          </div>
        </SwipeableViews>
      </Box>
    </div>
  );
}

export default Attributes;
