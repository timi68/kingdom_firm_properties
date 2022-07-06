import React, {Fragment} from "react";
import * as Interfaces from "../../utils/interfaces";
import Footer from "../../components/global/footer";
import Box from "@mui/material/Box";
import Menu from "@mui/icons-material/Menu";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {motion, AnimatePresence} from "framer-motion";
import {variant, NavbarData} from "../../lib/data";
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

const theme = createTheme({
	typography: {
		fontFamily: "Poppins",
	},
});

function Layout(props: Interfaces.LayoutInterface) {
	// const [loading, setLoading] = React.useState<boolean>(true);
	const [width, setWidth] = React.useState<boolean>(true);
	const {children, type, text, exploring} = props;
	const headerRef = React.useRef<HTMLDivElement>(null);

	const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
		const target = e.target as HTMLDivElement;
		if (target.scrollTop > 10) headerRef.current.classList.add("scrolling");
		else headerRef.current.classList.remove("scrolling");
	};

	// React.useEffect(() => {
	// 	setTimeout(() => {
	// 		setLoading(false);
	// 	}, 3000);
	// }, []);

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
										<HouseIcon style={{fontSize: 20}} />
										KFP
									</a>
								</Link>
							</div>
							{exploring && width && (
								<div className="search-form-container">
									<div className="search-form-wrapper">
										<form
											action="#"
											className="form-group search-location"
										>
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
									</div>
								</div>
							)}
							<Navbar exploring={exploring} setWidth={setWidth} />
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

function Navbar(props: {
	exploring: boolean;
	setWidth: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const [state, setState] = React.useState<
		Partial<Interfaces.LayoutStateInterface>
	>({openDrawer: false});
	const [width, setWidth] = React.useState<number>(null);

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
			<nav
				className="page-navbar responsive"
				style={{position: "relative"}}
			>
				<Stack
					spacing={2}
					direction="row"
					alignItems="center"
					className="authetication-wrapper"
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
										<ExploreIcon style={{marginRight: 5}} />
										Explore
									</a>
								</Link>
							</div>
							<div className="link">
								<Link passHref href="/agent-apply">
									<a
										href="#"
										style={{
											display: "flex",
											alignItems: "center",
										}}
									>
										<PeopleIcon style={{marginRight: 5}} />
										Membership
									</a>
								</Link>
							</div>
						</React.Fragment>
					)}
					<div className="login" id="register-btn-wrap">
						<Link href="/login" passHref>
							<Button
								color="info"
								size="small"
								variant="contained"
							>
								Login
							</Button>
						</Link>
					</div>
					<div className="register" id="register-btn-wrap">
						<Link href="/register" passHref>
							<Button
								color="inherit"
								size="small"
								variant="contained"
							>
								Register
							</Button>
						</Link>
					</div>
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
								<ArrowDropDownIcon
									fontSize="medium"
									className="icon-svg"
								/>
							) : (
								<ArrowDropUpIcon
									fontSize="medium"
									className="icon-svg"
								/>
							)}
						</IconButton>
					</div>
				</Stack>
				<AnimatePresence exitBeforeEnter={true} initial={false}>
					{state.openDrawer && (
						<motion.div
							className="drop-down container"
							initial={{opacity: 0.5}}
							animate={{opacity: 1}}
							exit={{opacity: 0}}
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
										<div
											className="login"
											id="register-btn-wrap"
										>
											<Button
												color="info"
												size="small"
												variant="contained"
											>
												Login
											</Button>
										</div>
										<div
											className="register"
											id="register-btn-wrap"
										>
											<Button
												color="inherit"
												size="small"
												variant="contained"
											>
												Register
											</Button>
										</div>
									</Stack>
								</div>
								<Divider />
								<List>
									{NavbarData.map((data, index) => {
										return (
											<Link
												key={index}
												passHref
												href={data.link}
											>
												<a href="#">
													<ListItemButton>
														<ListItemIcon>
															<data.icon fontSize="small" />
														</ListItemIcon>
														<ListItemText
															primary={data.text}
														/>
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
							setState({...state, openDrawer: false});
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
					onClick={() => setState({...state, openDrawer: true})}
				>
					<Menu fontSize="medium" className="icon-svg" />
				</IconButton>
			</div>
			<SwipeableDrawer
				anchor="right"
				open={state.openDrawer}
				onClose={() => setState({...state, openDrawer: false})}
				onOpen={() => setState({...state, openDrawer: true})}
			>
				<div className="drawer container">
					<div className="drawer wrapper">
						<div className="drop-down link-list-header">
							<div className="title">Not signed in</div>
							<Stack direction="row" spacing={1}>
								<div className="login" id="register-btn-wrap">
									<Link href="/login" passHref>
										<Button
											color="info"
											size="small"
											variant="contained"
										>
											Login
										</Button>
									</Link>
								</div>
								<div
									className="register"
									id="register-btn-wrap"
								>
									<Link href="/register" passHref>
										<Button
											color="inherit"
											size="small"
											variant="contained"
										>
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

export default Layout;
