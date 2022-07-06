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
			color="info"
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
				value={props.default}
				label={props.label}
				name={props.name}
				color="info"
				sx={{
					maxWidth: "auto",
					".MuiSelect-outlined": {
						fontSize: ".8em",
						fontWeight: 400,
					},
				}}
			>
				{Boolean(props.items) &&
					(props.items as string[]).map(
						(type: string, index: number) => {
							return (
								<MenuItem
									color="primary"
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
