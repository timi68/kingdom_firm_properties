import React from "react";
import Selectable from "../../src/components/selectable";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {motion, AnimatePresence} from "framer-motion";
import Slider from "@mui/material/Slider";
import Rating from "@mui/material/Rating";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {Tooltip, IconButton} from "@mui/material";

export type StateProps = {
	propertyType: string;
	status: string;
	minPrice: number;
	maxPrice: number;
	bedrooms: number;
	bathrooms: number;
	location?: string;
};

const BrowseCategories = [
	{
		text: "For Sale",
		id: "sale",
	},
	{
		text: "For Rent",
		id: "rent",
	},
	{
		text: "For Lease",
		id: "lease",
	},
	{
		text: "For Investment",
		id: "investment",
	},
];

const PropertyType = [
	{
		text: "Mini Flat",
		id: "mini flat",
	},
	{
		text: "Duplex",
		id: "duplex",
	},
	{
		text: "Mansion",
		id: "mansion",
	},
	{
		text: "Shop",
		id: "shop",
	},
	{
		text: "Office",
		id: "Office",
	},
];

const minDistance = 300000;

const SliderStyle = {
	color: "#e47e10",
	"& .MuiSlider-valueLabel": {
		bgcolor: "#e47e10",
		borderRadius: 1,
	},
};
type Props = {
	filterRef: React.RefObject<HTMLDivElement>;
};

type Filter = {};

function Filter(props: Props): JSX.Element {
	const [expand, setExpand] = React.useState<boolean>(false);
	const [filter, setFilter] = React.useState({});
	const [priceRange, setPriceRange] = React.useState<number[]>([
		250000, 3000000,
	]);

	const handleChange2 = (
		event: Event,
		newValue: number | number[],
		activeThumb: number
	) => {
		if (!Array.isArray(newValue)) {
			return;
		}

		if (newValue[1] - newValue[0] < minDistance) {
			if (activeThumb === 0) {
				const clamped = Math.min(newValue[0], 5000000 - minDistance);
				setPriceRange([clamped, clamped + minDistance]);
			} else {
				const clamped = Math.max(newValue[1], minDistance);
				setPriceRange([clamped - minDistance, clamped]);
			}
		} else {
			setPriceRange(newValue as number[]);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFilter({...filter, [e.target.name]: [e.target.value]});
	};

	const handleClick = () => {};

	return (
		<div className="search-filter-container" ref={props.filterRef}>
			<div className="search-filter">
				<div className="search-filter-header">
					<div className="title">
						<span className="text">Filter search results</span>
					</div>
					<Tooltip title="Close filter">
						<IconButton
							size="small"
							className="close-filter"
							onClick={() => {
								props.filterRef.current.classList.remove("visible");
							}}
						>
							<CloseRoundedIcon />
						</IconButton>
					</Tooltip>
				</div>
				<div className="filter-body">
					<div className="filter-form-group" aria-labelledby="control-label">
						<div className="control-label" id="control-label">
							<span className="text">Browse Categories</span>
						</div>
						<div className="form-control-wrapper">
							{BrowseCategories.map((data, index) => {
								return (
									<div className="form-control" key={index}>
										<input
											type="checkbox"
											name={data.id}
											id={data.id}
											className="check-control"
										/>
										<label htmlFor={data.id} className={`label`}>
											<span className="text">{data.text}</span>
										</label>
									</div>
								);
							})}
						</div>
					</div>
					<div className="filter-form-group" aria-labelledby="control-label">
						<div className="control-label price-range" id="control-label">
							<span className="text">Price Range</span>
						</div>
						<Slider
							getAriaLabel={() => "Minimum distance shift"}
							value={priceRange}
							color="primary"
							sx={SliderStyle}
							onChange={handleChange2}
							valueLabelDisplay="on"
							disableSwap
							min={0}
							size="small"
							max={5000000}
							step={100000}
							valueLabelFormat={(value) => {
								if (value === priceRange[0]) {
									return (
										<div className="price-display">
											<small>min</small>
											<small style={{fontSize: ".8em"}}>
												{value.toLocaleString("en")}
											</small>
										</div>
									);
								}
								return (
									<div className="price-display">
										<small>max</small>
										<small>{value.toLocaleString("en")}</small>
									</div>
								);
							}}
						/>
					</div>
					<div className="filter-form-group" aria-labelledby="control-label">
						<div className="control-label" id="control-label">
							<span className="text">Propperty Type</span>
						</div>
						<div className="form-control-wrapper">
							{PropertyType.map((data, index) => {
								return (
									<div className="form-control" key={index}>
										<input
											type="checkbox"
											name={data.id}
											id={data.id}
											className="check-control"
										/>
										<label htmlFor={data.id} className={`label`}>
											<span className="text">{data.text}</span>
										</label>
									</div>
								);
							})}
						</div>
					</div>
					<div className="filter-form-group" aria-labelledby="control-label">
						<div className="control-label" id="control-label">
							<span className="text">Bathrooms Range</span>
						</div>
						<div className="form-control-wrapper">
							<div className="form-control">
								<input
									type="text"
									name="min-bathroom"
									className="text-control"
									placeholder="min"
									min={1}
									max={5}
									maxLength={1}
								/>
								<RemoveIcon />
								<input
									type="text"
									name="max-bathroom"
									className="text-control"
									placeholder="max"
									min={1}
									max={5}
									maxLength={1}
								/>
							</div>
						</div>
					</div>
					<div className="filter-form-group" aria-labelledby="control-label">
						<div className="control-label" id="control-label">
							<span className="text">Bedrooms Range</span>
						</div>
						<div className="form-control-wrapper">
							<div className="form-control">
								<input
									type="text"
									name="min-bed"
									placeholder="min"
									className="text-control"
									min={1}
									max={5}
									maxLength={1}
								/>
								<RemoveIcon />
								<input
									type="text"
									name="max-bed"
									placeholder="max"
									className="text-control"
									min={1}
									max={5}
									maxLength={1}
								/>
							</div>
						</div>
					</div>
					<div className="filter-form-group" aria-labelledby="control-label">
						<div className="control-label" id="control-label">
							<span className="text">Ratings</span>
						</div>
						<div className="form-control-wrapper">
							{[1, 2, 3, 4, 5].map((data, index) => {
								return (
									<div className="form-control" key={index}>
										<input
											type="checkbox"
											name={`rating${index}`}
											id={`rating${index}`}
											className="check-control"
										/>
										<Rating
											name={`rating${index}`}
											defaultValue={index + 1}
											size="small"
										/>
									</div>
								);
							})}
						</div>
					</div>
				</div>
				<div className="filter-action">
					<motion.button
						className="apply-btn"
						onClick={handleClick}
						whileTap={{scale: 0.9}}
						whileHover={{opacity: 0.8, scale: 1.1}}
					>
						<span>Apply Filter</span>
					</motion.button>
				</div>
			</div>
		</div>
	);
}

export default Filter;
