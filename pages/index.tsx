/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import Layout from "../src/components/layout";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Selectable from "../src/components/selectable";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { StateProps } from "../utils/interfaces";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Card,
  CardActionArea,
  CardActions,
  Button,
  CardMedia,
  CardContent,
  IconButton,
  FormControl,
  TextField,
  Typography,
  Select,
  Stack,
  Box, Grid,
} from "@mui/material";
import Slider from "../src/components/home/slider";
import { cardProps } from "../lib/data";
import TopAvailableLeasing from "../src/components/home/topAvailableLeasing";
import Offers from "../src/components/home/offers";
import Management from "../src/components/home/management";

const PropertyTypes = [
  "Mini flat",
  "Duplex",
  "Single room",
  "Bungalow",
  "Mansion",
  "Hostel",
];
function Home() {
  SwiperCore.use([Pagination, Autoplay]);

  return (
    <Layout>
      <div className="slider-content">
        <Slider />
        <div className="title-content swiper-top-layer">
          <Typography
            textAlign="center"
            variant="h4"
            color="#fff"
            fontWeight="900"
          >
            Get Your Hands On Best Leasing Deal
            <Typography variant="subtitle1" color="#fff">
              Amazing deals to invest on.
            </Typography>
          </Typography>
        </div>
      </div>
      <Box className="good-hands paper" mt={{xs: 10, sm: 10}}>
        <Grid container gap={{xs: 3, md: 4}} sx={{alignItems: 'center', maxWidth: '1200px', width: '100%', overflow: 'hidden', mx: 'auto!important', flexDirection: {xs: 'column-reverse', md: 'row'},flexWrap: {xs: 'wrap', md: 'nowrap'}}}>
          <Grid item sm={12} md={7}>
            <Box mt={5} className="paper-card-wrapper explore-wrapper">
              <div className="image-wrapper">
                <img
                  className="image large-image"
                  alt="contentLargeImage"
                  src="/images/contentImageLarge.png"
                />
              </div>
              <Box sx={{top: {sm: '10%!important'}}} className="card-content">
                <div className="text">
                  <div className="primary-text">You are in good hands</div>
                  <div className="secondary-text">
                    Everything will do is always transparent to our client, your
                    deal is save as update on process of your dream home. We always
                    want premium satisfaction for our clients.
                  </div>
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  className="btn learn-more"
                >
                  Learn more
                </Button>
              </Box>
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
      </Box>
      <TopAvailableLeasing />
      <Box mt={{xs: 5, md: 15}} className="paper hostels">
        <Grid container gap={{xs: 3, md: 4}} sx={{alignItems: 'center', maxWidth: '1200px', mx: 'auto!important', flexWrap: {xs: 'wrap', md: 'nowrap'}}}>
          <Grid item sm={12} md={5} sx={{mb: {xs: 10}}}>
            <Box className="section-header">
              <Typography textAlign={{xs: "center", md: 'right'}} variant="h4" fontWeight="900">
                We help Solve Accommodation Issue Around Yaba Axis
                <Typography variant="subtitle1">
                  we get you a save place and best place to stay.
                </Typography>
              </Typography>
            </Box>
          </Grid>
          <Grid item sm={12} md={7}>
            <Box mt={5} className="paper-card-wrapper explore-wrapper">
              <div className="image-wrapper">
                <img
                  className="image large-image"
                  alt="contentLargeImage"
                  src="/images/dark image.jpg"
                />
              </div>
              <div className="card-content">
                <div className="text">
                  <div className="primary-text">
                    ARE YOU A STUDENT LOOKING FOR HOSTEL CLOSE TO YOUR SCHOOL
                  </div>
                  <div className="secondary-text">TRY EXPLORE YOU CAN GET ONE</div>
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  className="btn learn-more"
                >
                  Explore Now
                </Button>
              </div>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Offers/>
      <Management />
    </Layout>
  );
}

function Filter(): JSX.Element {
  const [expand, setExpand] = React.useState<boolean>(false);
  const [state, setState] = React.useState<StateProps>({
    propertyType: "Mini flat",
    status: "SALE",
    minPrice: 500_000,
    maxPrice: 1_000_000,
    bedrooms: 2,
    bathrooms: 3,
    location: "Lekki Ajah",
  });

  const handleChange = (
    event: PointerEvent | React.ChangeEvent<HTMLInputElement>
  ) => {
    const target = event.target as HTMLInputElement;
    setState({ ...state, [target.name]: target.value });
  };

  console.log({ state });
  return (
    <React.Fragment>
      <motion.div
        initial={{ height: 80 }}
        animate={{ height: expand ? "fit-content" : 80 }}
        className="form-group"
      >
        <div className="price-group">
          <Typography
            component="h3"
            variant="body2"
            fontWeight={400}
            sx={{ color: "grey" }}
            mb={2}
          >
            Price Range
          </Typography>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Selectable
              label="Min*"
              name="minPrice"
              onChange={handleChange}
              default={state.minPrice}
            />
            <RemoveIcon fontSize="small" />
            <Selectable
              label="Max*"
              name="maxPrice"
              minPrice={state.minPrice}
              onChange={handleChange}
              default={state.maxPrice}
            />
          </Stack>
        </div>

        <div className="property-type">
          <Typography
            component="h3"
            variant="body2"
            fontWeight={400}
            sx={{ color: "grey" }}
            mb={2}
          >
            Property Type
          </Typography>
          <Selectable
            label="Type*"
            name="propertyType"
            default={state.propertyType}
            onChange={handleChange}
            items={PropertyTypes}
          />
        </div>
        <div className="status">
          <Typography
            component="h3"
            variant="body2"
            fontWeight={400}
            sx={{ color: "grey" }}
            mb={2}
          >
            Status*
          </Typography>
          <Selectable
            label="Status*"
            name="status"
            default={state.status}
            onChange={handleChange}
            items={["RENT", "SALE", "LEASE"]}
          />
        </div>
        <div className="bathroom">
          <Typography
            component="h3"
            variant="body2"
            fontWeight={400}
            sx={{ color: "grey" }}
            mb={2}
          >
            Bathrooms*
          </Typography>
          <Selectable
            label="Bathrooms*"
            name="bathrooms"
            default={state.bathrooms}
            items={[1, 2, 3, 4, 5]}
            onChange={handleChange}
          />
        </div>
        <div className="bedroom">
          <Typography
            component="h3"
            variant="body2"
            fontWeight={400}
            sx={{ color: "grey" }}
            mb={2}
          >
            Bedrooms*
          </Typography>
          <Selectable
            label="Bedrooms*"
            name="bedrooms"
            default={state.bedrooms}
            onChange={handleChange}
            items={[1, 2, 3, 4, 5]}
          />
        </div>
        <div className="city state">
          <Typography
            component="h3"
            variant="body2"
            fontWeight={400}
            sx={{ color: "grey" }}
            mb={2}
          >
            City | State | Location
          </Typography>
          <TextField
            label="target"
            size="small"
            name="location"
            // @ts-ignore
            onChange={handleChange}
            value={state.location}
            variant="outlined"
          />
        </div>
      </motion.div>
      <div className="form-action">
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography
            component="div"
            variant="caption"
            color="primary"
            display="flex"
            alignItems="center"
            onClick={() => setExpand(!expand)}
          >
            <AddIcon color="primary" fontSize="small" />{" "}
            {!expand ? "Expand " : "Collapse "}
            Filter
          </Typography>
          <Button size="small" variant="contained" className="btn action-btn">
            Search
          </Button>
        </Stack>
      </div>
    </React.Fragment>
  );
}
export default Home;
