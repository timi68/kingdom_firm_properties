import React from "react";
import * as Interfaces from "../../../utils/interfaces";
import {Button, Divider, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Stack} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import {AnimatePresence, motion} from "framer-motion";
import {NavbarData, variant} from "../../../lib/data";
import Link from "next/link";
import Menu from "@mui/icons-material/Menu";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

export default function Navbar(props: {
  exploring: boolean;
  setWidth: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [state, setState] = React.useState<
    Partial<Interfaces.LayoutStateInterface>
    >({ openDrawer: false });
  const [width, setWidth] = React.useState<number>(0);
  
  React.useEffect(() => {
    setWidth(window.innerWidth);
    props.setWidth(window.innerWidth > 700);
    
    const handleResize = () => {
      if (window.innerWidth < 700 || window.innerWidth > 700) {
        setWidth(window.innerWidth);
        props.setWidth(window.innerWidth > 700);
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [props]);
  
  // Render this navbar if user is on desktop
  if (width > 700) {
    return (
      <nav className="page-navbar responsive" style={{ position: "relative" }}>
        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          className="authentication-wrapper"
        >
          {!props.exploring && (
            <React.Fragment>
              <div className="link">
                <Link passHref href="/explore">
                  <a
                    href="#"
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Explore
                  </a>
                </Link>
              </div>
              <div className="link">
                <Link passHref href="/about-us">
                  <a
                    href="#"
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    About us
                  </a>
                </Link>
              </div>
              <div className="link">
                <Link passHref href="/contact-us">
                  <a
                    href="#"
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Contact us
                  </a>
                </Link>
              </div>
              <div className="link">
                <Link passHref href="/blog">
                  <a
                    href="#"
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Blog
                  </a>
                </Link>
              </div>
            </React.Fragment>
          )}
          {/*<div className="login" id="register-btn-wrap">*/}
          {/*  <Link href="/login" passHref>*/}
          {/*    <Button color="info" size="small" variant="contained">*/}
          {/*      Login*/}
          {/*    </Button>*/}
          {/*  </Link>*/}
          {/*</div>*/}
          {/*<div className="register" id="register-btn-wrap">*/}
          {/*  <Link href="/register" passHref>*/}
          {/*    <Button color="inherit" size="small" variant="contained">*/}
          {/*      Register*/}
          {/*    </Button>*/}
          {/*  </Link>*/}
          {/*</div>*/}
          <div className="navigation-icon">
            <IconButton
              role="toolbar"
              className="icon"
              size="small"
              aria-roledescription="it toggle menubar on small screen size [andriod, tablet]"
              onClick={() =>
                setState({
                  ...state,
                  openDrawer: !state.openDrawer,
                })
              }
            >
              {state.openDrawer ? (
                <ArrowDropDownIcon fontSize="medium" className="icon-svg" />
              ) : (
                <ArrowDropUpIcon fontSize="medium" className="icon-svg" />
              )}
            </IconButton>
          </div>
        </Stack>
        <AnimatePresence exitBeforeEnter={true} initial={false}>
          {state.openDrawer && (
            <motion.div
              className="drop-down container"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                variants={variant}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="drop-down wrapper"
              >
                <div className="drop-down link-list-header">
                  <div className="title">Not signed in</div>
                  <Stack direction="row" spacing={1}>
                    <div className="login" id="register-btn-wrap">
                      <Button color="info" size="small" variant="contained">
                        Login
                      </Button>
                    </div>
                    <div className="register" id="register-btn-wrap">
                      <Button color="inherit" size="small" variant="contained">
                        Register
                      </Button>
                    </div>
                  </Stack>
                </div>
                <Divider />
                <List>
                  {NavbarData.map((data, index) => {
                    return (
                      <Link key={index} passHref href={data.link}>
                        <a href="#">
                          <ListItemButton>
                            <ListItemIcon>
                              <data.icon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary={data.text} />
                          </ListItemButton>
                        </a>
                      </Link>
                    );
                  })}
                </List>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        {state.openDrawer && (
          <div
            className="modalSignal"
            style={{
              zIndex: 1000,
              position: "fixed",
              height: "100vh",
              width: "100vw",
              left: 0,
              top: 0,
              backgroundColor: "transparent",
            }}
            onClick={() => {
              setState({ ...state, openDrawer: false });
            }}
          ></div>
        )}
      </nav>
    );
  }
  
  // returns this navbar if user is on mobile
  return (
    <nav className="page-navbar responsive">
      <div className="navigation-icon">
        <IconButton
          role="toolbar"
          className="icon"
          aria-roledescription="it toggle menubar on small screen size [andriod, tablet]"
          onClick={() => setState({ ...state, openDrawer: true })}
        >
          <Menu fontSize="medium" className="icon-svg" />
        </IconButton>
      </div>
      <SwipeableDrawer
        anchor="top"
        open={state.openDrawer as boolean}
        onClose={() => setState({ ...state, openDrawer: false })}
        onOpen={() => setState({ ...state, openDrawer: true })}
      >
        <div className="drawer container">
          <div className="drawer wrapper">
            <div className="drop-down link-list-header">
              <div className="title">Not signed in</div>
              <Stack direction="row" spacing={1}>
                <div className="login" id="register-btn-wrap">
                  <Link href="/login" passHref>
                    <Button color="info" size="small" variant="contained">
                      Login
                    </Button>
                  </Link>
                </div>
                <div className="register" id="register-btn-wrap">
                  <Link href="/register" passHref>
                    <Button color="inherit" size="small" variant="contained">
                      Register
                    </Button>
                  </Link>
                </div>
              </Stack>
            </div>
            <Divider />
            <List>
              {NavbarData.map((data, index) => {
                return (
                  <Link key={index} passHref href={data.link}>
                    <ListItemButton>
                      <ListItemIcon>
                        <data.icon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={data.text} />
                    </ListItemButton>
                  </Link>
                );
              })}
            </List>
          </div>
        </div>
      </SwipeableDrawer>
    </nav>
  );
}
