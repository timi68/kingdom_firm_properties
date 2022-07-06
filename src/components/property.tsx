import React from "react";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import BedIcon from "@mui/icons-material/Bed";
import BathroomIcon from "@mui/icons-material/Bathroom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SquareFootOutlinedIcon from "@mui/icons-material/SquareFootOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import {useRouter} from "next/router";
import {PropertyData} from "../../lib/data";
import {
	Typography,
	Button,
	Card,
	CardContent,
	CardActionArea,
	CardMedia,
	IconButton,
	Tooltip,
} from "@mui/material";

type Props = {
	property: typeof PropertyData[0];
};
function Property(props: Props) {
	const {property} = props;
	const router = useRouter();

	return (
		<Card elevation={5} className="card">
			<CardContent>
				<CardActionArea
					onClick={() =>
						router.push(`/overview/${property.id}/${property.title}`)
					}
				>
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
							<div className="bedrooms detail" aria-labelledby="bedroom-label">
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
									<BathroomIcon fontSize="medium" className="icon" />
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
									<SquareFootOutlinedIcon fontSize="medium" className="icon" />
									<span>{property.sqft}</span>
								</span>
								<span className="label" id="square-feet-label">
									Square Ft
								</span>
							</div>
						</div>
						<div className="toggle-btn-group">
							<div className="btn-wrapper">
								<Tooltip title="Overview of property" arrow>
									<IconButton
										size="small"
										className="icon"
										onClick={() =>
											router.push(`/overview/${property.id}/${property.title}`)
										}
									>
										<ZoomOutMapIcon fontSize="small" />
									</IconButton>
								</Tooltip>
								<Tooltip title="Favorite" arrow>
									<IconButton size="small" className="icon">
										<FavoriteIcon fontSize="small" />
									</IconButton>
								</Tooltip>
								<Tooltip title="Add to wishlist" arrow>
									<IconButton size="small" className="icon">
										<AddCircleOutlineOutlinedIcon fontSize="small" />
									</IconButton>
								</Tooltip>
							</div>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export default Property;
