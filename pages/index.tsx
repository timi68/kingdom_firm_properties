/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import Layout from "../src/components/layout";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import BedIcon from "@mui/icons-material/Bed";
import BathroomIcon from "@mui/icons-material/Bathroom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SquareFootOutlinedIcon from "@mui/icons-material/SquareFootOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import { slideImages, PropertyData, cardProps } from "../lib/data";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Selectable from "../src/components/selectable";
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
} from "@mui/material";

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
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          pagination={{
            clickable: true,
          }}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
        >
          {slideImages.map((image, index) => {
            return (
              <SwiperSlide className="swiper-slide" key={index}>
                <img
                  src={image.url}
                  alt={image.caption}
                  className="swiper-image"
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="title-content swiper-top-layer">
          <div className="layer-text">
            Find a place you'll love to live
            <div className="primary-text small">
              Beautiful homes made for you.
            </div>
          </div>
        </div>
      </div>
      <div className="good-hands paper">
        <div className="good-hands-card paper-card-wrapper">
          <div className="image-wrapper">
            <img
              className="image large-image"
              alt="contentLargeImage"
              src="/images/contentImageLarge.png"
            />
          </div>
          <div className="card-content">
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
          </div>
        </div>
      </div>
      <section className="search-section find-homes">
        <Typography component="h3" className="title" variant="h6" my={3}>
          Find Your Next Place To Live
        </Typography>
        <div className="search-filter">
          <Filter />
        </div>
      </section>
      <section className="top-properties properties-container">
        <div className="card-group">
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              "500": {
                slidesPerView: 1,
              },
              "620": {
                slidesPerView: 2,
              },
              "1024": {
                slidesPerView: 3,
              },
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
          >
            {PropertyData.map((property, index) => {
              return (
                <SwiperSlide className="swiper-slide" key={index}>
                  <Card elevation={5} className="card">
                    <CardContent>
                      <CardActionArea>
                        <CardMedia
                          sx={{ maxHeight: 250 }}
                          component="img"
                          src={property.image.url}
                          alt={property.image.caption}
                          className="property-image"
                        />
                      </CardActionArea>
                      <div className="card-body">
                        <Typography
                          variant="caption"
                          display="flex"
                          alignItems="center"
                          my={1}
                          fontWeight={400}
                          className="property-location"
                          gap={1}
                        >
                          <AddLocationIcon fontSize="small" color="secondary" />
                          <span>{property.location}</span>
                        </Typography>
                        <Typography
                          component="h3"
                          variant="body1"
                          color="primary"
                          fontWeight={600}
                          className="property-price"
                        >
                          # {property.price}
                        </Typography>
                        <Typography
                          component="h3"
                          variant="body1"
                          my={1}
                          fontWeight={600}
                          className="property-title"
                        >
                          {property.title}
                        </Typography>
                        <Typography
                          component="div"
                          variant="caption"
                          lineHeight={1.3}
                          fontWeight={400}
                          className="property-description description"
                        >
                          {property.description}
                        </Typography>
                        <div className="property-details-container">
                          <div className="detail-wrapper">
                            <div
                              className="bedrooms detail"
                              aria-labelledby="bedroom-label"
                            >
                              <span className="title">
                                <BedIcon fontSize="medium" className="icon" />
                                <span>{property.bedrooms}</span>
                              </span>
                              <span className="label" id="bedroom-label">
                                Bedrooms
                              </span>
                            </div>
                            <div
                              className="bathrooms detail"
                              aria-labelledby="bathrooms-label"
                            >
                              <span className="title">
                                <BathroomIcon
                                  fontSize="medium"
                                  className="icon"
                                />
                                <span>{property.bathrooms}</span>
                              </span>
                              <span className="label" id="bathrooms-label">
                                Bathrooms
                              </span>
                            </div>
                            <div
                              className="square-feet detail"
                              aria-labelledby="square-feet-label"
                            >
                              <span className="title">
                                <SquareFootOutlinedIcon
                                  fontSize="medium"
                                  className="icon"
                                />
                                <span>{property.sqft}</span>
                              </span>
                              <span className="label" id="square-feet-label">
                                Square Ft
                              </span>
                            </div>
                          </div>
                          <div className="toggle-btn-group">
                            <div className="btn-wrapper">
                              <IconButton size="small" className="icon">
                                <ZoomOutMapIcon fontSize="small" />
                              </IconButton>
                              <IconButton size="small" className="icon">
                                <FavoriteIcon fontSize="small" />
                              </IconButton>
                              <IconButton size="small" className="icon">
                                <AddCircleOutlineOutlinedIcon fontSize="small" />
                              </IconButton>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </section>
      <div className="paper explore">
        <div className="paper-card-wrapper explore-wrapper">
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
        </div>
      </div>
      <section className="home-main-content page-content">
        <div className="section-title title">Here’s how we can help you.</div>
        <div className="card-wrapper" role="listbox">
          {cardProps.map((card, index) => {
            return (
              <Card key={index} role="listitem" elevation={13} className="card">
                <CardActionArea className="card-media-container">
                  <CardMedia
                    component="img"
                    src={card.url}
                    className="card-media image-wrapper"
                  />
                </CardActionArea>
                <CardContent className="card-content">
                  <div className="header-text primary-text">
                    <div className="title">{card.title}</div>
                  </div>
                  <div className="secondary-text">
                    <div className="text">{card.text}</div>
                  </div>
                  <CardActions>
                    <Button
                      variant="contained"
                      size="small"
                      className="card-action-btn btn"
                    >
                      {card.label}
                    </Button>
                  </CardActions>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
      <section className="know-about neighbourhoods">
        <div className="know-about-wrapper">
          <div className="section-header">
            <div className="primary-text">
              <div className="text">Know about neightbourhoods on KFP</div>
            </div>
            <div className="secondary-text desciption brief-about-r">
              <div className="text">
                KFP gives you everyday insight and reviews of a neighbourhood so
                you can decide if a home and neighborhood are right for you.
              </div>
            </div>
          </div>
          <div className="section-body">
            <div className="about-cards-wrapper areas-fast-view fast-access-location">
              <Card className="card about-card" elevation={10}>
                <CardActionArea className="card-action-area">
                  <div className="card-title">
                    <div className="text caption">
                      <span>Ikate, Lekki</span>
                    </div>
                  </div>
                </CardActionArea>
                <CardActions className="card-actions">
                  <Button
                    className="btn"
                    variant="contained"
                    color="inherit"
                    size="small"
                  >
                    {"Find a Home >"}
                  </Button>
                </CardActions>
              </Card>
              <Card className="card about-card" elevation={10}>
                <CardActionArea className="card-action-area">
                  <CardContent>
                    <div className="card-title">
                      <div className="text caption">
                        <div className="primary-text">
                          <span>KFP User</span>
                        </div>
                        <div className="secondary-text">
                          <span>Lekki Resident</span>
                        </div>
                      </div>
                    </div>
                    <div className="text">
                      Lekki Phase 1 is a well planned and mapped-out residential
                      scheme...
                    </div>
                  </CardContent>
                </CardActionArea>
              </Card>
              <Card className="card about-card" elevation={10}>
                <CardActionArea className="card-action-area">
                  <div className="card-title">
                    <div className="text caption">
                      <span>Banana Island</span>
                    </div>
                  </div>
                </CardActionArea>
                <CardActions className="card-actions">
                  <Button
                    className="btn"
                    variant="contained"
                    color="inherit"
                    size="small"
                  >
                    {"Find a Home >"}
                  </Button>
                </CardActions>
              </Card>
            </div>
          </div>
        </div>
        <div className="searchbar search-form-wrapper">
          <form
            action="#"
            className="search-a-city form-group"
            id="search-city"
            role="searchbox"
          >
            <div className="form-control">
              <input
                type="text"
                className="text-control inputbox"
                role="searchbox"
                autoComplete="new-search"
                placeholder="Enter a city name here ..."
              />
              <IconButton
                role="search"
                className="search-btn"
                id="search-trigger"
                type="button"
              >
                <SearchRoundedIcon fontSize="medium" />
              </IconButton>
            </div>
          </form>
        </div>
      </section>
      <div className="paper management">
        <div className="paper-card-wrapper management-wrapper">
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
        </div>
      </div>
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
