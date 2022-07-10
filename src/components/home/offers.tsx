import {cardProps} from "../../../lib/data";
import {Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import React from "react";


export default function Offers(): JSX.Element {
  return(
    <section className="home-main-content page-content">
      <Box mb={5}>
        <Typography variant={'h6'} className="section-title title" >Here’s how we can help you.</Typography>
      </Box>
      <div className="card-wrapper" role="listbox">
        {cardProps.map((card, index) => {
          return (
            <Card elevation={0} className={'offer-card card'} key={index} role="listitem">
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
                <Button
                  variant="contained"
                  color={'warning'}
                  sx={{textTransform: 'none'}}
                  size="small"
                >
                  {card.label}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  )
}
