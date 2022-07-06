/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unknown-property */
import React from "react";
import Layout from "../../../src/components/layout";
import {
  GetStaticPathsResult,
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsResult,
} from "next";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, Grid, Tooltip } from "@mui/material";
import Swiper from "../../../src/components/overview/swiper";
import Attributes from "../../../src/components/overview/attributes";
import GoogleMap from "../../../src/components/overview/map";
import RelatedProperty from "../../../src/components/overview/related";
import { useRouter } from "next/router";

interface Props {
  params: object;
}

function Overview(props: Props) {
  console.log({ props });
  const router = useRouter();

  return (
    <Layout toggle exploring>
      <div className="overview-container">
        <div className="search-container">
          <Tooltip title="Go back to previous page">
            <div className="arrow-back">
              <IconButton size="small" onClick={() => router.back()}>
                <ArrowBackRoundedIcon />
              </IconButton>
            </div>
          </Tooltip>
          <div className="search-box">
            <input
              type="text"
              name="search"
              placeholder="Enter property location, status or price"
              className="search-control text-control"
            />
            <Tooltip title="Click to search">
              <IconButton type="submit" className="btn search-action search-bt">
                <SearchIcon />
              </IconButton>
            </Tooltip>
          </div>
          <div className="search-result-count">
            <div className="text">
              <span className="count-rendered">400 </span>
              of
              <span className="count-total"> 2000 </span>
              <span>result matched</span>
            </div>
          </div>
        </div>
        <div className="uploader-wrapper">
          <div className="title">
            <span>Property Uploader</span>
            <div className="upload-date">
              <span className="text">This property was uploaded on:</span>
              <span className="date"> Property uploaded date</span>
            </div>
          </div>
          <div className="uploader-profile">
            <div className="profile-image user-image-wrap">
              <img
                src="/images/james.jpg"
                alt="user-image"
                className="user-image"
              />
            </div>
            <div>
              <div className="user-name">
                <span>Oderinde James Oluwatimileyin</span>
              </div>
              <div className="profile-overview">
                <button className="view-profile">
                  <span>View Profile</span>
                </button>
                <button className="contact">
                  <PhoneRoundedIcon fontSize="small" />
                  <span>Contact Agent</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="main-content">
          <div className="map-container">
            <GoogleMap></GoogleMap>
          </div>
          <div className="property-overview-container">
            <Swiper />
            <div className="flash-details">
              <Grid container gap={2} sx={{ placeContent: "space-between" }}>
                <Grid item xs={12}>
                  <div className="property-title">
                    <span className="text">Studio Apartment</span>
                  </div>
                </Grid>
                <Grid item xs={5}>
                  <div className="property-price">
                    <div className="label">Price</div>
                    <div className="price">#3000000</div>
                  </div>
                </Grid>
                <Grid item xs={5}>
                  <div className="property-status">
                    <div className="label">Status</div>
                    <div className="status">For Sale</div>
                  </div>
                </Grid>
                <Grid
                  item
                  container
                  className="wrap"
                  sx={{ placeContent: "space-between" }}
                  xs={12}
                >
                  <Grid item xs={5}>
                    <button className="contact-agent btn">
                      <PhoneRoundedIcon />
                      <span>Contact Agent</span>
                    </button>
                  </Grid>
                  <Grid item xs={5}>
                    <div className="add-wishlist">
                      <FavoriteBorderRoundedIcon />
                      <span className="text">Add to wishlist</span>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
        <Attributes />
        <RelatedProperty />
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = (): GetStaticPathsResult => {
  return { paths: [], fallback: true };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}): Promise<GetStaticPropsResult<{ params: object }>> => {
  console.log({ params });
  return {
    props: { params: { ...params } },
  };
};

export default Overview;
