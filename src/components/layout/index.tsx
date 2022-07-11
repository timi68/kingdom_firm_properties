import React, { Fragment } from "react";
import * as Interfaces from "../../../utils/interfaces";
import Footer from "../global/footer";
import Box from "@mui/material/Box";
import Menu from "@mui/icons-material/Menu";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { motion, AnimatePresence } from "framer-motion";
import { variant, NavbarData } from "../../../lib/data";
import HouseIcon from "@mui/icons-material/House";
import ExploreIcon from "@mui/icons-material/Explore";
import PeopleIcon from "@mui/icons-material/People";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import {
  IconButton,
  Button,
  Stack,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  createTheme,
} from "@mui/material";
// import {createTheme} from "@mui/system";
import Link from "next/link";
import Navbar from "./Navbar";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins",
  },
});

function Layout(props: Interfaces.LayoutInterface) {
  const [width, setWidth] = React.useState<boolean>(false);
  const { children, type, text, exploring } = props;
  const headerRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target.scrollTop > 10) headerRef.current!.classList.add("scrolling");
    else headerRef.current!.classList.remove("scrolling");
  };
  

  return (
    <ThemeProvider theme={theme}>
      <div className="container" onScroll={handleScroll}>
        <div className="wrapper page-wrapper">
          <div
            className={`header page-header top-header ${
              exploring ? " exploring" : ""
            }`}
            ref={headerRef}
          >
            <div className="header-wrapper">
              <div className="logo-wrapper">
                <Link passHref href="/">
                  <a
                    href="#"
                    className="logo"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "1.5em",
                      fontWeight: 600,
                    }}
                  >
                    <HouseIcon style={{ fontSize: 20 }} />
                    KFP
                  </a>
                </Link>
              </div>
              {/*{exploring && width && (*/}
              {/*  <div className="search-form-container">*/}
              {/*    <div className="search-form-wrapper">*/}
              {/*      <form action="#" className="form-group search-location">*/}
              {/*        <div className="form-control">*/}
              {/*          <input*/}
              {/*            type="text"*/}
              {/*            className="text-control inputbox search-text"*/}
              {/*            role="searchbox"*/}
              {/*            autoComplete="new-search"*/}
              {/*            placeholder="Enter a location to lookup"*/}
              {/*          />*/}
              {/*          <button*/}
              {/*            role="search"*/}
              {/*            className="search-btn"*/}
              {/*            id="search-trigger"*/}
              {/*          >*/}
              {/*            <SearchRoundedIcon fontSize="medium" />*/}
              {/*          </button>*/}
              {/*        </div>*/}
              {/*      </form>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*)}*/}
              <Navbar exploring={exploring as boolean} setWidth={setWidth} />
            </div>
          </div>
          <div className="main" role="main">
            {children}
          </div>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}


export default Layout;
