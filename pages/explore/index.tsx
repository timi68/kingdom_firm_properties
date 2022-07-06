import React from "react";
import Link from "next/link";
import Layout from "../../src/components/layout";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import BedIcon from "@mui/icons-material/Bed";
import BathroomIcon from "@mui/icons-material/Bathroom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SquareFootOutlinedIcon from "@mui/icons-material/SquareFootOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import Selectable from "../../src/components/selectable";
import { useRouter } from "next/router";
import {
  Typography,
  Stack,
  TextField,
  Button,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  IconButton,
  Tooltip,
} from "@mui/material";
import { PropertyData } from "../../lib/data";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Filter from "../../src/components/filter";
import Property from "../../src/components/property";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const SortType = [
  "Price: low - high",
  "Price: high - low",
  "New buildings",
  "Under Construction",
];

function Explore() {
  const router = useRouter();
  const FilterRef = React.useRef<HTMLDivElement>(null);

  return (
    <Layout exploring>
      <div className="display-grid explore-content">
        <Filter filterRef={FilterRef} />
        <div className="matched-searched-section">
          <div className="search-form-group-wrapper">
            <form action="#" className="form-group search-location">
              <div className="form-control">
                <input
                  type="text"
                  className="text-control inputbox search-text"
                  role="searchbox"
                  autoComplete="new-search"
                  placeholder="Enter a location to lookup"
                />
                <button
                  role="search"
                  className="search-btn"
                  id="search-trigger"
                >
                  <SearchRoundedIcon fontSize="medium" />
                </button>
              </div>
            </form>
            <div className="search-result-count">
              <div className="text">100 of 200 results displayed</div>
            </div>
          </div>
          <div className="search-results-conatiner">
            <div className="section-wrapper">
              <div className="section-header">
                <div className="title">Matched result</div>
                <Stack direction="row" spacing={2}>
                  <Tooltip title="Filter property">
                    <div className="filter-btn">
                      <IconButton
                        onClick={() => {
                          FilterRef.current!.classList.toggle("visible");
                        }}
                      >
                        <FilterAltIcon sx={{ fill: "#e47e10" }} />
                      </IconButton>
                    </div>
                  </Tooltip>
                  <div className="sort-wrapper">
                    <div className="sort-form-control">
                      <Selectable
                        label="Sort by"
                        default={SortType[0]}
                        items={SortType}
                      />
                    </div>
                  </div>
                </Stack>
              </div>
              <div className="search-results">
                {/* @ts-ignore */}
                {[...new Array(20).keys()].map((index) => {
                  return <Property property={PropertyData[0]} key={index} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Explore;
