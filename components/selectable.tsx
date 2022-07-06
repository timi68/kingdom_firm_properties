import {FormControl, InputLabel, Select, MenuItem} from "@mui/material";

interface SelectableProp {
	label: string;
	default: number | string;
	items?: number[] | string[];
	name?: string;
	minPrice?: number;
	onChange?(value: any): void;
}

export default function Selectable(props: SelectableProp): JSX.Element {
	return (
		<FormControl
			size="small"
			variant="outlined"
			sx={{
				minWidth: 100,
			}}
		>
			<InputLabel
				id="demo-simple-select-filled-label"
				sx={{fontWeight: 400}}
			>
				{props.label}
			</InputLabel>
			<Select
				labelId="demo-simple-select-filled-label"
				id="demo-simple-select-filled"
				size="small"
				onChange={props.onChange}
				value={
					props?.minPrice
						? props.minPrice >= props.default
							? props.minPrice + 500000
							: props.default
						: props.default
				}
				label={props.label}
				name={props.name}
				sx={{
					maxWidth: 100,
					".MuiSelect-outlined": {
						fontSize: ".8em",
						fontWeight: 400,
					},
				}}
			>
				{!Boolean(props.items) &&
					/* @ts-ignore */
					[...new Array(20).keys()].map(
						(_value: number, index: number) => {
							if (
								props.minPrice &&
								(index + 1) * 250000 <= props.minPrice
							)
								return;
							return (
								<MenuItem
									key={index}
									value={(index + 1) * 250000}
								>
									{((index + 1) * 250000).toLocaleString(
										"en"
									)}
								</MenuItem>
							);
						}
					)}
				{Boolean(props.items) &&
					(props.items as string[]).map(
						(type: string, index: number) => {
							return (
								<MenuItem
									selected={type == props.default}
									key={index}
									value={type}
								>
									{type}
								</MenuItem>
							);
						}
					)}
			</Select>
		</FormControl>
	);
}
