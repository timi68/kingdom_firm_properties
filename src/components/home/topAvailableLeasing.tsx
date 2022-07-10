/* eslint-disable react/no-unescaped-entities */
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import BedIcon from "@mui/icons-material/Bed";
import BathroomIcon from "@mui/icons-material/Bathroom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SquareFootOutlinedIcon from "@mui/icons-material/SquareFootOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import { slideImages, PropertyData, cardProps } from "../../../lib/data";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  IconButton,
  Typography,
  Button,
  Box,
  Grid,
} from "@mui/material";

export default function TopAvailableLeasing() {
  return (
    <section className="top-properties properties-container">
      <Typography className={'title'} variant="h6" mb={3} fontWeight={700}>
        Top Leasing Deal To Check
      </Typography>
      <div className="card-group">
        <Grid container spacing={{ xs: 3, md: 3 }}>
          {Array.from(new Array(6)).map((_, index) => {
            return (
              <Grid key={index} item xs={12} sm={6} md={4}>
                <Card elevation={5} className="card">
                  <CardContent>
                    <CardActionArea>
                      <CardMedia
                        sx={{ maxHeight: 250 }}
                        component="img"
                        src={PropertyData[0]["image"].url}
                        alt={PropertyData[0]["image"].caption}
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
                        <span>{PropertyData[0].location}</span>
                      </Typography>
                      <Typography
                        component="h3"
                        variant="body1"
                        color="primary"
                        fontWeight={600}
                        className="property-price"
                      >
                        # {PropertyData[0].price}
                      </Typography>
                      <Typography
                        component="h3"
                        variant="body1"
                        my={1}
                        fontWeight={600}
                        className="property-title"
                      >
                        {PropertyData[0].title}
                      </Typography>
                      <Typography
                        component="div"
                        variant="caption"
                        lineHeight={1.3}
                        fontWeight={400}
                        className="property-description description"
                      >
                        {PropertyData[0].description}
                      </Typography>
                      <div className="property-details-container">
                        <div className="detail-wrapper">
                          <div
                            className="bedrooms detail"
                            aria-labelledby="bedroom-label"
                          >
                            <span className="title">
                              <BedIcon fontSize="medium" className="icon" />
                              <span>{PropertyData[0].bedrooms}</span>
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
                              <span>{PropertyData[0].bathrooms}</span>
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
                              <span>{PropertyData[0].sqft}</span>
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
              </Grid>
            );
          })}
        </Grid>
      </div>
      <Box textAlign="center" my={3}>
        <Typography variant="subtitle1" mb={1.5}>
          Still can't find what you want ???
        </Typography>
        <Button variant="contained" color="warning">
          Explore more
        </Button>
      </Box>
    </section>
  );
}
