import {Button, Card, CardActionArea, CardActions, CardContent, IconButton} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import React from "react";


export default function Neighbourhood(){
  return (
    <section className="know-about neighbourhoods">
      <div className="know-about-wrapper">
        <div className="section-header">
          <div className="primary-text">
            <div className="text">Know about neighbourhoods on KFP</div>
          </div>
          <div className="secondary-text description brief-about-r">
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
  )
}
