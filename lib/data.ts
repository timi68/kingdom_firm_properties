import FeedIcon from "@mui/icons-material/Feed";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MuseumIcon from "@mui/icons-material/Museum";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import ExploreIcon from "@mui/icons-material/Explore";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

export const slideImages = [
	{
		url: "/images/slideimages/basebackground1.jpeg",
		caption: "Slide 1",
	},
	{
		url: "/images/slideimages/basebackground2.jpeg",
		caption: "Slide 2",
	},
	{
		url: "/images/slideimages/basebackground3.jpeg",
		caption: "Slide 3",
	},
];

export const cardProps = [
	{
		url: "/images/illustration/buy.png",
		title: "Buy a Home",
		text: "With immersive photos, videos, descriptions, experience and the most listings, including things you won’t find anywhere elsewhere, KFP makes it easy to buy a home.",
		label: "Find a Home",
	},
	{
		url: "/images/illustration/rent.png",
		title: "Rent a Home",
		text: "From our well curated homes that fits your lifestyle, budget and  you can a home on KFP.",
		label: "Find a Rental",
	},
	{
		url: "/images/illustration/stay.png",
		title: "Virtual Home Tour",
		text: "Get a realistic feel and experience of home you love with just your phone or PC, comfortably and effortlessly on KFP. ",
		label: "Book a Stay",
	},
];

export const PropertyData = [
	{
		image: slideImages[0],
		location: "Lekki, Lagos",
		price: 30000,
		title: "Studio Apartment",
		description: "A furnished building with advance home appliances",
		bedrooms: 2,
		bathrooms: 2,
		sqft: 2000,
		status: "FOR RENT",
		uploader: {
			name: "TJ DIBBS",
			image_url: "",
			blob_url: "",
		},
	},
	{
		image: slideImages[0],
		location: "Lekki, Lagos",
		price: 30000,
		title: "Studio Apartment",
		description: "A furnished building with advance home appliances",
		bedrooms: 2,
		bathrooms: 2,
		sqft: 2000,
		status: "FOR RENT",
		uploader: {
			name: "TJ DIBBS",
			image_url: "",
			blob_url: "",
		},
	},
	{
		image: slideImages[0],
		location: "Lekki, Lagos",
		price: 30000,
		title: "Studio Apartment",
		description: "A furnished building with advance home appliances",
		bedrooms: 2,
		bathrooms: 2,
		sqft: 2000,
		status: "FOR RENT",
		uploader: {
			name: "TJ DIBBS",
			image_url: "",
			blob_url: "",
		},
	},
	{
		image: slideImages[0],
		location: "Lekki, Lagos",
		price: 30000,
		title: "Studio Apartment",
		description: "A furnished building with advance home appliances",
		bedrooms: 2,
		bathrooms: 2,
		sqft: 2000,
		status: "FOR RENT",
		uploader: {
			name: "TJ DIBBS",
			image_url: "",
			blob_url: "",
		},
	},
	{
		image: slideImages[0],
		location: "Lekki, Lagos",
		price: 30000,
		title: "Studio Apartment",
		description: "A furnished building with advance home appliances",
		bedrooms: 2,
		bathrooms: 2,
		sqft: 2000,
		status: "FOR RENT",
		uploader: {
			name: "TJ DIBBS",
			image_url: "",
			blob_url: "",
		},
	},
	{
		image: slideImages[0],
		location: "Lekki, Lagos",
		price: 30000,
		title: "Studio Apartment",
		description: "A furnished building with advance home appliances",
		bedrooms: 2,
		bathrooms: 2,
		sqft: 2000,
		status: "FOR RENT",
		uploader: {
			name: "TJ DIBBS",
			image_url: "",
			blob_url: "",
		},
	},
	{
		image: slideImages[0],
		location: "Lekki, Lagos",
		price: 30000,
		title: "Studio Apartment",
		description: "A furnished building with advance home appliances",
		bedrooms: 2,
		bathrooms: 2,
		sqft: 2000,
		status: "FOR RENT",
		uploader: {
			name: "TJ DIBBS",
			image_url: "",
			blob_url: "",
		},
	},
	{
		image: slideImages[0],
		location: "Lekki, Lagos",
		price: 30000,
		title: "Studio Apartment",
		description: "A furnished building with advance home appliances",
		bedrooms: 2,
		bathrooms: 2,
		sqft: 2000,
		status: "FOR RENT",
		uploader: {
			name: "TJ DIBBS",
			image_url: "",
			blob_url: "",
		},
	},
	{
		image: slideImages[0],
		location: "Lekki, Lagos",
		price: 30000,
		title: "Studio Apartment",
		description: "A furnished building with advance home appliances",
		bedrooms: 2,
		bathrooms: 2,
		sqft: 2000,
		status: "FOR RENT",
		uploader: {
			name: "TJ DIBBS",
			image_url: "",
			blob_url: "",
		},
	},
];

export const SelectData = [
	{
		label: "Min Price*",
	},
];

export const variant = {
	hidden: {
		height: 0,
	},
	visible: {
		height: "80vh",
		transition: {
			duration: 0.1,
			type: "spring",
			damping: 25,
			stiffness: 500,
		},
	},
	exit: {
		height: 0,
		// opacity: 0.6,
	},
};

export const NavbarData = [
	{
		text: "Feed",
		link: "/feed",
		icon: FeedIcon,
	},
	{
		text: "Explore",
		link: "/explore",
		icon: ExploreIcon,
	},
	{
		text: "Favorites",
		link: "/favorites",
		icon: FavoriteIcon,
	},
	{
		text: "Saved Search",
		link: "/saved-search",
		icon: ManageSearchIcon,
	},
	{
		text: "Take a tour",
		link: "/take-a-tour",
		icon: MuseumIcon,
	},
	{
		text: "Be KFP Agent",
		link: "/feed",
		icon: SupportAgentIcon,
	},
];
