import React from "react";
import Link from "next/link";
import Layout from "../../src/layout";
import Selectable from "../../components/selectable";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import BedIcon from "@mui/icons-material/Bed";
import BathroomIcon from "@mui/icons-material/Bathroom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SquareFootOutlinedIcon from "@mui/icons-material/SquareFootOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
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
} from "@mui/material";
import {PropertyData} from "../../lib/data";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import {motion, AnimatePresence} from "framer-motion";

const PropertyTypes = [
	"Mini flat",
	"Duplex",
	"Single room",
	"Bungalow",
	"Mansion",
	"Hostel",
];

export type StateProps = {
	propertyType: string;
	status: string;
	minPrice: number;
	maxPrice: number;
	bedrooms: number;
	bathrooms: number;
};

function Explore() {
	const [expand, setExpand] = React.useState<boolean>(false);
	const [state, setState] = React.useState<StateProps>({
		propertyType: "Mini flat",
		status: "SALE",
		minPrice: 500_000,
		maxPrice: 1_000_000,
		bedrooms: 2,
		bathrooms: 3,
	});

	const handleChange = (event: PointerEvent) => {
		const target = event.target as HTMLInputElement;
		setState({...state, [target.name]: target.value});
	};

	return (
		<Layout exploring>
			<div className="search-filter-container">
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
				</div>
				<motion.div
					initial={{height: 60, overflow: "hidden"}}
					animate={{
						height: expand ? "fit-content" : 60,
						transition: {
							// duration: 0.1,
							type: "just",
							// damping: 50,
							// stiffness: 400,
						},
					}}
					className="search-filter"
				>
					<div className="search-filter-header">
						<Typography
							component="div"
							variant="h6"
							color="primary"
							flexGrow={1}
						>
							Filter
						</Typography>
						<Typography
							component="span"
							variant="caption"
							color="primary"
							display="flex"
							alignItems="center"
							sx={{cursor: "pointer"}}
							onClick={() => setExpand(!expand)}
						>
							<AddIcon color="primary" fontSize="small" />{" "}
							{!expand ? "Expand " : "Collapse "}
							Filter
						</Typography>
					</div>
					<div className="form-group">
						<div className="price-group">
							<Typography
								component="h3"
								variant="body2"
								fontWeight={400}
								sx={{color: "grey"}}
								mb={2}
							>
								Price Range
							</Typography>
							<Stack
								direction="row"
								spacing={0.5}
								alignItems="center"
							>
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
								sx={{color: "grey"}}
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
								sx={{color: "grey"}}
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
								sx={{color: "grey"}}
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
								sx={{color: "grey"}}
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
						{/* <div className="city state">
							<Typography
								component="h3"
								variant="body2"
								fontWeight={400}
								sx={{color: "grey"}}
								mb={2}
							>
								City | State | Location
							</Typography>
							<TextField
								label="target"
								size="small"
								value="Lekki, ajah"
								variant="outlined"
							/>
						</div> */}
					</div>
				</motion.div>
			</div>
			<div className="matched-searched-section">
				<div className="search-results-conatiner">
					<div className="section-wrapper">
						<div className="section-header">
							<div className="title">Matched result</div>
						</div>
						<div className="search-results">
							{PropertyData.map((property, index) => {
								return (
									<Card
										elevation={5}
										className="card"
										key={index}
									>
										<CardContent>
											<CardActionArea>
												<CardMedia
													sx={{maxHeight: 250}}
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
													<AddLocationIcon
														fontSize="small"
														color="secondary"
													/>
													<span>
														{property.location}
													</span>
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
																<BedIcon
																	fontSize="medium"
																	className="icon"
																/>
																<span>
																	{
																		property.bedrooms
																	}
																</span>
															</span>
															<span
																className="label"
																id="bedroom-label"
															>
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
																<span>
																	{
																		property.bathrooms
																	}
																</span>
															</span>
															<span
																className="label"
																id="bathrooms-label"
															>
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
																<span>
																	{
																		property.sqft
																	}
																</span>
															</span>
															<span
																className="label"
																id="square-feet-label"
															>
																Square Ft
															</span>
														</div>
													</div>
													<div className="toggle-btn-group">
														<div className="btn-wrapper">
															<IconButton
																size="small"
																className="icon"
															>
																<ZoomOutMapIcon fontSize="small" />
															</IconButton>
															<IconButton
																size="small"
																className="icon"
															>
																<FavoriteIcon fontSize="small" />
															</IconButton>
															<IconButton
																size="small"
																className="icon"
															>
																<AddCircleOutlineOutlinedIcon fontSize="small" />
															</IconButton>
														</div>
													</div>
												</div>
											</div>
										</CardContent>
									</Card>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}

export default Explore;
